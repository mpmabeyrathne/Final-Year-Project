'user strict';

const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1023',
    database: 'neuro_sketch'
});
dbConn.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});

module.exports = dbConn;
