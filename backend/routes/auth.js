const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: 'views' });
});

router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
