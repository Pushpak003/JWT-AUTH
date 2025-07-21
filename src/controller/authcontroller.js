const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

exports.signup = async(req, res) => {
    const{username,password }= req.body;
    try {
        const hashedpassword = await bcrypt.hash(password,10);
        const result = await pool.query('INSERT INTO users(username,password) VALUES ($1,$2) RETURNING *',[username,hashedpassword]);
        const user = result.rows[0];
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                username: user.username
            }
        });
    }catch(err) {
         if (err.code === '23505') {
      // unique violation
      return res.status(409).json({ message: 'Username already exists' });
    }
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
};
exports.login = async(req, res) => {
    const {username,password} = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { 
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });       
        res.json({
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                username: user.username
            }
        });
    }catch(err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
};
exports.profile = async(req, res) => {
    res.json({
        message: 'Protected profile',user:req.user
    });
};