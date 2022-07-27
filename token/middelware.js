
const express = require("express");
const tokenObj = require("./token")

const middelware = (req, res, next) => {
    const reqHeaders = req.headers;
    // console.log("module1", tokenObj.token);
    if (reqHeaders.token == tokenObj.token) {
        // res.json({ "meassage": "Welcome to module 1" })
        next();
    } else {
        res.json({ "meassage": "unauthorized user..." })
    }
}
module.exports = middelware