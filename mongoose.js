var mongoose = require ("mongoose");
var EmpSchema = new mongoose.Schema({_id:Number,eno:Number,ename:String,esal:String,eaddr:String});
var EmpModel = mongoose.model("employ",EmpSchema);

mongoose.connect("mongodb://localhost/Skillqode");
// var newEmp = new EmpModel({_id:11,eno:408,ename:"rakesh",esal:5100,eaddr:"boroda"})
var newEmp = new EmpModel({_id:2,eno:08,ename:"jaldip",esal:5100,eaddr:"boroda"})
// var newEmp = new EmpModel({_id:3,eno:108,ename:"Dhruvik",esal:5100,eaddr:"boroda"})


newEmp.save((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Document Inserted...");
    }
    mongoose.disconnect();
})