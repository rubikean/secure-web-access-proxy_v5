// backend/routes/auth.js
const express = require('express');
const passport = require('passport');
const { createLog } = require('../models/log');
const router = express.Router();

// Login endpoint
router.post('/login', (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.status(401).json({ message: info.message }); }
    req.logIn(user, async (err) => {
      if (err) { return next(err); }
      // Log successful login
      await createLog(user.id, 'login', 'User logged in');
      return res.json({ message: 'Login successful', user: { id: user.id, username: user.username, role: user.role } });
    });
  })(req, res, next);
});

// Logout endpoint
router.post('/logout', async (req, res) => {
  if (req.user) {
    await createLog(req.user.id, 'logout', 'User logged out');
  }
  req.logout();
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
