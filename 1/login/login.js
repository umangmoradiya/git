
const express = require("express");
const app = express();

const cors = require("cors");

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));


const mysql = require("mysql");
// const { read } = require("fs");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'umang',
    connectionLimit: 15,
});

db.connect((err) => {
    if (err) throw err;
    console.log("database connected successfully....");
});

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));



app.post("/login",(req, res) => {
   
    // var {email,password} = req.body;
    var email = req.body.email;
    var password = req.body.password;
    
    console.log(email);
    console.log(req.body);
    if(email === "admin@gmail.com" && password === "123456")
    {
        res.json("login success...")
    }
    else{
        res.json("login fail")
    }
    res.end();

});

app.post("/contact",(req,res)=>{
        var name = req.body.name;
        var email = req.body.email;
        var contactno = req.body.contactno;
        var address = req.body.address;
        var skill = req.body.skill;
        var description = req.body.description;
        var clients = req.body.clients;
        var project = req.body.project;
        var review = req.body.review;
        var reword = req.body.reword;



        db.query(`INSERT INTO contact(name,email,contactno,address,skill,description,clients,project,review,reword)VALUES(?,?,?,?,?,?,?,?,?,?)`,[name,email,contactno,address,skill,description,clients,project,review,reword],(err,data)=>{
            if(err){
                res.status(400).send({
                    'message': 'contact not inserted Successfully...',
                   
                })
                console.log(err)
            }else{
                res.send({
                    'message': 'contact inserted Successfully...',
                    "msg": data
            })
            }
        });

});






app.listen(5455, () => {
    console.log("server listening the port no. 5455");
});
// app.listen(5455);