
const express = require("express");
const app = express();
const makeid = require("./filename");


const fs = require("fs");
const mime = require("mime");

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));


const mysql = require("mysql");


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'doctor',
    connectionLimit: 15,
});

db.connect((err) => {
    if (err) throw err;
    console.log("database connected successfully....");
});



app.get("/login",(req, res) => {
   
    var email = req.body.email;
    var password =req.body.password;
    if(email === "admin@gmail.com" && password === "123456")
    {
        res.json("login success...")
    }
    else{
        res.json("login fail")
    }
    res.end();

});

app.post("/sector",(req,res)=>{
    var sector_name = req.body.sector_name;
    var details = req.body.details;
    var sector_image = req.body.sector_image;
    
    var matches = sector_image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

    response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.extension(type);
    let fileName = makeid(4) + '.' + extension;

    image = "http://localhost:5450" + "/images/" + fileName;



    db.query(`insert into sector(sector_name,details,sector_image)VALUES(?,?,?)`,[sector_name,details,image],(err,data)=>{
        if(err){
            res.status(400).send({
                'message': 'sector not inserted Successfully...',
               
            });
            console.log(err)
        }else{
            fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
            res.send({
                'message': 'sector inserted Successfully...',
                "msg": data
        });

        }
    })
});


// add doctor
app.post("/adddoctor",(req,res)=>{
    var full_name = req.body.full_name;
    var user_name	 = req.body.user_name	;
    var email = req.body.email;
    var password = req.body.password;
    var contact_no = req.body.contact_no;
    var working_sector = req.body.working_sector;
    var qualification = req.body.qualification;
    var address = req.body.address;
    var fees = req.body.fees;
    var location = req.body.location;
    var rating = req.body.rating;
    var about_doctor = req.body.about_doctor;
    var doctor_lmage = req.body.doctor_lmage;
    var featured = req.body.featured;

    var matches = doctor_lmage.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

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

    image = "http://localhost:5450" + "/images/" + fileName;



    db.query(`insert into doctors(full_name,user_name,email,password,contact_no,working_sector,qualification,address,fees,location,rating,about_doctor,doctor_lmage,featured)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[full_name,user_name,email,password,contact_no,working_sector,qualification,address,fees,location,rating,about_doctor,image,featured],(err,data)=>{
        if(err){
            res.status(400).send({
                'message': 'doctor not inserted Successfully...',
               
            });
            console.log(err)
        }else{
            fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
            res.send({
                'message': 'doctor inserted Successfully...',
                "msg": data
        });

        }
    });
});

// show all doctor
app.get("/showalldoctors",(req,res)=>{
    db.query(`select * from doctors`,(err,data)=>{
        if(err){
            res.json({"msg" :"no data"});
        }
        else{
            res.send(data);
        }
    });
    
});


// show one doctor
app.get("/showdoctor", (req, res) => {

    var user_name = req.body.user_name;

    db.query(`SELECT * FROM doctors WHERE user_name = ?`,
        [user_name], (err, data) => {
            if (err) {

                console.log(err);
                res.status(400).send({
                    'message': 'no data..',

                })
            } else {
                    res.send(data);
            }
        });
});

// update doctor
app.post("/updatedoctor",(req,res)=>{
    var full_name = req.body.full_name;
    var user_name	 = req.body.user_name	;
    var email = req.body.email;
    var password = req.body.password;
    var contact_no = req.body.contact_no;
    var working_sector = req.body.working_sector;
    var qualification = req.body.qualification;
    var address = req.body.address;
    var fees = req.body.fees;
    var location = req.body.location;
    var rating = req.body.rating;
    var about_doctor = req.body.about_doctor;
    var doctor_lmage = req.body.doctor_lmage;
    var featured = req.body.featured;
    var doctor_id = req.body.doctor_id;

    var matches = doctor_lmage.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

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

    image = "http://localhost:5450" + "/images/" + fileName;



    db.query(`update doctors set full_name = ?,user_name = ?,email = ?,password = ?,contact_no= ?,working_sector = ?,qualification = ?,address = ?,fees = ?,location = ?,rating = ?,about_doctor = ?,doctor_lmage = ?,featured = ? where doctor_id = ?`,[full_name,user_name,email,password,contact_no,working_sector,qualification,address,fees,location,rating,about_doctor,image,featured,doctor_id],(err,data)=>{
        if(err){
            res.status(400).send({
                'message': 'doctor not update Successfully...',
               
            });
            console.log(err)
        }else{
            fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
            res.send({
                'message': 'doctor update Successfully...',
                "msg": data
        });

        }
    });
});

app.post("/addstatus",(req,res)=>{
    // var status_id = req.body.status_id;
    var status	 = req.body.status	;
    var email_verification = req.body.email_verification;
    var sms_verification = req.body.sms_verification;
    var FA_status = req.body.FA_status;
    var FA_verification = req.body.FA_verification;
    var featured = req.body.featured


    db.query(`insert into status(status,email_verification,sms_verification,FA_status,FA_verification,featured)VALUES(?,?,?,?,?,?)`,[status,email_verification,sms_verification,FA_status,FA_verification,featured],(err,data)=>{
        if(err){
            res.status(400).send({
                'message': 'status not inserted Successfully...',
               
            });
            console.log(err)
        }else{
            // fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');
            res.send({
                'message': 'status inserted Successfully...',
                "msg": data
        });

        }
    });
});


app.listen(5450, () => {
    console.log("server listening the port no. 5450");
});
