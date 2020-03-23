//EXPRESS CONFIGURATION
const express = require("express")
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken")
const app = express();
let route = require("../routes/Routing");;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const port = process.env.PORT || 3000;

module.exports = {
    app,
    bodyParser,
    express,
    jwt,
    port,
    route,
}