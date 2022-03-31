const mysql = require('mysql');


var pool = mysql.createPool({
    "user":     process.env.MYSQL_USER ,
    "password": process.env.MYSQL_PASSWORD ,
    "database": process.env.MYSQL_DATABASE ,
    "host":     process.env.MYSQL_HOST ,
    "port":     process.env.MYSQL_PORT 
})

exports.pool = pool;


// Heroku environment for details.

// Access Credentials
// Username:	b2f5db18da66e3
// Password:	cd58177f (Reset)

// "mysql://b2f5db18da66e3:cd58177f@us-cdbr-east-04.cleardb.com/heroku_1008e6cee19558a?reconnect=true"