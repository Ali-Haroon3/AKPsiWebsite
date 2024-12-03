// src/routes/user.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');


// Fetch Authenticated User Data
router.get('/auth/user', authMiddleware, (req, res) => {
    const userId = req.userId;

    const query = `
        SELECT 
            firstname, 
            lastname, 
            total_points, 
            needed_points,
            alumni_tailgate, 
            assisting_with_interviews, 
            big_brother_mentor, 
            brother_interviews, 
            busik_letters, 
            chapter_attendance, 
            committee_cabinet_member, 
            domingos, 
            exec_member, 
            family_hangouts, 
            family_head, 
            forms, 
            missing_late_forms, 
            hosting_family_initiation, 
            hosting_official_initiation, 
            initiation_so_bro, 
            perfect_attendance, 
            perfect_recruitment_attendance, 
            photocircle_upload_10, 
            posting_on_story, 
            professional_headshot, 
            recruitment_tabling, 
            rush_attendance, 
            rush_event_missed, 
            service_event_attendance, 
            sobro, 
            wellness_week_events, 
            zeta_chats, 
            unexcused_absences, 
            total_points
        FROM users 
        WHERE id = ?
    `;

    db.query(query, [userId])
        .then(([results]) => {
            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(results[0]);
        })
        .catch((err) => {
            console.error('Error fetching user data:', err);
            res.status(500).json({ message: 'Error fetching user data' });
        });
});

// Leaderboard Route
router.get('/leaderboard', authMiddleware, (req, res) => {
    const query = `
        SELECT 
            firstname, 
            lastname, 
            identikey, 
            total_points
        FROM users
        ORDER BY total_points DESC
        LIMIT 10
    `;

    db.query(query)
        .then(([rows]) => {
            res.json(rows);
        })
        .catch((err) => {
            console.error('Error fetching leaderboard data:', err);
            res.status(500).json({ message: 'Error fetching leaderboard data' });
        });
});
// router.get('/brother-interviews', authMiddleware, (req, res) => {
//     const userId = req.userId;

//     // Get the identikey of the user
//     const getUserIdentikeyQuery = 'SELECT identikey FROM users WHERE id = ?';
//     db.query(getUserIdentikeyQuery, [userId])
//         .then(([results]) => {
//             if (results.length === 0) {
//                 return res.status(404).json({ message: 'User not found' });
//             }
//             const identikey = results[0].identikey;

//             // Now, get the brother interviews
//             const getInterviewsQuery = `
//                 SELECT brother_name, DATE_FORMAT(timestamp, '%Y-%m-%d') as date
//                 FROM brother_interviews
//                 WHERE pledge_identikey = ?
//                 ORDER BY timestamp DESC
//             `;
//             return db.query(getInterviewsQuery, [identikey]);
//         })
//         .then(([interviews]) => {
//             res.json(interviews);
//         })
//         .catch(err => {
//             console.error('Error fetching brother interviews:', err);
//             res.status(500).json({ message: 'Error fetching brother interviews' });
//         });
// });
// router.get('/brother-interviews', authMiddleware, async (req, res) => {
//     try {
//         const userId = req.userId;

//         // Get the identikey of the user (brother)
//         const [userResults] = await db.query('SELECT identikey FROM users WHERE id = ?', [userId]);

//         if (userResults.length === 0) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const brotherIdentikey = userResults[0].identikey;

//         // Fetch all pledges interviewed by this brother
//         const [interviews] = await db.query(
//             'SELECT pledge_full_name FROM brother_interviews WHERE brother_identikey = ?',
//             [brotherIdentikey]
//         );

//         res.json(interviews);
//     } catch (err) {
//         console.error('Error fetching brother interviews:', err);
//         res.status(500).json({ message: 'Error fetching brother interviews' });
//     }
// });
router.get('/brother-interviews', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;

        // Get the identikey of the user (brother)
        const [userResults] = await db.query('SELECT identikey FROM users WHERE id = ?', [userId]);

        if (userResults.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const brotherIdentikey = userResults[0].identikey.toLowerCase();

        // Fetch all pledges interviewed by this brother
        const [interviews] = await db.query(
            'SELECT pledge_full_name FROM brother_interviews WHERE brother_identikey = ?',
            [brotherIdentikey]
        );

        res.json(interviews);
    } catch (err) {
        console.error('Error fetching brother interviews:', err);
        res.status(500).json({ message: 'Error fetching brother interviews' });
    }
});


router.get('/points/bottom50', authMiddleware, async (req, res) => {
    try {
        // Get the total number of users
        const [countResult] = await db.query('SELECT COUNT(*) as count FROM users');
        const totalUsers = countResult[0].count;

        const offset = Math.floor(totalUsers / 2);

        // Get the total_points at that position
        const [pointsResult] = await db.query(
            'SELECT total_points FROM users ORDER BY total_points ASC LIMIT 1 OFFSET ?',
            [offset]
        );

        if (pointsResult.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        const bottom50Points = 27 //pointsResult[0].total_points;

        res.json({ bottom50Points });
    } catch (err) {
        console.error('Error fetching bottom 50 points:', err);
        res.status(500).json({ message: 'Error fetching bottom 50 points' });
    }
});
router.post('/update-password', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const { email, oldPassword, newPassword } = req.body;

    console.log('Received password update request:', { userId, email });

    try {
        // Validate input
        if (!email || !oldPassword || !newPassword) {
            console.log('Missing required fields in request body.');
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Fetch user data
        console.log('Fetching user data from database.');
        const [results] = await db.query('SELECT email, hashed_password FROM users WHERE id = ?', [userId]);

        if (results.length === 0) {
            console.log('User not found in database.');
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const user = results[0];
        console.log('User data fetched:', user);

        // Check if email matches
        if (user.email.toLowerCase() !== email.toLowerCase()) {
            console.log('Provided email does not match registered email.');
            return res.status(400).json({ success: false, message: 'Email does not match registered email.' });
        }

        // Verify old password
        console.log('Verifying old password.');
        const isMatch = await bcrypt.compare(oldPassword, user.hashed_password);
        if (!isMatch) {
            console.log('Old password verification failed.');
            return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
        }

        // Hash new password
        console.log('Hashing new password.');
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in database
        console.log('Updating password in database.');
        const [updateResult] = await db.query('UPDATE users SET hashed_password = ? WHERE id = ?', [hashedPassword, userId]);

        if (updateResult.affectedRows === 0) {
            console.log('Password update failed. No rows affected.');
            return res.status(500).json({ success: false, message: 'Password update failed.' });
        }

        console.log('Password updated successfully.');
        res.json({ success: true, message: 'Password updated successfully.' });
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;
