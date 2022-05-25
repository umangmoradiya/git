const mysql = require("mysql");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'umang',
    connectionLimit: 10,
});

db.connect(err=>{
    if(err) throw err;
    console.log("database connected successfully....");
})

module.exports = db;
