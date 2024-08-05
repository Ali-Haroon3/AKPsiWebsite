const express = require('express');
const router = express.Router();
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/index.html'));
});

router.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/about.html'));
});

router.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/login.html'));
});

router.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/register.html'));
});

router.get('/points.html', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/points.html'));
});

router.get('/calendar.html', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/calendar.html'));
});

router.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/contact.html'));
});

router.get('/sponsorship.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/sponsorship.html'));
});

router.get('/leadership.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/leadership.html'));
});

router.get('/legacy.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/legacy.html'));
});

router.get('/portal.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/portal.html'));
});

module.exports = router;
