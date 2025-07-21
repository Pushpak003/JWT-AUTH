require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticate = (req, res, next) => {
    const authheader = req.headers['authorization'];

    const token = authheader && authheader.split(' ')[1];
    if(!token) return res.status(401).json({ message: 'Token required'});

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};