
const module1 = require("./module");

exports.emplist = (req, res) => {
    console.log("here all emplist..");
}
exports.createnewEmp = (req, res) => {
    console.log("req data",req.body);
    const employeereqdata = new module1(req.body)
    if (req.body.contructor === Object && Object.keys(res.body).length === 0) {
        res.send(400).send({ success: false, msg: "please fill all fields" });
    } else {
        // return;
        module1.createEmp(employeereqdata, (err, Emp) => {
            if (err) {
                res.send(err);
                res.json({ status: true, msg: "somthing went wrong" });
            } else {
                res.send({ status: true, msg: "Added" });
            }
        })
    }
}

exports.getemail=(req,res)=>{
    console.log("get email");
    module1.getemail(req.params.email,(err,email)=>{
        if(err)
        res.send(err);
        console.log("email",email);
        res.send(email);

        
    })

}

