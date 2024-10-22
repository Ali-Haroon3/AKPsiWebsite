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
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');

const app = express();

// Enable CORS to allow requests from GitHub Pages
app.use(cors({
    origin: 'https://ali-haroon3.github.io',
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// API Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
