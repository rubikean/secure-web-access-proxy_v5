// backend/models/log.js
const pool = require('../config/db');

const createLog = async (userId, action, description) => {
  const result = await pool.query(
    'INSERT INTO logs (user_id, action, description) VALUES ($1, $2, $3) RETURNING *',
    [userId, action, description]
  );
  return result.rows[0];
};

module.exports = {
  createLog,
};
