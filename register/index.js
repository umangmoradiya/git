const express = require("express");
const app = express();
const makeid = require("./filename");

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

app.get("/home",(req, res) => {
    res.sendFile(__dirname+"/home.html");
});

app.get("/ragister.html",(req, res) => {
    res.sendFile(__dirname+"/ragister.html");
});

// insert
app.post("/ragister.html", (req, res) => {
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
                // res.send({ status: true,'message': 'Account Created Successfully.' });
                //  res.json(data);
                console.log("inserted....");
                res.redirect("/yes");
            }
        });

        app.get("/yes",(req, res) => {
            res.sendFile(__dirname+"/yes.html");
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

app.get("/login.html",(req, res) => {
    res.sendFile(__dirname+"/login.html");
});

    // login
    app.post("/login.html", (req, res) => {
        var password  = req.body.password;
        var email = req.body.email;
        var query = "email =" + email + "      "+ " password =" + password;
        db.query(`select * from register where email = ? and password = ? `, [email,password], (err, results) => {
            console.log(query)
            if (results.length > 0) {
                //   res.send(results);
                // res.json({"msg":"login Successfully..."});
                console.log("welcome....")
                res.redirect("/welcome");
            
           
                
            } else {
               
                res.json({"msg":"not user..."});
            }
            res.end();
        });
    });
    app.get("/welcome",(req, res) => {
        res.sendFile(__dirname+"/welcome.html");
    });


    app.get("/services.html",(req, res) => {
        res.sendFile(__dirname+"/services.html");
    });
    // services
    app.post("/services.html", (req, res) => {
    var services_name = req.body.services_name;
    var working = req.body.working;
    var imageurl = req.body.imageurl;
    var price = req.body.price;
    var teg = req.body.teg;
    var storeid = req.body.storeid;
 
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
   
    db.query(`INSERT INTO services(services_name,working,price,imageurl,teg,storeid) VALUES(?,?,?,?,?,?)`,
        [services_name,working,price,image,teg,storeid], (err, data, fields) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                // res.send({ status: true,'message': 'Account Created Successfully.' });
                //  res.json(data);
                console.log(" services inserted....");
                res.redirect("/add");
            }
        });
    });

    app.get("/add",(req, res) => {
        res.sendFile(__dirname+"/add.html");
    });

 
    //update services
app.post("/services/update", (req, res) => {
  var services_name = req.body.services_name;
    var working = req.body.working;
    var imageurl = req.body.imageurl;
    var price = req.body.price;
    var teg = req.body.teg;
    var storeid = req.body.storeid;
    var salon_id = req.body.salon_id;
 
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
   
    db.query(`UPDATE services SET services_name=?,working=?,price=?,imageurl=?,teg=?,storeid=? where salon_id=?`,
        [ services_name,working,price,image,teg,salon_id,storeid], (err, data, fields) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                // res.send({ status: true,'message': 'Account Created Successfully.' });
                 res.json(data);
                console.log(" services updated....");
            }
        });
    }); 

// delete services
app.post("/services/delete",(req,res)=>{
    var salon_id = req.body.salon_id;
       
    db.query(`DELETE FROM services WHERE salon_id = ?`,
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
 
    
    app.get("/barber.html",(req, res) => {
        res.sendFile(__dirname+"/barber.html");
    });
    // barber
   app.post("/barber.html", (req, res) => {
    var barber_name = req.body.barber_name;
    var barber_details = req.body.barber_details;
    var barber_image = req.body.barber_image;
    var storeid = req.body.storeid;
 
    var matches = barber_image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

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
   
    db.query(`INSERT INTO barber(barber_name,barber_details,barber_image,storeid) VALUES(?,?,?,?)`,
        [barber_name,barber_details,image,storeid], (err, data, fields) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                // res.send({ status: true,'message': 'Account Created Successfully.' });
                //  res.json(data);
                console.log(" barber inserted....");
                // document.write(data);
                res.redirect("/add2");
            }
        });
    });

    app.get("/add2",(req, res) => {
        res.sendFile(__dirname+"/add2.html");
    });
  
    //update barber
app.post("/barber/update", (req, res) => {
    var barber_name = req.body.barber_name;
    var barber_details = req.body.barber_details;
    var barber_image = req.body.barber_image;
    var storeid = req.body.storeid;
    var barber_id = req.body.barber_id;
 
    var matches = barber_image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

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
   
    db.query(`UPDATE barber SET barber_name=?,barber_details=?,barber_image=?,storeid=? where barber_id=?`,
        [ barber_name,barber_details,image,storeid,barber_id], (err, data, fields) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                // res.send({ status: true,'message': 'Account Created Successfully.' });
                 res.json(data);
                console.log(" services updated....");
            }
        });
    });    
    
// delete barber
app.post("/barber/delete",(req,res)=>{
    var barber_id = req.body.barber_id;
       
    db.query(`DELETE FROM barber WHERE barber_id = ?`,
        [barber_id], (err,data, fields) => {
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


    // app.get("/order.html",(req, res) => {
    //     res.sendFile(__dirname+"/order.html");
    // });
// order
   app.post("/order", (req, res) => {
    // var day = req.body.day;
    var date = req.body.date;
    var slot = req.body.slot;
    var store_id = req.body.store_id;
    var user_id =req.body.user_id;
    var user_name  = req.body.user_name;
    var services_name = req.body.services_name;
    var status = req.body.status;
 
    db.query(`INSERT INTO orders(user_name,date,slot,user_id,store_id,service_name,status) VALUES(?,?,?,?,?,?,?)`,
    [user_name,date,slot,user_id,store_id,services_name,status],(err, data) => {
            
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                // fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                // res.send({ status: true,'message': 'Account Created Successfully.' });
                 res.json(data);
                console.log(" order inserted...."); 
            }
        });
    });
// update status
    app.post("/order/status", (req, res) => {
        var status = req.body.status;
        var store_id = req.body.store_id;
      
     
        db.query(`UPDATE orders SET status=? where store_id=?`,
            [status,store_id], (err, data, fields) => {
                if (err) {
                    res.send(err);
                    console.log(err);
                } else {
                    // fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                    // res.send({ status: true,'message': 'Account Created Successfully.' });
                     res.json(data);
                    console.log(" status updated....");
                }
            });
        }); 
// get order
 app.post("/order/getorder", (req, res) => {
  
        var store_id = req.body.store_id;
      
     
        db.query(`SELECT * FROM orders WHERE store_id = 4`,
            [store_id], (err, data, fields) => {
                if (err) {
                    res.send(err);
                    console.log(err);
                } else {
                    // fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                    // res.send({ status: true,'message': 'Account Created Successfully.' });
                     res.json(data);
                    console.log(" status updated....");
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