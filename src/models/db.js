// src/models/db.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost', // Updated to MYSQL_HOST
  user: process.env.MYSQL_USER || 'root',      // Updated to MYSQL_USER
  password: process.env.MYSQL_PASSWORD || '',  // Updated to MYSQL_PASSWORD
  database: process.env.MYSQL_DATABASE || 'akpsi_portal',
  port: process.env.MYSQL_PORT || 3306,        // Updated to MYSQL_PORT
  waitForConnections: true,
  connectionLimit: 10,
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
