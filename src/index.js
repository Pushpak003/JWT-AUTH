const express = require('express');
const router = express.Router();
const authRoutes = require('./routes/authroutes'); 

router.use('/', authRoutes);

module.exports = router;