// src/routes/user.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');
const authMiddleware = require('../middleware/authMiddleware');

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

module.exports = router;
