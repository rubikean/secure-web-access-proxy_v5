const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAdmin } = require('../middleware/authMiddleware');

router.post('/users', isAdmin, userController.createUser);
router.delete('/users/:id', isAdmin, userController.deleteUser);

module.exports = router;
