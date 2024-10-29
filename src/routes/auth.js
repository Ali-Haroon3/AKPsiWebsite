// src/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../models/db'); // Using connection pool

// Login Route
router.post('/login', async (req, res) => {
    const { identikey, password } = req.body;

    try {
        // Fetch user based on identikey
        const [rows] = await pool.query('SELECT * FROM users WHERE identikey = ?', [identikey]);
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.hashed_password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });

        // Respond with user data
        res.json({
            redirectUrl: '/portal/points',
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
                totalPoints: user.total_points,
                unexcusedAbsences: user.unexcused_absences, // Included unexcused_absences
                points: {
                    alumniTailgate: user.alumni_tailgate,
                    assistingWithInterviews: user.assisting_with_interviews,
                    bigBrotherMentor: user.big_brother_mentor,
                    brotherInterviews: user.brother_interviews,
                    busikLetters: user.busik_letters,
                    committeeMember: user.committee_cabinet_member, // Adjusted to match DB column
                    domingos: user.domingos,
                    execMember: user.exec_member,
                    familyHangouts: user.family_hangouts,
                    familyHead: user.family_head,
                    formCompletions: user.forms, // Adjusted to match DB column
                    missingLateForms: user.missing_late_forms, // Added missingLateForms
                    hostingInitiation: user.hosting_family_initiation, // Adjusted to match DB column
                    hostingOfficialInitiation: user.hosting_official_initiation, // Adjusted to match DB column
                    initiationSoBro: user.initiation_so_bro, // Adjusted naming
                    perfectAttendance: user.perfect_attendance,
                    perfectRecruitmentAttendance: user.perfect_recruitment_attendance,
                    photocircleUpload10: user.photocircle_upload_10, // Adjusted naming
                    postingOnStory: user.posting_on_story,
                    professionalHeadshot: user.professional_headshot,
                    recruitmentTabling: user.recruitment_tabling,
                    rushAttendance: user.rush_attendance,
                    rushEventMissed: user.rush_event_missed,
                    serviceEventAttendance: user.service_event_attendance, // Adjusted naming
                    sobro: user.sobro,
                    wellnessWeekEvents: user.wellness_week_events,
                    zetaChats: user.zeta_chats
                },
            },
        });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Registration Route
router.post('/register', async (req, res) => {
    console.log('Received registration request:', req.body); // Debugging
    const { firstname, lastname, identikey, email, password } = req.body;

    try {
        // Check if identikey exists
        const [results] = await pool.query('SELECT * FROM users WHERE identikey = ?', [identikey]);
        console.log('Database results before update:', results); // Debugging

        if (results.length === 0) {
            console.log('Identikey not found.');
            return res.status(400).json({ message: 'Identikey not found. Contact admin.' });
        }

        const user = results[0];

        // Check if user has already registered
        if (user.email && user.hashed_password) {
            console.log('User already registered.');
            return res.status(400).json({ message: 'User already registered. Please log in.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Log the values being updated
        console.log('Updating user with:', {
            firstname,
            lastname,
            email,
            hashedPassword,
            identikey
        });

        // Update user with registration details
        const updateQuery = `
            UPDATE users 
            SET firstname = ?, lastname = ?, email = ?, hashed_password = ? 
            WHERE identikey = ?
        `;

        const [updateResult] = await pool.query(updateQuery, [firstname, lastname, email, hashedPassword, identikey]);

        console.log('User updated successfully.');
        console.log('Rows affected:', updateResult.affectedRows);
        console.log('Warnings:', updateResult.warningStatus);

        // Optionally, fetch the updated user
        const [updatedUser] = await pool.query('SELECT * FROM users WHERE identikey = ?', [identikey]);
        console.log('Updated user:', updatedUser);

        res.status(200).json({ message: 'Registration successful! You can now log in.' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Logout Route (Optional)
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully!' });
});

module.exports = router;
