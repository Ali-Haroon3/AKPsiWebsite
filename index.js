const express = require('express');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');  // Ensure this is correct
const pageRoutes = require('./src/routes/pages'); // Ensure this is correct

const app = express();

// Use CORS to allow requests from frontend (GitHub Pages)
app.use(
    cors({
        origin: 'https://ali-haroon3.github.io', // Update origin if needed
        credentials: true, // Allow credentials (cookies) to be sent
    })
);

// Serve static files
app.use(express.static(path.join(__dirname, 'AKPsiWebsite')));

// Ensure that the imported routes are functions
if (typeof authRoutes === 'function') {
    app.use('/auth', authRoutes);
} else {
    console.error('authRoutes is not a valid middleware function');
}

if (typeof pageRoutes === 'function') {
    app.use('/', pageRoutes);
} else {
    console.error('pageRoutes is not a valid middleware function');
}

// Handle preflight requests globally
app.options('*', cors());

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
