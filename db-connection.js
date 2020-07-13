var mysql = require('mysql');


var con = mysql.createConnection({
    host: "74.208.228.35",
    user: "carbon_print",
    password: "printCarbon@321",
    database: "db_mountains"
});

con.connect(function (err) {
    if (err) throw err;
});

module.exports = con;