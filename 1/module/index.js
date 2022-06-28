const express = require("express");
const app = express();
const m1 = require("./module1");
const m2 =require("./module2")

app.use("/m1",m1);
app.use("/m2",m2);

app.listen(5050,()=>{
    console.log("port no is 5050");
});