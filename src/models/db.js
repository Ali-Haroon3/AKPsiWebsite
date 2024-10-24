// src/models/db.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables from .env file (if you're using one)
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'autorack.proxy.rlwy.net',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'nwgSLDCWNjHanJSFseHbCMTxZrVbyqlV',
  database: process.env.MYSQL_DATABASE || 'akpsi_portal',
  port: process.env.DB_PORT || 50203,
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on your needs
  queueLimit: 0,
});

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
