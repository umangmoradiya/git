const express = require("express");
const app = express();
const makeid = require("./register/filename");

const fs = require("fs");
const mime = require("mime");

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));

const mysql = require("mysql");
// const path = require("path");

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

// insert
app.post("/insert", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var is_owner = req.body.is_owner;
    var address = req.body.address;
    var aboutus = req.body.aboutus;
    var phone =req.body.phone;
    var imageurl = req.body.imageurl;
    var lat_long = req.body.lat_long;
  
    var matches = imageurl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

    response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.getExtension(type);
    let fileName = makeid(4) + '.' + extension;
    //   let fileName = 'img5' + '.' + extension;
    image = "http://localhost:7055" + "/images/" + fileName;
   
    db.query(`INSERT INTO register(name,email,password,is_owner,address,aboutus,phone,imageurl,lat_long) VALUES(?,?,?,?,?,?,?,?,?)`,
        [name, email, password, is_owner, address, aboutus, phone, image, lat_long], (err, data, fields) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                res.send({ status: true,'message': 'Account Created Successfully.' });
                //  res.json(data);
                console.log("inserted....");
            }
        });
//delete 
app.delete("/delete",(req,res)=>{
    var salon_id = req.body.salon_id;
       
    db.query(`DELETE FROM register WHERE salon_id = ?`,
        [salon_id], (err,data, fields) => {
            if (err) {
                // res.send(err);
                console.log(err);
            } else {
                
                res.send(' delete data...' );
                //  res.json(data);
                console.log(" 'delete data.......");
            }
        });
    });     

});

    // login
    app.post("/insert/login", (req, res) => {
        var password  = req.body.password;
        var email = req.body.email;
        var query = "email =" + email + "      "+ " password =" + password;
        db.query(`select * from register where email = ? and password = ? `, [email,password], (err, results) => {
            console.log(query)
            if (results.length > 0) {
                //   res.send(results);
                res.json({"msg":"login Successfully..."});
           
                
            } else {
               
                res.json({"msg":"not user..."});
            }
            res.end();
        });
    });
    


// Hair Cut
app.post("/cut", (req, res) => {
    var cuts = req.body.cuts;
    var about = req.body.about;
    var imageurl = req.body.imageurl;
    var price = req.body.price;
 
    var matches = imageurl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

    response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.getExtension(type);
    let fileName = makeid(4) + '.' + extension;
    //   let fileName = 'img5' + '.' + extension;
    image = "http://localhost:7055" + "/images/" + fileName;
   
    db.query(`INSERT INTO HairCut(cuts,about,imageurl,price) VALUES(?,?,?,?)`,
        [cuts,about,image,price], (err, data, fields) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                // res.send({ status: true,'message': 'Account Created Successfully.' });
                 res.json(data);
                console.log("inserted....");
            }
        });
    });
//delete 
app.delete("/cuts/delete",(req,res)=>{
    var salon_id = req.body.salon_id;
       
    db.query(`DELETE FROM cuts WHERE salon_id = ?`,
        [salon_id], (err,data, fields) => {
            if (err) {
                // res.send(err);
                console.log(err);
            } else {
                
                res.send(' delete data...' );
                //  res.json(data);
                console.log(" 'delete data.......");
            }
        });
    });    

    // shaving
    app.post("/shaving", (req, res) => {
        var shaving = req.body.shaving;
        var about = req.body.about;
        var imageurl = req.body.imageurl;
        var price = req.body.price;
     
        var matches = imageurl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    
        response = {};
    
        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }
        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        let extension = mime.getExtension(type);
        let fileName = makeid(4) + '.' + extension;
        //   let fileName = 'img5' + '.' + extension;
        image = "http://localhost:7055" + "/images/" + fileName;
       
        db.query(`INSERT INTO shaving(shaving,about,imageurl,price) VALUES(?,?,?,?)`,
            [shaving,about,image,price], (err, data, fields) => {
                if (err) {
                    res.send(err);
                    console.log(err);
                } else {
                    fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                    // res.send({ status: true,'message': 'Account Created Successfully.' });
                     res.json(data);
                    console.log("inserted....");
                }
            });
        });
// delete
app.delete("/shaving/delete",(req,res)=>{
    var salon_id = req.body.salon_id;
       
    db.query(`DELETE FROM shaving WHERE salon_id = ?`,
        [salon_id], (err,data, fields) => {
            if (err) {
                // res.send(err);
                console.log(err);
            } else {
                
                res.send(' delete data...' );
                //  res.json(data);
                console.log(" 'delete data.......");
            }
        });
    });       
    
    
// styling
    app.post("/styling", (req, res) => {
        var styling = req.body.styling;
        var about = req.body.about;
        var imageurl = req.body.imageurl;
        var price = req.body.price;
     
        var matches = imageurl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    
        response = {};
    
        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }
        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        let extension = mime.getExtension(type);
        let fileName = makeid(4) + '.' + extension;
        //   let fileName = 'img5' + '.' + extension;
        image = "http://localhost:7055" + "/images/" + fileName;
       
        db.query(`INSERT INTO styling(styling,about,imageurl,price) VALUES(?,?,?,?)`,
            [styling,about,image,price], (err, data, fields) => {
                if (err) {
                    res.send(err);
                    console.log(err);
                } else {
                    fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                    // res.send({ status: true,'message': 'Account Created Successfully.' });
                     res.json(data);
                    console.log("inserted....");
                }
            });
        });
// delete
app.delete("/styling/delete",(req,res)=>{
    var salon_id = req.body.salon_id;
       
    db.query(`DELETE FROM styling WHERE salon_id = ?`,
        [salon_id], (err,data, fields) => {
            if (err) {
                // res.send(err);
                console.log(err);
            } else {
                
                res.send(' delete data...' );
                //  res.json(data);
                console.log(" 'delete data.......");
            }
        });
    });       
    
// Triming
app.post("/Triming", (req, res) => {
    var Triming = req.body.Triming;
    var about = req.body.about;
    var imageurl = req.body.imageurl;
    var price = req.body.price;
 
    var matches = imageurl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

    response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.getExtension(type);
    let fileName = makeid(4) + '.' + extension;
    //   let fileName = 'img5' + '.' + extension;
    image = "http://localhost:7055" + "/images/" + fileName;
   
    db.query(`INSERT INTO Triming(Triming,about,imageurl,price) VALUES(?,?,?,?)`,
        [Triming,about,image,price], (err, data, fields) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                // res.send({ status: true,'message': 'Account Created Successfully.' });
                 res.json(data);
                console.log("inserted....");
            }
        });
    });
// updateTriming
app.put("/Triming/update", (req, res) => {
    var salon_id = req.body.salon_id;
    var Triming = req.body.Triming;
    var about = req.body.about;
    var imageurl = req.body.imageurl;
    var price = req.body.price;
 
    var matches = imageurl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

    response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.getExtension(type);
    let fileName = makeid(4) + '.' + extension;
    //   let fileName = 'img5' + '.' + extension;
    image = "http://localhost:7055" + "/images/" + fileName;
   
    db.query(`UPDATE Triming SET Triming=?, about=?, imageurl=?, price=? where salon_id=?`,
        [salon_id,Triming,about,image,price], (err, data, fields) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                // res.send({ status: true,'message': 'Account Created Successfully.' });
                 res.json(data);
                console.log("updated....");
            }
        });
    });    
// delete
app.delete("/Triming/delete",(req,res)=>{
    var salon_id = req.body.salon_id;
       
    db.query(`DELETE FROM triming WHERE salon_id = ?`,
        [salon_id], (err,data, fields) => {
            if (err) {
                // res.send(err);
                console.log(err);
            } else {
                
                res.send(' delete data...' );
                //  res.json(data);
                console.log(" 'delete data.......");
            }
        });
    });



app.get('/images/:name', (req, res) => {
    var name = req.params.name;
            
    res.sendFile(__dirname + '/images/' + name)
});
// app.use(express.static('public'));
// app.use('/images', express.static('images'));
// app.get('/images', express.static(path.join(__dirname, "./images")))

app.listen(7055, () => {
    console.log('port no is 7055');
});


