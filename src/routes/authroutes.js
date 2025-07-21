const express = require('express');
const router = express.Router();
const authController = require('../controller/authcontroller');
const authMiddleware = require('../middleware/authmiddleware');
// Signup route
router.post('/signup',authController.signup);
// Login route
router.post('/login',authController.login);
// Protected profile route
router.get('/profile', authMiddleware.authenticate, authController.profile);

module.exports = router;

