const express = require("express");
const connection = require("../db.js");
var crypto = require('crypto');
const {db_endpoint, db_port, db_user, db_passwd, db, imgs_path} = require('../vars');

const router = express.Router();

router.get('/register', (req, res) => {
  var login_exists = 0;
  res.render('register', { pageTitle: 'Sign up', loginMessage: '', login_exists: 0, session: req.session, imgs_path: imgs_path});
});

router.post('/register', (req, res) => {
  const { login, password, confirmPassword, access_key, secret_access_key } = req.body;
  const checkQuery = `SELECT * FROM users WHERE login = '${login}';`;
  connection.query(checkQuery, [login], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
    if (results.length > 0) {
      return res.render('register', { loginMessage: 'Account with this login already exists', login_exists: 1, session: req.session, imgs_path: imgs_path});
    }

    var hash = crypto.createHash('sha256').update(password).digest('base64');

    const query = `INSERT INTO users (login, password, access_key, secret_access_key) VALUES ('${login}', '${hash}', '${access_key}', '${secret_access_key}');`;
    connection.query(query, (error, results, fields) => {
      if (error) {
        console.error('Query error: ' + error.stack);
        return res.status(500).send('Internal Server Error');
      }
      res.render('register', { loginMessage: 'User successfully created', login_exists: 0, session: req.session, imgs_path: imgs_path});
    });
  });
});

module.exports = router;
