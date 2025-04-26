// backend/controllers/programController.js
const Program = require('../models/program');

// Create a new program
exports.createProgram = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Program name is required." });
    }

    Program.create(name, (err, programId) => {
        if (err) {
            return res.status(500).json({ message: "Failed to create program." });
        }
        res.status(201).json({ message: "Program created successfully.", programId });
    });
};

// Get all programs
exports.getAllPrograms = (req, res) => {
    Program.findAll((err, programs) => {
        if (err) {
            return res.status(500).json({ message: "Failed to fetch programs." });
        }
        res.json(programs);
    });
};
