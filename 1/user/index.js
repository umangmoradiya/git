const express = require("express");
const app = express();
const bodyparser = require ("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

const mysql =require("my-sql");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'umang',
    connectionLimit: 10,

});

db.connect((err) => {
    if (err) throw err;
    console.log("database connected successfully....");
});

app.post("/",(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    
        db.query(`select * from login where email =? and password = ? `,[email,password],(err,results,fields)=>{
        if(results.length > 0){
            res.send(results)
            console.log(results)
        }else{
            res.send("no data");
        }
        res.end();
    });
});

app.listen(5050,()=>{
    console.log("port no is 5050");
});
