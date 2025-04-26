// backend/routes/programs.js
const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

// Middleware to protect routes
const { authenticateDoctor } = require('../middlewares/authMiddleware');

// Create a new health program
router.post('/', authenticateDoctor, programController.createProgram);

// Get all programs
router.get('/', authenticateDoctor, programController.getAllPrograms);

module.exports = router;
