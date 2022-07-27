const express = require("express");
const app = express();

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:false}));

const mysql = require("my-sql");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'doctor1',
    connectionLimit: 10,
});

 db.connect((err)=>{
    if(err)throw err;
    console.log("database connected successfully....")
})

app.listen(6000,(req,res)=>{
    console.log("port no is 6000")
});