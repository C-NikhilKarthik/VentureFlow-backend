const express=require('express')
require('dotenv').config()
const connectDb=require('./config/dbConn')
const app=express()

connectDb()

app.listen(5000,()=>{
    console.log(process.env.NODE_ENV)
    console.log("listening on port 5000");
})