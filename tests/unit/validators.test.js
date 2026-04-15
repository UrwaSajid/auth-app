const { expect } = require('chai');
const { validateEmail, validatePassword, validateUsername } = require('../../src/utils/validators');

describe('Email Validation', () => {
  it('should accept a valid email', () => {
    const result = validateEmail('test@example.com');
    expect(result.valid).to.be.true;
  });

  it('should reject email missing @ symbol', () => {
    const result = validateEmail('testexample.com');
    expect(result.valid).to.be.false;
    expect(result.message).to.include('Invalid');
  });

  it('should reject email missing domain', () => {
    const result = validateEmail('test@');
    expect(result.valid).to.be.false;
  });

  it('should reject empty email', () => {
    const result = validateEmail('');
    expect(result.valid).to.be.false;
    expect(result.message).to.equal('Email is required');
  });

  it('should reject null email', () => {
    const result = validateEmail(null);
    expect(result.valid).to.be.false;
  });
});

describe('Password Validation', () => {
  it('should accept a valid password with 6+ characters', () => {
    const result = validatePassword('secure123');
    expect(result.valid).to.be.true;
  });

  it('should reject a short password under 6 characters', () => {
    const result = validatePassword('abc');
    expect(result.valid).to.be.false;
    expect(result.message).to.include('6 characters');
  });

  it('should reject an empty password', () => {
    const result = validatePassword('');
    expect(result.valid).to.be.false;
  });

  it('should accept password with exactly 6 characters (boundary)', () => {
    const result = validatePassword('abc123');
    expect(result.valid).to.be.true;
  });

  it('should reject password with 5 characters (boundary)', () => {
    const result = validatePassword('ab123');
    expect(result.valid).to.be.false;
  });
});

describe('Username Validation', () => {
  it('should accept a valid username with 3+ characters', () => {
    const result = validateUsername('john');
    expect(result.valid).to.be.true;
  });

  it('should reject a short username under 3 characters', () => {
    const result = validateUsername('ab');
    expect(result.valid).to.be.false;
    expect(result.message).to.include('3 characters');
  });

  it('should reject an empty username', () => {
    const result = validateUsername('');
    expect(result.valid).to.be.false;
  });

  it('should accept username with exactly 3 characters (boundary)', () => {
    const result = validateUsername('abc');
    expect(result.valid).to.be.true;
  });
});
