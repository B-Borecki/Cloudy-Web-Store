const express = require("express");
const connection = require("../db.js");
const {db_endpoint, db_port, db_user, db_passwd, db, imgs_path} = require('../vars');

const router = express.Router();

router.get('/products/:ami', (req, res) => {
  ami_id = req.params.ami;
  const query = 'SELECT * FROM products WHERE ami_id = "' + ami_id + '";';
    connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Query error: ' + error.stack);
      return;
    }
    product = results[0];
    res.render('product', {pageTitle: product.name, product : product, imgs_path: imgs_path});
  });
});

module.exports = router;
