const express = require("express");
const app = express();

const m1 = express.Router()

m1.get("/",(req,res)=>{
    res.json({"msg":"welcome to get module 1..."});
});

m1.post("/",(req,res)=>{
    res.json({"msg":"welcome to post module 2...."})
});

module.exports = m1;