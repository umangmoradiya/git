const express = require("express");
const app = express();

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));

const mysql = require("mysql");

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

app.get("/home",(req, res) => {
    res.sendFile(__dirname+"/home.html");
});

app.get("/insert.html",(req, res) => {
    res.sendFile(__dirname+"/insert.html");
});
                                                     
app.post("/insert.html",(req,res)=>{
   const first_name =req.body.first_name;
   const last_name =req.body.last_name;
   const email =req.body.email;
   const password =req.body.password;
   const phone_no =req.body.phone_no;

db.query("INSERT INTO login (first_name,last_name,email,password,phone_no) values(?,?,?,?,?)",[first_name,last_name,email,password,phone_no],(err,data,fields)=>{
        if(err){
            res.send(err);
            console.log(err)  
        }else{
            // res.send({ status: true, msg: "data insert..." }); 
            res.redirect("/yes");
        }
    });     
});

app.get("/yes",(req, res) => {
    res.sendFile(__dirname+"/yes.html");
});

app.get("/login.html",(req, res) => {
    res.sendFile(__dirname+"/login.html");
});

app.post("/login.html", (req, res) => {
    var password  = req.body.password;
    var email = req.body.email;
    var query = "email =" + email + "      "+ " password =" + password;
    db.query(`select * from login where email = ? and password = ? `, [email,password], (err, results) => {
        console.log(query)
        if (results.length > 0) {
            //   res.send(results);
              res.redirect("/welcome");
            
        } else {
            // res.status(400).send({
            //     'message': 'User is already registerd'
            // })
            res.write("no user...");
        }
        res.end();
    });
});

app.get("/welcome",(req, res) => {
    res.sendFile(__dirname+"/welcome.html");
});

app.get("/about.html",(req,res)=>{
        res.sendFile(__dirname + "/about.html");
});

app.listen(6677, () => {
    console.log("srever star 6677");
});


//htbml back button
// let btn =document.querySelector("button");

// btn.addEventListener("click",()=>{
//     window.history.back();
// });



