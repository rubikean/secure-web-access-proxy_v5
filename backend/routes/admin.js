const express = require('express');
const router = express.Router();
const bladeController = require('../controllers/bladeController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.post('/assign-blade', isAuthenticated, bladeController.assignBladeToUser);
router.get('/dashboard', isAuthenticated, bladeController.getUserBlades);

module.exports = router;
