const express = require('express');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const pageRoutes = require('./src/routes/pages');

const app = express();

// Use JSON parsing and cookie handling middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// CORS for frontend requests
app.use(cors({
    origin: 'https://ali-haroon3.github.io',
    credentials: true,
}));

// Static files from AKPsiWebsite
app.use(express.static(path.join(__dirname, 'AKPsiWebsite')));

// Route setup
app.use('/auth', authRoutes);
app.use('/', pageRoutes);

console.log('Auth Routes:', authRoutes);
console.log('Page Routes:', pageRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
