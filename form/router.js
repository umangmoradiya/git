const express =require("express");
const router = express.Router();

const controller =require("./controller");

// router.get("/",controller.registerlist); 

router.post("/",controller.createnewEmp);
router.post("/login",controller.getemail);

module.exports=router;