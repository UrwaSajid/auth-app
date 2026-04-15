class SignupPage {
  constructor() {
    this.usernameField = '#username';
    this.emailField = '#email';
    this.passwordField = '#password';
    this.signupButton = '#signup-btn';
    this.errorMessage = '#error-msg';
    this.successMessage = '#success-msg';
  }

  getSelectors() {
    return {
      username: this.usernameField,
      email: this.emailField,
      password: this.passwordField,
      button: this.signupButton,
      error: this.errorMessage,
      success: this.successMessage,
    };
  }

  validateSignupInput(username, email, password) {
    const errors = [];
    if (!username || username.length < 3) errors.push('Username must be at least 3 characters');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Invalid email format');
    if (!password || password.length < 6) errors.push('Password must be at least 6 characters');
    return errors;
  }
}

module.exports = SignupPage;
