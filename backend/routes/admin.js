// backend/routes/admin.js
const express = require('express');
const { createUser } = require('../models/user');
const { assignBladeToUser } = require('../models/blade');
const { createLog } = require('../models/log');
const { ensureAdmin } = require('../middlewares/auth');
const router = express.Router();

// Apply admin-check middleware
router.use(ensureAdmin);

// Add a new user
router.post('/add-user', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = await createUser(username, password, role);
    await createLog(req.user.id, 'add-user', `Added user ${username}`);
    res.json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign blade access to a user
router.post('/assign-blade', async (req, res) => {
  const { userId, bladeIp } = req.body;
  try {
    const assignment = await assignBladeToUser(userId, bladeIp);
    await createLog(req.user.id, 'assign-blade', `Assigned blade ${bladeIp} to user ${userId}`);
    res.json({ message: 'Blade assigned', assignment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve activity logs
router.get('/logs', async (req, res) => {
  try {
    const pool = require('../config/db');
    const result = await pool.query('SELECT * FROM logs ORDER BY created_at DESC');
    res.json({ logs: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
