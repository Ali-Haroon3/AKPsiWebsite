const express = require('express');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../AKPsiWebsite/views/index.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../../AKPsiWebsite/views/about.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../AKPsiWebsite/portal/index.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../AKPsiWebsite/portal/register.html'));
});

router.get('/points', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../AKPsiWebsite/portal/points.html'));
});

router.get('/calendar', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../AKPsiWebsite/portal/calendar.html'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../../AKPsiWebsite/views/contact.html'));
});

router.get('/sponsorship', (req, res) => {
    res.sendFile(path.join(__dirname, '../../AKPsiWebsite/views/sponsorship.html'));
});

router.get('/leadership', (req, res) => {
    res.sendFile(path.join(__dirname, '../../AKPsiWebsite/views/leadership.html'));
});

router.get('/legacy', (req, res) => {
    res.sendFile(path.join(__dirname, '../../AKPsiWebsite/views/legacy.html'));
});

router.get('/portal', (req, res) => {
    res.sendFile(path.join(__dirname, '../../AKPsiWebsite/portal/index.html'));
});

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
