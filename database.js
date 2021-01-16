var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost', //gdje se nalazi baza
    user: 'root',
    password: 'root',
    database: 'wt2018257'
});

connection.connect();

module.exports = connection;