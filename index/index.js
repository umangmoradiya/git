const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));



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
});

app.post("/insert",(req,res)=>{

    // console.log(req.body);return false;
   const roll_no =req.body.roll_no;
   const name =req.body.name;
   const marks =req.body.marks;

   db.query("INSERT INTO student (roll_no,name,marks) values(?,?,?)",[roll_no,name,marks],(err,pop,fields)=>{
    res.send({ status: true, msg: "data insert..." });  
    });     
});



app.listen(5050,()=>{
    console.log("port on is 5050");
}); 