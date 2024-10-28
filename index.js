// const express = require('express');
// const path = require('path');
// const app = express();
// const cookieParser = require('cookie-parser');
// require('dotenv').config(); // Ensure environment variables are loaded

// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Serve static files from 'assets' directory
// app.use('/assets', express.static(path.join(__dirname, 'assets')));

// // Serve static files from 'portal' directory
// app.use('/portal', express.static(path.join(__dirname, 'portal')));

// // Serve static files from the root directory (for index.html and others)
// app.use(express.static(__dirname));

// // Routes
// const authRoutes = require('./src/routes/auth');
// const pageRoutes = require('./src/routes/pages'); // Ensure this line exists
// app.use('/auth', authRoutes);
// app.use('/', pageRoutes); // Ensure this line exists

// // Handle 404 for unmatched routes
// app.use((req, res) => {
//   res.status(404).sendFile(path.join(__dirname, '404.html'));
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config(); // Ensure environment variables are loaded

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from 'assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// **Mount the router at '/portal' BEFORE static middleware**
const authRoutes = require('./src/routes/auth');
const pageRoutes = require('./src/routes/pages'); // Ensure this line exists
app.use('/auth', authRoutes);
app.use('/portal', pageRoutes); // Mounting at '/portal'

// Serve static files from 'portal' directory AFTER the router
app.use('/portal', express.static(path.join(__dirname, 'portal')));

// Serve static files from the root directory (for index.html and others)
app.use(express.static(__dirname));

// Handle 404 for unmatched routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
