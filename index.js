// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const cookieParser = require('cookie-parser');

// const authRoutes = require('./src/routes/auth');
// const pageRoutes = require('./src/routes/pages');

// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'assets')));
// app.use(express.static(path.join(__dirname)));

// app.use('/auth', authRoutes);
// app.use('/', pageRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const pageRoutes = require('./src/routes/pages');

const app = express();

// Use CORS to allow requests from the frontend (GitHub Pages)
app.use(cors({
    origin: 'https://ali-haroon3.github.io', // Adjust frontend origin if needed
    credentials: true, // Allow credentials (cookies) to be sent
}));

// Handle preflight requests globally to ensure CORS success
app.options('*', cors());

// Serve static files from the AKPsiWebsite folder
app.use(express.static(path.join(__dirname, 'AKPsiWebsite')));

// Set up routes for authentication and pages
app.use('/auth', authRoutes);
app.use('/', pageRoutes);

// Start the server on the specified port or default to 5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

