const express = require("express");
const app = express();

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));

const mysql = require("my-sql");

const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "umang",
    connectionlimit: 10,
});

db.connect((err) => {
    if (err) throw err;
    console.log("database connected successfully....");

});



app.get("/name", (req, res) => {
    var name = req.body.name
    res.json(name);

});

// app.get("/login", (req, res) => {
//     var email = req.body.email;
//     var password = req.body.password;
//     db.query("select *from form2 where email=? and password=?",[email,password],(err,data)=>{
//     if (data.length > 0) {
//         res.send({  "login": "success"});
//     } else {
       
//         res.send({ "login": "fail" });
//     }
//     })
// })
app.post("/login", (req, res) => {
 
    var password = req.body.password;
    var email = req.body.email;
    var query = "email =" + email + "      " + " password =" + password;
    db.query(`select * from form2 where email = ? and password = ? `, [email, password], (err, results) => {
        console.log(query)
        if (results.length > 0) {

            res.send({
                'message': 'login Successfully...',
                "msg": results

            });
            console.log("welcome....")


        } else {


            res.status(400).send({
                'message': 'login not Successfully...',

            })
        }
        res.end();
    });
});
app.listen(7070, () => {
    console.log("post no is 7070");
})