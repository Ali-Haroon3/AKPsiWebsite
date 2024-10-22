const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies?.token;  // Ensure cookies object exists
    if (!token) {
        return res.status(403).redirect('/portal/index.html');
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(500).send('Failed to authenticate token');
        req.userId = decoded.id;
        next();
    });
};
