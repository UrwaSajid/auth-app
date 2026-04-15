class LoginPage {
  constructor() {
    this.emailField = '#email';
    this.passwordField = '#password';
    this.loginButton = '#login-btn';
    this.errorMessage = '#error-msg';
  }

  getSelectors() {
    return {
      email: this.emailField,
      password: this.passwordField,
      button: this.loginButton,
      error: this.errorMessage,
    };
  }

  validateLoginInput(email, password) {
    const errors = [];
    if (!email || email.trim() === '') errors.push('Email is required');
    if (!password || password.trim() === '') errors.push('Password is required');
    return errors;
  }
}

module.exports = LoginPage;
