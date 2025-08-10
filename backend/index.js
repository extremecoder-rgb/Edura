//create express server here ->

import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js'
dotenv.config()

const port = process.env.PORT
const app = express()

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.listen(port, ()=>{
    console.log("Server started")
    connectDB() // called the database connection here
})
