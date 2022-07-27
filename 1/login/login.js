
const express = require("express");
const app = express();

const cors = require("cors");

var jwt = require('jsonwebtoken');


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
    
    if (email === "admin@gmail.com" && password === "123456") {
        res.json("login success...")
    }
    else {
        res.json("login fail")
    }
    res.end();

});

app.post("/contact", (req, res) => {
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



    db.query(`INSERT INTO contact(name,email,contactno,address,skill,description,clients,project,review,reword)VALUES(?,?,?,?,?,?,?,?,?,?)`, [name, email, contactno, address, skill, description, clients, project, review, reword], (err, data) => {
        if (err) {
            res.status(400).send({
                'message': 'contact not inserted Successfully...',

            })
            console.log(err)
        } else {
            res.send({
                'message': 'contact inserted Successfully...',
                "msg": data
            })
        }
    });

});



app.post("/contact/update", (req, res) => {
    var Contact_id = req.body.Contact_id;
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


    db.query(`update contact set name=?,email=?,contactno=?,address=?,skill=?,description=?,clients=?,project=?,review=?,reword=? where Contact_id=?`, [name, email, contactno, address, skill, description, clients, project, review, reword,Contact_id], (err, data) => {
        if (err) {
            res.status(400).send({
                'message': 'contact not update Successfully...',

            })
            console.log(err)
        } else {
            // res.send(data);
        //  res.json().then(data);

         db.query(`select *from contact where Contact_id=?`,[Contact_id],(err,result)=>{
            if(err)
            {
                res.send("err")
                console.log(err);
            }
            else{
                res.send(result);
                console.log(Contact_id);

            }
        })
        }
    });

});


app.get("/contact/getcontact", (req, res) => {


    db.query(`select *from contact`, (err, data) => {
        if (err) {
            res.status(400).send({
                'message': 'all contact data not show Successfully...',

            })
            console.log(err)
        } else {
            res.send(data);
           
        }
    });

});


// app.get("/contact/getonecontact", (req, res) => {
//     // console.log(req.params.Contact_id)
//     var Contact_id = req.body.Contact_id;

//     db.query(`select *from contact where Contact_id=?`,[Contact_id],(err,result)=>{
//         if(err)
//         {
//             res.send("err")
//             console.log(err);
//         }
//         else{
//             res.json(result);
//             console.log();
           

//         }
//     })

// });

app.get("/contact/getonecontact/:Contact_id", (req, res) => {
    console.log(req.params.Contact_id)
    // var Contact_id = req.body.Contact_id;

    db.query(`select *from contact where Contact_id=?`,[req.params.Contact_id],(err,result)=>{
        if(err)
        {
            res.send("err")
            console.log(err);
        }
        else{
            res.json(result);
            console.log();
           

        }
    })

});


app.listen(5450, () => {
    console.log("server listening the port no. 5450");
});
// app.listen(5455);