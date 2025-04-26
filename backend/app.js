// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const clientRoutes = require('./routes/clients');
const programRoutes = require('./routes/programs');
const doctorRoutes = require('./routes/doctors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/clients', clientRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/doctors', doctorRoutes); // for login/register

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Health Information System API!');
});

// Error handling (Optional nice touch)
app.use((req, res, next) => {
    res.status(404).json({ message: "Endpoint not found." });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
