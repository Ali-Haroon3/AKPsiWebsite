const express = require('express');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const pageRoutes = require('./src/routes/pages');

const app = express();

// CORS setup for external frontend requests
app.use(cors({
    origin: 'https://ali-haroon3.github.io',
    credentials: true,
}));

// Parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the AKPsiWebsite folder
app.use(express.static(path.join(__dirname, 'AKPsiWebsite')));

// Route setup - ensure these are correct
app.use('/auth', authRoutes);
app.use('/', pageRoutes);

// Handle preflight requests for CORS
app.options('*', cors());

// Start the server on the specified port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
