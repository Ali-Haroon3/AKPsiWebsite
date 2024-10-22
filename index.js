const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const pageRoutes = require('./src/routes/pages');

const app = express();
const PORT = process.env.PORT || 5001;

// Apply CORS with your frontend URL
app.use(
  cors({
    origin: 'https://akpsigz.com/', // Replace with your frontend URL
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

// Routes
app.use('/auth', authRoutes);
app.use('/', pageRoutes);
app.use('/assets', express.static('portal/assets'));


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
