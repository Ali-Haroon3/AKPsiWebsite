// generateHash.js
const bcrypt = require('bcryptjs');

const plaintextPassword = 'Password123'; // Replace with your desired password
const saltRounds = 10;

bcrypt.hash(plaintextPassword, saltRounds, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hashed Password:', hash);
    }
});
