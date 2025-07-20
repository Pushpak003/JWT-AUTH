const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DB_URL});
 
(async () => {
  try {
    const client = await pool.connect();  // define client
    console.log('✅ Connected to the database');
    client.release();  // release it
  } catch (err) {
    console.error('❌ Database connection error:', err);
  }
})();

module.exports = pool;
