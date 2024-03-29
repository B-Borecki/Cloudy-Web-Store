const express = require("express");
const connection = require("../db.js");
const crypto = require("crypto");
const session = require("express-session");
const {db_endpoint, db_port, db_user, db_passwd, db, imgs_path} = require('../vars');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', { pageTitle: 'Sign in', loginMessage: "", login_exists:1, session: req.session, imgs_path: imgs_path});
});

router.post('/login', (req, res) => {
  const { login, password } = req.body;
  const checkQuery = `SELECT * FROM users WHERE login = '${login}'`;
  connection.query(checkQuery, [login], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
    if (results.length == 0 || results[0].password != crypto.createHash('sha256').update(password).digest('base64')) {
      return res.render('login', { loginMessage: 'Incorrect login or password', login_exists: 0, session: req.session, imgs_path: imgs_path});
    }
    req.session.user = login;
    req.session.access_key = results[0].access_key;
    req.session.secret_access_key = results[0].secret_access_key;
    req.session.authorized = true;
    res.render('login', { loginMessage: 'Successfully logged in', login_exists: 1, session: req.session, imgs_path: imgs_path});
  });
});

module.exports = router;

