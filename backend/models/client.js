const db = require('../database/database');

const Client = {
    create: (name, age, gender, callback) => {
        const sql = `INSERT INTO clients (name, age, gender) VALUES (?, ?, ?)`;
        db.run(sql, [name, age, gender], function (err) {
            callback(err, this ? this.lastID : null);
        });
    },

    findAll: (callback) => {
        const sql = `SELECT * FROM clients`;
        db.all(sql, [], callback);
    },

    findById: (id, callback) => {
        const sql = `SELECT * FROM clients WHERE id = ?`;
        db.get(sql, [id], callback);
    },

    findByName: (name, callback) => {
        const sql = `SELECT * FROM clients WHERE name LIKE ?`;
        db.all(sql, [`%${name}%`], callback);
    },

    enrollInProgram: (clientId, programId, callback) => {
        const sql = `INSERT INTO client_programs (client_id, program_id) VALUES (?, ?)`;
        db.run(sql, [clientId, programId], function (err) {
            callback(err, this ? this.lastID : null);
        });
    },

    getClientPrograms: (clientId, callback) => {
        const sql = `
            SELECT programs.id, programs.name, cp.enrolled_at
            FROM programs
            JOIN client_programs cp ON programs.id = cp.program_id
            WHERE cp.client_id = ?
        `;
        db.all(sql, [clientId], callback);
    }
};

module.exports = Client;
