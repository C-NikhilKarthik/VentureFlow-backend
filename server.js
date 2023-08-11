const express=require('express')
require('dotenv').config()
var cors = require("cors");
const connectDb=require('./config/dbConn')
const app=express()
app.use(cors());
var router = require("./routes/index");

connectDb()

app.use('/', router);

app.listen(5000,()=>{
    console.log(process.env.NODE_ENV)
    console.log("listening on port 5000");
})