const db = require('../database/database');
const bcrypt = require('bcrypt');

const createDoctor = (username, password, callback) => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return callback(err);

        const sql = `INSERT INTO doctors (username, password) VALUES (?, ?)`;
        db.run(sql, [username, hash], function (err) {
            callback(err, this ? this.lastID : null);
        });
    });
};

// Find a doctor by username
const findDoctorByUsername = (username, callback) => {
    const sql = `SELECT * FROM doctors WHERE username = ?`;
    db.get(sql, [username], callback);
};

module.exports = {
    createDoctor,
    findDoctorByUsername
};
