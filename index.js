const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const pageRoutes = require('./src/routes/pages');

const app = express();
const PORT = process.env.PORT || 5001;

// Apply CORS with your frontend URL
const allowedOrigins = ['https://akpsigz.com', 'http://localhost:3000', 'http://localhost:5001']; // Add your development URL
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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
app.use('/assets', express.static('assets'));


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));