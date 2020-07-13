var mysql = require('mysql');
const { HOST, USER, PASSWORD, DATABASE } = require('./config');

var con = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
});

con.connect(function (err) {
    if (err) throw err;
});

module.exports = con;