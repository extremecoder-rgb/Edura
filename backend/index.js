//create express server here ->

import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js'
import cookieParser from 'cookie-parser'
import authRouter from './route/authRoute.js'
import cors from "cors"
import userRouter from "./route/userRoute.js"
import courseRouter from "./route/courseRoute.js"

dotenv.config()

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/uploads', express.static('uploads'))

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/course",courseRouter)

app.get("/",(req,res)=>{
    res.send("Hello I am Backend server, Nice to meet you Developer")
})


app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.listen(port, ()=>{
    console.log("Server started")
    connectDB() 
})
