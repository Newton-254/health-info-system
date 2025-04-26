// backend/controllers/clientController.js
const Client = require('../models/client');
const Program = require('../models/program');

// Register a new client
exports.registerClient = (req, res) => {
    const { name, age, gender } = req.body;
    if (!name || !age || !gender) {
        return res.status(400).json({ message: "All fields are required." });
    }

    Client.create(name, age, gender, (err, clientId) => {
        if (err) {
            return res.status(500).json({ message: "Failed to register client." });
        }
        res.status(201).json({ message: "Client registered successfully.", clientId });
    });
};

// Get all clients
exports.getAllClients = (req, res) => {
    Client.findAll((err, clients) => {
        if (err) {
            return res.status(500).json({ message: "Failed to fetch clients." });
        }
        res.json(clients);
    });
};

// Search client by name
exports.searchClient = (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ message: "Name query is required." });
    }

    Client.findByName(name, (err, clients) => {
        if (err) {
            return res.status(500).json({ message: "Failed to search clients." });
        }
        res.json(clients);
    });
};

// View client profile
exports.getClientProfile = (req, res) => {
    const clientId = req.params.id;

    Client.findById(clientId, (err, client) => {
        if (err || !client) {
            return res.status(404).json({ message: "Client not found." });
        }

        Client.getClientPrograms(clientId, (err, programs) => {
            if (err) {
                return res.status(500).json({ message: "Failed to fetch client programs." });
            }

            res.json({ ...client, enrolledPrograms: programs });
        });
    });
};

// Enroll client in a program
exports.enrollClientInProgram = (req, res) => {
    const clientId = req.params.id;
    const { programId } = req.body;

    if (!programId) {
        return res.status(400).json({ message: "Program ID is required." });
    }

    Client.enrollInProgram(clientId, programId, (err, enrollmentId) => {
        if (err) {
            return res.status(500).json({ message: "Failed to enroll client in program." });
        }
        res.status(201).json({ message: "Client enrolled successfully.", enrollmentId });
    });
};
