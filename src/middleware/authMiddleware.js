const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
    // Retrieve the token from cookies
    const token = req.cookies.token;

    if (!token) {
        console.log('No token found in cookies.');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token using the JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded:', decoded);
        req.userId = decoded.id; // Assuming the JWT payload contains the user ID as 'id'
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
