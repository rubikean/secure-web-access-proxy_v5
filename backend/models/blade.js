// backend/models/blade.js
const pool = require('../config/db');

const assignBladeToUser = async (userId, bladeIp) => {
  const result = await pool.query(
    'INSERT INTO blade_access (user_id, blade_ip) VALUES ($1, $2) RETURNING *',
    [userId, bladeIp]
  );
  return result.rows[0];
};

const getBladesForUser = async (userId) => {
  const result = await pool.query(
    'SELECT blade_ip FROM blade_access WHERE user_id = $1',
    [userId]
  );
  return result.rows;
};

module.exports = {
  assignBladeToUser,
  getBladesForUser,
};
