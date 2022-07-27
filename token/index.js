
// // localhost:5454/demo?name=skill&pwd=qode
// const express = require('express')
// const app = express()

// //middleware
// const authorization = (req, res, next) => {
//     const allheader = req.headers;
//     // console.log(allheadre)
//     if (allheader.token == "jaldip") {
//         next();
//     } else {
//         res.send({ "meassage": "unauthorized" });
//     }
// }
// app.get("/demo", authorization, (req, res) => {
//     if (req.query.name == "umang" && req.query.pwd == "moradiya") {
//         res.send({ "login": "success" });
//     } else {
//         res.send({ "login": "fail" });
//     }
// })

// app.listen(5151, () => {
//     console.log("server is run 5454")
// })


// const jwt = require("jsonwebtoken");



// const express = require("express")
// const loginModule = require("./login")
// // const Module1 = require("./Module1/model1")
// // const Module2 = require("./Module2/model2")
// // const Module3 = require("./Module3/model3")

// const app = express();
// app.use(express.json())

// app.use("/login", loginModule);
// // app.use("/module1", Module1);
// // app.use("/module2", Module2);
// // app.use("/module3", Module3);

// app.listen(5252, () => {
//     console.log("listing port 5252");
// })

// app.listen(5455);

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

app.post('/api/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
     
        authData
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  // Mock user

  jwt.sign({}, 'secretkey', { expiresIn: '30000s' }, (err, token) => {
    res.json({
      token
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}



app.get("/contact/getcontact", verifyToken,(req, res) => {


    db.query(`select *from contact`, (err, data) => {
        if (err) {
            res.status(400).send({
                'message': 'all contact data not show Successfully...',

            })
            console.log(err)
        } else {
            jwt.verify(req.token, 'secretkey', (err, authData) => {
                if(err) {
                  res.sendStatus(403);
                } else {
                  res.json({
                 
                    authData
                  });
                }
              });
           
        }
    });

});


app.listen(5000, () => console.log('Server started on port 5000'));