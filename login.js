const express = require("express");
const app = express();

app.get("/login", (req, res) => {
    var queryObject = req.query
    console.log(queryObject);
    if (queryObject.name == "umang" && queryObject.pwd == "moradiya") {
        res.send({ "login": "success" });
    } else {
        res.send({ "login": "fail" });
    }
})

app.listen(6666,()=>{
    console.log("port no is 6666");
});





