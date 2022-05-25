const express = require("express");
const app = express();
// console.log(app);

app.get("/",(req,res)=>{
    res.json({"message":"Welcome to default get request"});
});
app.get("/product",(req,res)=>{
    res.json({"message":"Welcome to product get request"});
});

app.post("/",(req,res)=>{
    res.json({"message":"Welcome to default post request"});
});
app.post("/product",(req,res)=>{
    res.json({"message":"Welcome to product post request"});
});

app.head("/",(req,res)=>{
    res.json({"message":"Welcome to default head request"});
});
app.head("/product",(req,res)=>{
    res.json({"message":"Welcome to product head request"});
});

app.delete("/",(req,res)=>{
    res.json({"message":"Welcome to default delete request"});
});
app.delete("/product",(req,res)=>{
    res.json({"message":"Welcome to product delete request"});
});

app.listen(5050,()=>{
    console.log("listing port 5050");
});