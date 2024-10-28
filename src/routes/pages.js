// src/routes/pages.js
const express = require('express');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware'); // If you have authentication middleware
const router = express.Router();

// Serve index.html from the root
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../portal/index.html'));
});

// Serve login.html
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../portal/login.html'));
});

// Serve register.html
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../portal/register.html'));
});

// Serve calendar.html with authentication
router.get('/calendar', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../portal/calendar.html'));
});

// Serve points.html with authentication
// router.get('/points', authMiddleware, (req, res) => {
//     res.sendFile(path.join(__dirname, '../../portal/points.html'));
// });
router.get('/points', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../portal/points.html'));
});
res.sendFile(path.resolve(__dirname, '../../portal/points.html'));


// Serve about.html
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../../portal/about.html'));
});

// Serve contact.html
router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../../portal/contact.html'));
});

// Serve sponsorship.html
router.get('/sponsorship', (req, res) => {
    res.sendFile(path.join(__dirname, '../../portal/sponsorship.html'));
});

// Serve leadership.html
router.get('/leadership', (req, res) => {
    res.sendFile(path.join(__dirname, '../../portal/leadership.html'));
});

// Serve legacy.html
router.get('/legacy', (req, res) => {
    res.sendFile(path.join(__dirname, '../../portal/legacy.html'));
});

// Process attendance script
const { exec } = require('child_process');

router.get('/process-attendance', (req, res) => {
    exec('python3 AKPsiWebsite/scripts/process_attendance.py', (error, stdout, stderr) => {
        if (error) {
            console.error('Process attendance error:', error);
            return res.status(500).send('Error processing attendance');
        }
        res.send('Attendance processed successfully');
    });
});

module.exports = router;
