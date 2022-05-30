const express = require("express");
const app = express();

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));

const mysql = require("mysql");

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

app.post("/",()=>{
const register = async (req, res) => {
   const validator=(req.body, rule.registerRule, (err, status) => {
        if (!status) {
            res.status(412) 
                .send({
                    message: 'Validation failed',
                    data: err
                });
        } else {
            var name = req.body.name;
            var email = req.body.email;
            var password = req.body.password;
            var is_owner = parseInt(req.body.is_owner);
            var address = req.body.address;
            var aboutus = req.body.aboutus;
            var phone = parseInt(req.body.phone);
            var imageurl = req.body.imageurl;
            var lat_long = req.body.lat_long;
            var selectuser = [];
            var users = [];

            var checkuser = `SELECT * FROM register`;
            con.dataBaseConnection.query(checkuser, (err, response) => {
                if (err) throw err;

                users = JSON.parse(JSON.stringify(response));
                users.forEach(function (user) {
                    if (email === user.email) {
                        selectuser.push(user);
                    }
                });
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
                let fileName = makeid(5) + '.' + extension;
                image = URL.baseURL + "/images/" + fileName;
                if (selectuser.length === 0) {
                    try {
                        var sql = `INSERT INTO register (name,email,password,is_owner,address,aboutus,phone,imageurl,lat_long) VALUES(?,?,?,?,?,?,?,?,?)`
                        con.dataBaseConnection.query(sql, [name, email, password, is_owner, address, aboutus, phone, image, lat_long], (err, ress) => {
                            if (err) {
                                var response = {
                                    errmsg: err.message,
                                }
                                var data = JSON.stringify(response)
                                console.log(data)
                                res.send(err)

                            } else {
                                fs.writeFileSync('./images/' + fileName, imageBuffer, 'utf8');

                                console.log(image);
                                var response = {

                                    name: name,
                                    email: email,
                                    is_owner: is_owner,
                                    address: address,
                                    aboutus: aboutus,
                                    phone: phone,
                                    imageurl: image,
                                    lat_long: lat_long,
                                }
                                delete response.password;
                                var userdata = JSON.stringify(response);
                                console.log(userdata)
                                res.send({
                                    'message': 'Account Created Successfully.',

                                });
                            }
                        })
                    } catch (e) {
                        throw e;
                    }
                } else {    
                    res.status(400).send({
                        'message': 'User is already registerd'
                    })
                }
            });
        }
    });
    
}

});

app.listen(5050,()=>{
    console.log("port no is 5050");
});



