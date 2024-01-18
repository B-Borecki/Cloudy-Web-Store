const express = require("express");

const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register', { pageTitle: 'Sign up' });
});

router.post('/register', (req, res) => {
    const { login, password, confirmPassword, amiKey, amiSecretKey } = req.body;
});

module.exports = router;
