const mysql = require('mysql');
const {db_endpoint, db_port, db_user, db_passwd, db, imgs_path} = require('./vars');

const connection = mysql.createConnection({
  host: db_endpoint,
  user: db_user,
  password: db_passwd,
  database: db
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.stack);
    return;
  }
  console.log("Connected to the database");
});

module.exports = connection;
