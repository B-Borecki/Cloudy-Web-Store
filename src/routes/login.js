const express = require("express");
const connection = require("../db.js");
const crypto = require("crypto");
const session = require("express-session");

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', { pageTitle: 'Sign in', loginMessage: "", login_exists:1, session: req.session});
});

router.post('/login', (req, res) => {
  const { login, password } = req.body;
  const checkQuery = `SELECT * FROM users WHERE login = '${login}'`;
  connection.query(checkQuery, [login], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
    if (results.length == 0 || results[0].password != crypto.createHash('sha256' ,password).digest('base64')) {
      return res.render('login', { loginMessage: 'Incorrect login or password', login_exists: 0, session: req.session});
    }
    req.session.user = login;
    req.session.authorized = true;
    res.render('login', { loginMessage: 'Successfully logged in', login_exists: 1, session: req.session});
  });
});

module.exports = router;

