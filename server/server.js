const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
}))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/ocpmsDB")
.then(function(){
    console.log("Successfully connected to mongoDB")
})
.catch(function(err){
    console.log(err);
})

app.listen(port, function() {
    console.log("Server started on port 5000");
  });