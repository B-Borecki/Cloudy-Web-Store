const express = require("express");
const ejs = require('ejs');
//const AWS = require('aws-sdk');
const app = express();
const port = 80;
app.set("view engine", "ejs");
app.use(express.static('views'));
app.use(express.static('images'));

app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Cloudy Web Store' });
});

app.get('/login', (req, res) => {
  res.render('login', { pageTitle: 'Sign in' });
});

app.get('/register', (req, res) => {
  res.render('register', { pageTitle: 'Sign up' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

