// const express = require('express');
// const bcrypt = require('bcryptjs');
// const router = express.Router();
// const db = require('../models/db');

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

//             console.log('Login successful!');
//             res.json({
//                 redirectUrl: './points.html',
//                 user: {
//                     preferred_name: user.preferred_name, // Use preferred_name here
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
//                     }
//                 }
//             });
//         });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });




// // Register Route
// router.post('/register', async (req, res) => {
//     const { firstname, lastname, identikey, email, password } = req.body;

//     try {
//         console.log(`Received identikey: ${identikey}`);

//         // Verify the MySQL query with detailed debugging
//         const query = 'SELECT * FROM users WHERE identikey = ?';
//         console.log('Executing query:', query, [identikey]);

//         db.query(query, [identikey], async (err, results) => {
//             if (err) {
//                 console.error('Database error:', err);
//                 return res.status(500).json({ message: 'Internal Server Error' });
//             }

//             console.log('Raw Query Results:', results);

//             // Ensure results are properly returned
//             if (!results || results.length === 0) {
//                 console.warn('Identikey not found in the database.');
//                 return res.status(400).json({ message: 'Identikey not found. Please contact admin.' });
//             }

//             console.log(`Identikey found: ${results[0].identikey}`);

//             // Hash the password
//             const hashedPassword = await bcrypt.hash(password, 10);

//             // Update user information in the database
//             const updateQuery = `
//                 UPDATE users 
//                 SET firstname = ?, lastname = ?, email = ?, hashed_password = ? 
//                 WHERE identikey = ?
//             `;
//             console.log('Executing update query:', updateQuery);

//             db.query(
//                 updateQuery,
//                 [firstname, lastname, email, hashedPassword, identikey],
//                 (err, updateResult) => {
//                     if (err) {
//                         console.error('Error updating user:', err);
//                         return res.status(500).json({ message: 'Internal Server Error' });
//                     }

//                     console.log('User successfully updated:', updateResult);
//                     res.status(200).json({ message: 'Registration successful! You can now log in.' });
//                 }
//             );
//         });
//     } catch (error) {
//         console.error('Error during registration:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../models/db');

// Login route
router.post('/login', async (req, res) => {
    const { identikey, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE identikey = ?';
        db.query(query, [identikey], async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.hashed_password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });

            // Secure cookie for session management
            res.cookie('token', token, { 
                httpOnly: true, 
                secure: true, 
                sameSite: 'None' 
            });

            console.log('Login successful!');

            // Send response with redirect URL and user data
            res.json({
                redirectUrl: './points.html',
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
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
