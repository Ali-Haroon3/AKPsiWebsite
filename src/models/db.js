const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'autorack.proxy.rlwy.net',
  user: 'root',
  password: 'nwgSLDCWNjHanJSFseHbCMTxZrVbyqlV',
  database: process.env.MYSQL_DATABASE,
  port: 50203,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting:', err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});
