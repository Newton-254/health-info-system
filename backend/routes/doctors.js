// backend/routes/doctors.js
const express = require('express');
const router = express.Router();
const { createDoctor, findDoctorByUsername } = require('../models/doctor');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { registerDoctorSession } = require('../middlewares/authMiddleware');

// Doctor registration (for testing or first doctor)
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    createDoctor(username, password, (err, doctorId) => {
        if (err) {
            return res.status(500).json({ message: "Failed to register doctor." });
        }
        res.status(201).json({ message: "Doctor registered successfully.", doctorId });
    });
});

// Doctor login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    findDoctorByUsername(username, (err, doctor) => {
        if (err || !doctor) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        bcrypt.compare(password, doctor.password, (err, result) => {
            if (result) {
                // Generate a simple auth token
                const token = uuidv4();
                registerDoctorSession(token, doctor);

                res.json({ message: "Login successful.", token });
            } else {
                res.status(401).json({ message: "Invalid username or password." });
            }
        });
    });
});

module.exports = router;
