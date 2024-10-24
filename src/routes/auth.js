// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const router = express.Router();
// const db = require('../models/db');

// // Login Route
// router.post('/login', async (req, res) => {
//     const { identikey, password } = req.body;

//     try {
//         const query = 'SELECT * FROM users WHERE identikey = ?';
//         db.query(query, [identikey], async (err, results) => {
//             if (err) {
//                 console.error('Database error:', err);
//                 return res.status(500).json({ message: 'Internal Server Error' });
//             }

//             if (results.length === 0) {
//                 return res.status(401).json({ message: 'Invalid credentials' });
//             }

//             const user = results[0];
//             const isPasswordValid = await bcrypt.compare(password, user.hashed_password);

//             if (!isPasswordValid) {
//                 return res.status(401).json({ message: 'Invalid credentials' });
//             }

//             // Generate JWT token
//             const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
//             res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });

//             res.json({
//                 redirectUrl: './points',
//                 user: {
//                     preferred_name: user.preferred_name,
//                     year: new Date(user.created_at).getFullYear(),
//                     totalPoints: user.total_points,
//                     unexcusedAbsences: user.unexcused_absences,
//                     points: {
//                         alumniTailgate: user.alumni_tailgate,
//                         assistingWithInterviews: user.assisting_with_interviews,
//                         bigBrotherMentor: user.big_brother_mentor,
//                         brotherInterviews: user.brother_interviews,
//                         busikLetters: user.busik_letters,
//                         committeeMember: user.committee_member,
//                         domingos: user.domingos,
//                         execMember: user.exec_member,
//                         familyHangouts: user.family_hangouts,
//                         familyHead: user.family_head,
//                         formCompletions: user.form_completions,
//                         hostingInitiation: user.hosting_initiation,
//                         professionalHeadshot: user.professional_headshot,
//                         rushAttendance: user.rush_attendance,
//                         serviceEvent: user.service_event,
//                         wellnessWeek: user.wellness_week,
//                     },
//                 },
//             });
//         });
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// // Register Route
// router.post('/register', async (req, res) => {
//     const { firstname, lastname, identikey, email, password } = req.body;

//     try {
//         const query = 'SELECT * FROM users WHERE identikey = ?';
//         db.query(query, [identikey], async (err, results) => {
//             if (err) {
//                 console.error('Database error:', err);
//                 return res.status(500).json({ message: 'Internal Server Error' });
//             }

//             if (results.length === 0) {
//                 return res.status(400).json({ message: 'Identikey not found. Contact admin.' });
//             }

//             const hashedPassword = await bcrypt.hash(password, 10);
//             const updateQuery = `
//                 UPDATE users 
//                 SET firstname = ?, lastname = ?, email = ?, hashed_password = ? 
//                 WHERE identikey = ?
//             `;

//             db.query(updateQuery, [firstname, lastname, email, hashedPassword, identikey], (err) => {
//                 if (err) {
//                     console.error('Error updating user:', err);
//                     return res.status(500).json({ message: 'Internal Server Error' });
//                 }

//                 res.status(200).json({ message: 'Registration successful! You can now log in.' });
//             });
//         });
//     } catch (error) {
//         console.error('Registration error:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// // Logout Route
// router.post('/logout', (req, res) => {
//     res.clearCookie('token');
//     res.status(200).json({ message: 'Logged out successfully!' });
// });

// module.exports = router;
// src/routes/auth.js
// src/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../models/db'); // Updated to use connection pool

// Login Route
router.post('/login', async (req, res) => {
    const { identikey, password } = req.body;

    try {
        const [results] = await db.query('SELECT * FROM users WHERE identikey = ?', [identikey]);

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET, // Use environment variable for secret
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });

        res.json({
            redirectUrl: '/points', // Updated to route without .html
            user: {
                preferred_name: user.preferred_name,
                year: new Date(user.created_at).getFullYear(),
                totalPoints: user.total_points,
                unexcusedAbsences: user.unexcused_absences,
                points: {
                    alumniTailgate: user.alumni_tailgate,
                    assistingWithInterviews: user.assisting_with_interviews,
                    bigBrotherMentor: user.big_brother_mentor,
                    brotherInterviews: user.brother_interviews,
                    busikLetters: user.busik_letters,
                    committeeMember: user.committee_member,
                    domingos: user.domingos,
                    execMember: user.exec_member,
                    familyHangouts: user.family_hangouts,
                    familyHead: user.family_head,
                    formCompletions: user.form_completions,
                    hostingInitiation: user.hosting_initiation,
                    professionalHeadshot: user.professional_headshot,
                    rushAttendance: user.rush_attendance,
                    serviceEvent: user.service_event,
                    wellnessWeek: user.wellness_week,
                },
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Register Route
router.post('/register', async (req, res) => {
    const { firstname, lastname, identikey, email, password } = req.body;

    try {
        const [results] = await db.query('SELECT * FROM users WHERE identikey = ?', [identikey]);

        if (results.length === 0) {
            return res.status(400).json({ message: 'Identikey not found. Contact admin.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const updateQuery = `
            UPDATE users 
            SET firstname = ?, lastname = ?, email = ?, hashed_password = ? 
            WHERE identikey = ?
        `;

        await db.query(updateQuery, [firstname, lastname, email, hashedPassword, identikey]);

        res.status(200).json({ message: 'Registration successful! You can now log in.' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Logout Route
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully!' });
});

module.exports = router;
