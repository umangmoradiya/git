const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}))


const mysql = require("my-sql");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'umang',
    connectionLimit: 10,
});
db.connect(err => {
    if (err) throw err;
    console.log("database connected successfully....");
});

app.post("/form", (req, res) => {
    console.log(req.body);
    var email = req.body.email;
    var phone_no = req.body.phone_no;
    db.query("select * from form where email = ? and phone_no = ?", [email, phone_no], (err, results, fislds) => {
        if (results.length > 0) {
            // console.log(' Account login Successfully.');
            //  res.send(results);
            res.json({msg:' Account login Successfully.'});

        } else {
            res.json({
                'message': 'User is already registerd'
            })
        }
        res.end();
    });
});




app.listen(6066, () => {
    console.log("port no is 6066");
});