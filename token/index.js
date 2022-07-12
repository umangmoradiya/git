
// localhost:5454/demo?name=skill&pwd=qode
const express = require('express')
const app = express()

//middleware
const authorization = (req, res, next) => {
    const allheader = req.headers;
    // console.log(allheadre)
    if (allheader.token == "jaldip") {
        next();
    } else {
        res.send({ "meassage": "unauthorized" });
    }
}
app.get("/demo", authorization, (req, res) => {
    if (req.query.name == "umang" && req.query.pwd == "moradiya") {
        res.send({ "login": "success" });
    } else {
        res.send({ "login": "fail" });
    }
})

app.listen(5151, () => {
    console.log("server is run 5454")
})