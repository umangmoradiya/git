const db = require("./db");
const bodyparser = require("body-parser");

const Emp = function (form) {
    this.fist_name = form.fist_name;
    this.last_name = form.last_name;
    this.phone_no = form.phone_no;
    this.address = form.address;
    // this.email = form.email
}

Emp.createEmp = (employeereqdata, result) => {
    db.query("INSERT INTO form SET ?", employeereqdata, (err, res) => {
        if (err) {
            console.log("error while inserting data");
            result(err, err);
        } else {
            console.log("form created successfully");
            result(null, res);
        }
    })
}

Emp.getemail=(email,result)=>{
    this. email = req.body.email;
    db.query("SELECT * FROM form WHERE email = ? ",email,(err,res)=>{
        if(err){
            console.log("no user",err);
            result(null,err);
        }else{
            result(null,res);
        }
    })
}

module.exports = Emp;