
const { createPool } = require("mysql");
const express = require('express');
const app = express();



const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'umang',
    connectionLimit: 10,

});

app.get('/service', (req, res)=> {
    pool.query(`select * from services`, (err, data) => {
        if (err) {
            res.send(err)

        }
        else {
            res.send(data);
        }
    });
});

app.listen(3000, () => {
    console.log("port no is 3000");
});