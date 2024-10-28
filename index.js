const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from 'assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve static files from 'portal' directory
app.use('/portal', express.static(path.join(__dirname, 'portal')));

// Serve static files from the root directory (for index.html and others)
app.use(express.static(__dirname));

// Routes
const authRoutes = require('./src/routes/auth');
const pageRoutes = require('./src/routes/pages'); // Added this line
app.use('/auth', authRoutes);
app.use('/', pageRoutes); // Added this line

// Handle other routes (e.g., /about, /contact)
// You can remove this section if these routes are already handled in pages.js
// app.get(['/about', '/contact', '/recruitment', '/leadership', '/legacy'], (req, res) => {
//   res.sendFile(path.join(__dirname, req.path, 'index.html'));
// });

// Handle 404 for unmatched routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
