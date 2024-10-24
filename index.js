// index.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const pageRoutes = require('./src/routes/pages');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Apply CORS with your frontend URL
app.use(
  cors({
    origin: 'https://akpsigz.com', // Ensure no trailing slash
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

// Handle preflight requests
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the 'assets' directory at the root level
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve static HTML files from the 'portal' directory
app.use('/portal', express.static(path.join(__dirname, 'portal')));

// Routes
app.use('/auth', authRoutes);
app.use('/', pageRoutes);

// Handle 404 for unmatched routes
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
