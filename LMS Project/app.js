import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {config} from "dotenv"
config();
import morgan from "morgan";
import userRoutes from "./routes/user.Routes.js"

const app=express(); 

app.use(express.json())
app.use(cors({
    origin:[process.env.FROTEND_URL],
    credentials:true
}))
app.use(cookieParser())
app.use(morgan("dev"))
app.use("/ping",function(req,res){
    res.send("Pong")
})

app.use("/api/v1/user",userRoutes)

app.all("*",(req,res)=>{
    res.status(400).send("OPPS!! 404 Page not found")
})

export default app;