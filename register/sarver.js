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

// app.get("/home",(req, res) => {
//     res.sendFile(__dirname+"/home.html");
// });

// app.get("/ragister.html",(req, res) => {
//     res.sendFile(__dirname+"/ragister.html");
// });

// insert
app.post("/register", (req, res) => {
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
                res.send({
                    'message': 'register inserted Successfully...',
                    "msg":data

                });
                console.log("inserted....");
                // res.redirect("/yes");
            }
        });
    });        

        // app.get("/yes",(req, res) => {
        //     res.sendFile(__dirname+"/yes.html");
        // });
        
//delete 
app.post("/register/delete",(req,res)=>{ 
    var store_id = req.body.store_id;
       
    db.query(`DELETE FROM register WHERE store_id = ?`,
        [store_id], (err,data, fields) => {
            if (err) {
                // res.send(err);
                console.log(err);
            } else {
                
                res.send({
                    'message': 'register deleted Successfully...',
                  

                });
                //  res.json(data);
                console.log(" 'delete data.......");
            }
        });
    });     



// app.get("/login.html",(req, res) => {
//     res.sendFile(__dirname+"/login.html");
// });

    // login
    app.post("/login", (req, res) => {
        var password  = req.body.password;
        var email = req.body.email;
        var query = "email =" + email + "      "+ " password =" + password;
        db.query(`select * from register where email = ? and password = ? `, [email,password], (err, results) => {
            console.log(query)
            if (results.length > 0) {
                //   res.send(results);
                res.send({
                    'message': 'login Successfully...',
                    "msg":results

                });
                console.log("welcome....")
                // res.redirect("/welcome");
            
           
                
            } else {
               
                res.json({"msg":"not user..."});
            }
            res.end();
        });
    });
    // app.get("/welcome",(req, res) => {
    //     res.sendFile(__dirname+"/welcome.html");
    // });


    // app.get("/services.html",(req, res) => {
    //     res.sendFile(__dirname+"/services.html");
    // });
    // // services
    app.post("/services", (req, res) => {
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
                res.send({
                    'message': 'services inserted Successfully...',
                    "msg":data

                });
                console.log(" services inserted....");
                // res.redirect("/add");
            }
        });
    });

    // app.get("/add",(req, res) => {
    //     res.sendFile(__dirname+"/add.html");
    // });

 
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
                res.send({
                    'message': 'services updated Successfully...',
                    "msg":data

                });
                console.log(" services updated....");
            }
        });
    }); 

// delete services
app.post("/services/delete",(req,res)=>{
    var services_id  = req.body.services_id ;
       
    db.query(`DELETE FROM services WHERE services_id  = ?`,
        [services_id ], (err,data, fields) => {
            if (err) {
                // res.send(err);
                console.log(err);
            } else {
                res.send({
                    'message': 'services deleted Successfully...',
                    

                });
               
                //  res.json(data);
                console.log(" 'delete data.......");
            }
        });
    });
 
    
    // app.get("/barber.html",(req, res) => {
    //     res.sendFile(__dirname+"/barber.html");
    // });
    // barber
   app.post("/barber", (req, res) => {
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
                
                console.log(" barber inserted....");
                res.send({
                    'message': 'barber inserted Successfully...',
                    "msg":data

                });
            }
        });
    });

    // app.get("/add2",(req, res) => {
    //     res.sendFile(__dirname+"/add2.html");
    // });
  
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
   
    db.query(`UPDATE barber SET barber_name=?,barber_details=?,barber_image=?,barber_id=? where storeid=?`,
        [ barber_name,barber_details,image,barber_id,storeid], (err, data, fields) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                // res.send({ status: true,'message': 'Account Created Successfully.' });
              
                console.log(" services updated....");

                res.send({
                    'message': 'barber update  Successfully...',
                    "msg":data

                });
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
                
                res.send({
                    'message': 'barber delete Successfully...',
                   

                });
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
                
                console.log(" order inserted...."); 
                res.send({
                    'message': 'order inserted Successfully...',
                    "msg":data

                });
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
                    
                    console.log(" status updated....");
                    res.send({
                        'message': 'status updated Successfully...',
                        "msg":data
    
                    });
                    
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
                     
                    console.log(" all orders....");
                    res.send({
                        'message': 'all orders...',
                        "msg":data
    
                    });
                }
            });
        }); 
// image
     app.post("/image", (req, res) => {
    var image_name = req.body.image_name;
    var imageurl = req.body.imageurl;
   
    var store_id = req.body.store_id;
 
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
   
    db.query(`INSERT INTO image(image_name,imageurl,store_id) VALUES(?,?,?)`,
        [image_name,image,store_id], (err, data, fields) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                // res.send({ status: true,'message': 'Account Created Successfully.' });
                
                console.log(" image inserted....");
                res.send({
                    'message': 'image inserted Successfully...',
                    "msg":data

                });
            }
        });
    });    
// update image
    app.post("/image/update", (req, res) => {
        var image_name = req.body.image_name;
    var imageurl = req.body.imageurl;
   
    var image_id = req.body.image_id;
     
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
       
        db.query(`UPDATE image SET image_name=?,imageurl=? where image_id=?`,
            [ image_name,image,image_id], (err, data, fields) => {
                if (err) {
                    res.send(err);
                    console.log(err);
                } else {
                    fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                    // res.send({ status: true,'message': 'Account Created Successfully.' });
                     
                    console.log(" image updated....");
                    res.send({
                        'message': 'image update Successfully...',
                        "msg":data
    
                    });
                }
            });
        }); 

// delete image 
   app.post("/image/delete",(req,res)=>{
    var image_id = req.body.image_id;
       
    db.query(`DELETE FROM image WHERE image_id = ?`,
        [image_id], (err,data, fields) => {
            if (err) {
                // res.send(err);
                console.log(err);
            } else {
                
                res.send({
                    'message': 'image delete Successfully...',
                });
                
                console.log(" 'delete data.......");
            }
        });
    });       
//review
    app.post("/review", (req, res) => {
    var user_name = req.body.user_name;
    var user_id = req.body.user_id;
    var review = req.body.review;
    var rate = req.body.rate;
    var store_id = req.body.store_id;
    var user_image = req.body.user_image;

 
    var matches = user_image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

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
   
    db.query(`INSERT INTO review(user_name,user_id,review,rate,store_id,user_image) VALUES(?,?,?,?,?,?)`,
        [user_name,user_id,review,rate,store_id,image], (err, data, fields) => {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
                // res.send({ status: true,'message': 'Account Created Successfully.' });
                //  res.json(data);
                console.log(" review inserted....");
                res.send({
                    'message': 'review inserted Successfully...',
                    "msg":data

                });
              
            }
        });
    }); 
//   delete review  
    app.post("/review/delete",(req,res)=>{
    var review_id = req.body.review_id;
       
    db.query(`DELETE FROM review WHERE review_id = ?`,
        [review_id], (err,data, fields) => {
            if (err) {
                // res.send(err);
                console.log(err);
            } else {
                
                res.send({
                    'message': 'review delete Successfully...',
                    

                });
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
    
    app.listen(6677, () => {
        console.log('port no is 6677');
    });