// // // // index.js
// // // const express = require('express');
// // // const cookieParser = require('cookie-parser');
// // // const cors = require('cors');
// // // const authRoutes = require('./src/routes/auth');
// // // const pageRoutes = require('./src/routes/pages');
// // // const path = require('path');

// // // const app = express();
// // // const PORT = process.env.PORT || 5001;

// // // // Apply CORS with your frontend URL
// // // app.use(
// // //   cors({
// // //     origin: 'https://akpsigz.com', // Ensure no trailing slash
// // //     credentials: true,
// // //     methods: ['GET', 'POST', 'OPTIONS'],
// // //   })
// // // );

// // // // Handle preflight requests
// // // app.options('*', cors());

// // // // Middleware
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: true }));
// // // app.use(cookieParser());

// // // // Serve static files from the 'assets' directory at the root level
// // // app.use('/assets', express.static(path.join(__dirname, 'assets')));

// // // // Serve static HTML files from the 'portal' directory
// // // app.use('/portal', express.static(path.join(__dirname, 'portal')));

// // // // Routes
// // // app.use('/auth', authRoutes);
// // // app.use('/', pageRoutes);

// // // // Handle 404 for unmatched routes
// // // app.use((req, res, next) => {
// // //     res.status(404).sendFile(path.join(__dirname, '404.html'));
// // // });

// // // // Start the server
// // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // // index.js
// // const express = require('express');
// // const cookieParser = require('cookie-parser');
// // const cors = require('cors');
// // const authRoutes = require('./src/routes/auth');
// // const pageRoutes = require('./src/routes/pages');
// // const path = require('path');

// // const app = express();
// // const PORT = process.env.PORT || 5001;

// // // Middleware
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // app.use(cookieParser());

// // // Serve static files from the 'assets' directory
// // app.use('/assets', express.static(path.join(__dirname, 'assets')));

// // // Serve static HTML files from the 'portal' directory
// // app.use('/portal', express.static(path.join(__dirname, 'portal')));

// // // Routes
// // app.use('/auth', authRoutes);
// // app.use('/', pageRoutes);

// // // Handle 404 for unmatched routes
// // app.use((req, res) => {
// //     res.status(404).sendFile(path.join(__dirname, '404.html'));
// // });

// // // Start the server
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // index.js
// const express = require('express');
// const path = require('path');
// const app = express();
// const cookieParser = require('cookie-parser');

// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Serve static files from 'assets' directory
// app.use('/assets', express.static(path.join(__dirname, 'assets')));

// // Serve static files from 'portal' directory
// app.use('/portal', express.static(path.join(__dirname, 'portal')));

// // Serve other static files from root directory
// app.use(express.static(__dirname));

// // Routes
// const authRoutes = require('./src/routes/auth');
// app.use('/auth', authRoutes);

// // Handle other routes or 404
// app.get('*', (req, res) => {
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
app.use('/auth', authRoutes);

// Handle other routes (e.g., /about, /contact)
app.get(['/about', '/contact', '/recruitment', '/leadership', '/legacy'], (req, res) => {
  res.sendFile(path.join(__dirname, req.path, 'index.html'));
});

// Handle 404 for unmatched routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
