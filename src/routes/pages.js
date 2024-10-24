const express = require('express');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Serve index.html from the root
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

// Portal-related pages
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../portal/index'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../portal/register'));
});

router.get('/calendar', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../portal/calendar'));
});

router.get('/points', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../portal/points'));
});

// Static pages in the 'views' directory
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../../about'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../../contact'));
});

router.get('/sponsorship', (req, res) => {
    res.sendFile(path.join(__dirname, '../../sponsorship'));
});

router.get('/leadership', (req, res) => {
    res.sendFile(path.join(__dirname, '../../leadership'));
});

router.get('/legacy', (req, res) => {
    res.sendFile(path.join(__dirname, '../../legacy'));
});

// Process attendance script
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