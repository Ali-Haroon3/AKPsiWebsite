// src/routes/user.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/auth/user', authMiddleware, async (req, res) => {
    const userId = req.userId;

    const query = `
        SELECT 
            firstname, lastname, total_points, needed_points,
            alumni_tailgate, assisting_with_interviews, big_brother_mentor, 
            brother_interviews, busik_letters, chapter_attendance, 
            committee_cabinet_member, domingos, exec_member, 
            family_hangouts, family_head, forms, missing_late_forms, 
            hosting_family_initiation, hosting_official_initiation, 
            initiation_so_bro, perfect_attendance, 
            perfect_recruitment_attendance, photocircle_upload_10, 
            posting_on_story, professional_headshot, recruitment_tabling, 
            rush_attendance, rush_event_missed, service_event_attendance, 
            sobro, wellness_week_events, zeta_chats, total
        FROM users WHERE id = ?`;

    try {
        const [results] = await db.query(query, [userId]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

module.exports = router;
