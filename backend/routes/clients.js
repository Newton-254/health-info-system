const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Middleware to protect routes (only logged-in doctors)
const { authenticateDoctor } = require('../middlewares/authMiddleware');

// Register a new client
router.post('/', authenticateDoctor, clientController.registerClient);

// Get all clients
router.get('/', authenticateDoctor, clientController.getAllClients);

// Search client by name
router.get('/search', authenticateDoctor, clientController.searchClient);

// Get client profile by ID
router.get('/:id', authenticateDoctor, clientController.getClientProfile);

// Enroll a client into a program
router.post('/:id/enroll', authenticateDoctor, clientController.enrollClientInProgram);

module.exports = router;
