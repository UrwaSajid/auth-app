const express = require('express');
const session = require('express-session');

const { router: authRouter } = require('./routes/auth');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'secret123', resave: false, saveUninitialized: false }));

app.use('/', authRouter);

app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.send(`<h1>Welcome ${req.session.user.username}!</h1>`);
});

app.get('/', (req, res) => res.redirect('/login'));

module.exports = app;
