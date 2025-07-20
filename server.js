require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./src/index');
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/auth', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 


