const express = require("express");
const AWS = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
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
    res.render('product', {pageTitle: product.name, product : product, imgs_path: imgs_path, session: req.session});
  });
});

router.post('/buy', (req, res) => {
  const { instance_type, ami_id } = req.body;
  AWS.config.update({
    accessKeyId: req.session.access_key,
    secretAccessKey: req.session.secret_access_key,
    region: 'us-east-1',
  });
  const ec2 = new AWS.EC2();
  const params = {
    ImageId: ami_id,
    InstanceType: instance_type,
    MinCount: 1,
    MaxCount: 1,
  };

  ec2.runInstances(params, (err, data) => {
    if (err) {
      console.error('Error creating EC2 instance', err);
      return res.status(500).send('Internal Server Error');
    } else {
      res.render('index', {pageTitle: 'Cloudy Web Store', product_list: product_list, search: search, imgs_path: imgs_path, session: req.session});
    }
  });


});

module.exports = router;
