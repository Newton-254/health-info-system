const db = require('../database/database');

const Program = {
    create: (name, callback) => {
        const sql = `INSERT INTO programs (name) VALUES (?)`;
        db.run(sql, [name], function (err) {
            callback(err, this ? this.lastID : null);
        });
    },

    findAll: (callback) => {
        const sql = `SELECT * FROM programs`;
        db.all(sql, [], callback);
    }
};

module.exports = Program;
