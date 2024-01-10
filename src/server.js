const express = require("express");
const ejs = require('ejs');
const mysql = require('mysql');
//const AWS = require('aws-sdk');

const {db_endpoint, db_port, db_user, db_passwd, db, imgs_path} = require('./vars');

const app = express();
const port = 80;
app.set("view engine", "ejs");
app.use(express.static('views'));
app.use(express.static('images'));

const connection = mysql.createConnection({
  host: db_endpoint,
  user: db_user,
  password: db_passwd,
  database: db
});

connection.connect((err) => {
  if (err) {
    console.error('Błąd połączenia z bazą danych: ' + err.stack);
    return;
  }
  console.log("Połączono z bazą danych");
});

app.get('/', (req, res) => {
  const query = 'SELECT * FROM products';
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Błąd zapytania: ' + error.stack);
      return;
    }

    search = "All instances";
    product_list = results;
    res.render('index', {pageTitle: 'Cloudy Web Store', product_list: product_list, search: search, imgs_path: imgs_path});
  });
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

