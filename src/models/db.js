// models/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,      // e.g., 'autorack.proxy.rlwy.net'
    user: process.env.MYSQL_USER,      // e.g., 'root'
    password: process.env.MYSQL_PASSWORD, // your MySQL password
    database: process.env.MYSQL_DATABASE, // e.g., 'railway'
    port: process.env.MYSQL_PORT,      // e.g., 50203
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;


// Optional: Test the connection pool
pool.getConnection()
  .then((connection) => {
    console.log('Database pool connected as id', connection.threadId);
    connection.release();
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

module.exports = pool;
