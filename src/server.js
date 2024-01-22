const express = require("express");
const ejs = require('ejs');
const connection = require("./db.js")
const session = require("express-session");
const {db_endpoint, db_port, db_user, db_passwd, db, imgs_path} = require('./vars');

const register_route = require("./routes/register");
const products_route = require("./routes/products");
const login_route = require("./routes/login");


const app = express();
const port = 80;
app.set("view engine", "ejs");

app.use(express.static('views'));
app.use(express.static('images'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "Bartusiek123",
  cookie: {
    sameSite: 'strict',
    expires: 300000
  },
  resave: true,
  saveUninitialized: true
}))
app.use("/", register_route);
app.use("/", products_route);
app.use("/", login_route);

app.get('/', (req, res) => {
  const query = 'SELECT * FROM products';
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Query error: ' + error.stack);
      return;
    }
    search = "All instances";
    product_list = results;
    res.render('index', {pageTitle: 'Cloudy Web Store', product_list: product_list, search: search, imgs_path: imgs_path, session: req.session});
  });
});

app.get('/search', (req, res) => {
  var search = req.query.search;
  const query = 'SELECT * FROM products WHERE LOWER(name) LIKE "%' + search.toLowerCase() + '%";';
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Query error: ' + error.stack);
      return;
    }
    product_list = results;
    res.render('index', {pageTitle: 'Cloudy Web Store', product_list: product_list, search: search, imgs_path: imgs_path, session: req.session});
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

