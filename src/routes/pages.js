const express = require('express');
const router = express.Router();
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/index.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/about.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/login.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/register.html'));
});

router.get('/points', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/points.html'));
});

router.get('/calendar', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/calendar.html'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/contact.html'));
});

router.get('/sponsorship', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/sponsorship.html'));
});

router.get('/leadership', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/leadership.html'));
});

router.get('/legacy', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/legacy.html'));
});

router.get('/portal', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/portal.html'));
});
const { exec } = require('child_process');

router.get('/process-attendance', (req, res) => {
    exec('python3 scripts/process_attendance.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error processing attendance');
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send('Error processing attendance');
        }
        console.log(`stdout: ${stdout}`);
        res.send('Attendance processed successfully');
    });
});

module.exports = router;
