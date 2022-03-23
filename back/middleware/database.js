const mysql = require('mysql');

const database = mysql.createConnection({
    host     : 'localhost',
    user     : 'JimmyHeller',
    password : '4z4gpa0301JH!',
    database : 'Groupomania'
});

database.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database 'Groupomania'");
});

module.exports = database;

