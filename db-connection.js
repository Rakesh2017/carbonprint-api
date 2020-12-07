var mysql = require('mysql');
const { HOST, USER, PASSWORD, DATABASE } = require('./config');

/*  
We have used environment (.env extension) declarations to CONCEAL the sensitive 
information. 
HOST, USER, PASSWORD, DATABASE are being imported from config.js file which in turn
import secret variables from .env file
*/

// NOTE: for server othher than WMDD, use exact IP(can be found at application page of WMDD) not a localhost 

// connection setup
var con = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
});

// establish connection
con.connect(function (err) {
    if (err) {
        throw err;
    }
});

module.exports = con;

