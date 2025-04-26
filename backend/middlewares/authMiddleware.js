// backend/middlewares/authMiddleware.js
const doctors = {}; // Temporary in-memory storage for logged-in doctors (token: doctor info)

function authenticateDoctor(req, res, next) {
    const token = req.headers['authorization'];

    if (!token || !doctors[token]) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    req.doctor = doctors[token]; // Attach doctor info to request
    next();
}

// Helper to register logged-in doctors
function registerDoctorSession(token, doctor) {
    doctors[token] = doctor;
}

module.exports = {
    authenticateDoctor,
    registerDoctorSession
};
