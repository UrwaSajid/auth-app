const express = require('express');
const router = express.Router();
const { validateEmail, validatePassword, validateUsername } = require('../utils/validators');

// In-memory user store (for simplicity)
const users = [];

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const emailCheck = validateEmail(email);
  if (!emailCheck.valid) return res.render('login', { error: emailCheck.message });

  const passwordCheck = validatePassword(password);
  if (!passwordCheck.valid) return res.render('login', { error: passwordCheck.message });

  const user = users.find((currentUser) => currentUser.email === email && currentUser.password === password);
  if (!user) return res.render('login', { error: 'Invalid credentials' });

  req.session.user = user;
  return res.redirect('/dashboard');
});

router.get('/signup', (req, res) => {
  res.render('signup', { error: null, success: null });
});

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  const usernameCheck = validateUsername(username);
  if (!usernameCheck.valid) return res.render('signup', { error: usernameCheck.message, success: null });

  const emailCheck = validateEmail(email);
  if (!emailCheck.valid) return res.render('signup', { error: emailCheck.message, success: null });

  const passwordCheck = validatePassword(password);
  if (!passwordCheck.valid) return res.render('signup', { error: passwordCheck.message, success: null });

  if (users.find((currentUser) => currentUser.email === email)) {
    return res.render('signup', { error: 'Email already registered', success: null });
  }

  users.push({ username, email, password });
  return res.render('signup', { error: null, success: 'Account created successfully!' });
});

module.exports = { router, users };
