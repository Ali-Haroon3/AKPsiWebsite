const express = require('express');
const router = express.Router();
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

router.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../about.html'));
});

router.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../login.html'));
});

router.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../register.html'));
});

router.get('/points.html', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../points.html'));
});

router.get('/calendar.html', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../calendar.html'));
});

module.exports = router;
