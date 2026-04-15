const { expect } = require('chai');
const { validateEmail, validatePassword, validateUsername } = require('../../src/utils/validators');
const LoginPage = require('../pages/LoginPage');
const SignupPage = require('../pages/SignupPage');

// Simulated in-memory user store (mirrors the app)
const users = [{ username: 'testuser', email: 'test@example.com', password: 'password123' }];

function simulateLogin(email, password) {
  const emailCheck = validateEmail(email);
  if (!emailCheck.valid) return { success: false, error: emailCheck.message };

  const passCheck = validatePassword(password);
  if (!passCheck.valid) return { success: false, error: passCheck.message };

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return { success: false, error: 'Invalid credentials' };

  return { success: true, user };
}

function simulateSignup(username, email, password) {
  const usernameCheck = validateUsername(username);
  if (!usernameCheck.valid) return { success: false, error: usernameCheck.message };

  const emailCheck = validateEmail(email);
  if (!emailCheck.valid) return { success: false, error: emailCheck.message };

  const passCheck = validatePassword(password);
  if (!passCheck.valid) return { success: false, error: passCheck.message };

  if (users.find((u) => u.email === email)) return { success: false, error: 'Email already registered' };

  users.push({ username, email, password });
  return { success: true, message: 'Account created successfully!' };
}

// ─── Login Integration Tests ───────────────────────────────────
describe('Login Page Integration Tests', () => {
  const loginPage = new LoginPage();

  it('should login successfully with valid credentials', () => {
    const result = simulateLogin('test@example.com', 'password123');
    expect(result.success).to.be.true;
    expect(result.user.username).to.equal('testuser');
  });

  it('should fail login with wrong password', () => {
    const result = simulateLogin('test@example.com', 'wrongpass');
    expect(result.success).to.be.false;
    expect(result.error).to.equal('Invalid credentials');
  });

  it('should fail login with non-existing user', () => {
    const result = simulateLogin('noone@example.com', 'password123');
    expect(result.success).to.be.false;
    expect(result.error).to.equal('Invalid credentials');
  });

  it('should fail login with empty form fields', () => {
    const result = simulateLogin('', '');
    expect(result.success).to.be.false;
    expect(result.error).to.equal('Email is required');
  });

  it('should fail login with invalid email format', () => {
    const result = simulateLogin('notanemail', 'password123');
    expect(result.success).to.be.false;
    expect(result.error).to.include('Invalid');
  });

  it('POM - should return correct selectors for login page', () => {
    const selectors = loginPage.getSelectors();
    expect(selectors).to.have.property('email');
    expect(selectors).to.have.property('password');
    expect(selectors).to.have.property('button');
  });
});

// ─── Signup Integration Tests ──────────────────────────────────
describe('Signup Page Integration Tests', () => {
  const signupPage = new SignupPage();

  it('should register a new user with valid data', () => {
    const result = simulateSignup('newuser', 'new@example.com', 'newpass123');
    expect(result.success).to.be.true;
    expect(result.message).to.equal('Account created successfully!');
  });

  it('should fail signup with missing username', () => {
    const result = simulateSignup('', 'another@example.com', 'pass123');
    expect(result.success).to.be.false;
    expect(result.error).to.include('3 characters');
  });

  it('should fail signup with short password', () => {
    const result = simulateSignup('validuser', 'valid@example.com', '123');
    expect(result.success).to.be.false;
    expect(result.error).to.include('6 characters');
  });

  it('should fail signup with invalid email', () => {
    const result = simulateSignup('validuser', 'bademail', 'pass123');
    expect(result.success).to.be.false;
    expect(result.error).to.include('Invalid');
  });

  it('should fail signup with short username', () => {
    const result = simulateSignup('ab', 'ab@example.com', 'pass123');
    expect(result.success).to.be.false;
    expect(result.error).to.include('3 characters');
  });

  it('should fail signup if email already exists', () => {
    const result = simulateSignup('testuser2', 'test@example.com', 'pass123');
    expect(result.success).to.be.false;
    expect(result.error).to.equal('Email already registered');
  });
});

// ─── Advanced / Edge Case Tests ────────────────────────────────
describe('Advanced Edge Case Tests', () => {
  it('should reject email with special chars only', () => {
    const result = simulateLogin('!!!@###.$$$', 'pass123');
    expect(result.success).to.be.false;
  });

  it('should handle very long email input (boundary max)', () => {
    const longEmail = 'a'.repeat(100) + '@example.com';
    const result = validateEmail(longEmail);
    expect(result.valid).to.be.true;
  });

  it('should reject password with only spaces', () => {
    const result = validatePassword('      ');
    expect(result.valid).to.be.false;
  });

  it('should reject username with only spaces', () => {
    const result = validateUsername('   ');
    expect(result.valid).to.be.false;
  });

  it('should handle special characters in password', () => {
    const result = validatePassword('p@$$w0rd!');
    expect(result.valid).to.be.true;
  });

  it('should handle special characters in username', () => {
    const result = validateUsername('user_123');
    expect(result.valid).to.be.true;
  });

  it('POM - signup page should detect multiple validation errors', () => {
    const signupPage = new SignupPage();
    const errors = signupPage.validateSignupInput('ab', 'bademail', '123');
    expect(errors.length).to.equal(3);
  });

  it('should reject rapid duplicate signup (same email twice)', () => {
    simulateSignup('userA', 'dup@example.com', 'pass123');
    const result = simulateSignup('userB', 'dup@example.com', 'pass456');
    expect(result.success).to.be.false;
    expect(result.error).to.equal('Email already registered');
  });
});
