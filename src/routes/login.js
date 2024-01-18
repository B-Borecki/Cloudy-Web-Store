const express = require("express");
const connection = require("../db.js");
var crypto = require('crypto');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', { pageTitle: 'Sign in', loginMessage: "", login_exists:10});
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
      return res.render('login', { loginMessage: 'Incorrect login or password', login_exists: 0});
    }
      res.render('login', { loginMessage: 'Successfully logged in', login_exists: 1});
  });
});

module.exports = router;

