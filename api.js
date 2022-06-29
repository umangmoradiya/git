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
app.listen(7070, () => {
    console.log("post no is 7070");
})