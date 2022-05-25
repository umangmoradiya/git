const express = require("express");
const app = express();

const m2 = express.Router()

m2.get("/",(req,res)=>{
    res.json({"msg":"welcome to get module 2 ...."});
});

m2.post("/",(req,res)=>{
    res.json({"msg":"welcome to post module 2 ..."});
});

module.exports = m2;