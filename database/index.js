const mysql = require('mysql');
const { database } = require('../config');

const db = mysql.createConnection(database);

db.connect((err) => {
    if (err) return console.log('CONNECTION ERROR:', err.message);

    console.log('Database connection established');
});

module.exports = db;
