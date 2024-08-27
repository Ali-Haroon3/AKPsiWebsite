const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

router.post('/register', (req, res) => {
    const { firstname, lastname, identikey, email, password } = req.body;

    console.log('Register Data:', req.body);

    if (!firstname || !lastname || !identikey || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!email.endsWith('@colorado.edu')) {
        return res.status(400).json({ message: 'Invalid email domain' });
    }

    const checkQuery = 'SELECT identikey FROM users WHERE identikey = ?';
    db.query(checkQuery, [identikey], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            return res.status(400).json({ message: 'Identikey already registered' });
        }

        bcrypt.hash(password, 8, (err, hashedPassword) => {
            if (err) throw err;

            const insertQuery = 'INSERT INTO users (firstname, lastname, identikey, email, password, hashed_password) VALUES (?, ?, ?, ?, ?, ?)';
            db.query(insertQuery, [firstname, lastname, identikey, email, password, hashedPassword], (err, result) => {
                if (err) throw err;
                console.log('User registered:', result);
                res.redirect('/portal.html');
            });
        });
    });
});

router.post('/login', (req, res) => {
    const { identikey, password } = req.body;

    console.log('Login Data:', req.body);

    const query = 'SELECT * FROM users WHERE identikey = ?';
    db.query(query, [identikey], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            console.log('No user found with the given identikey');
            return res.status(401).send('Invalid credentials');
        }

        const user = results[0];
        console.log('User found:', user);

        // Compare the input password with the stored plain text password
        if (password !== user.password) {
            console.log('Password does not match');
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: 86400 });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('portal/points.html');
    });
});


module.exports = router;
