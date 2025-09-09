// const express=require('express0'); old manner
import express from "express";
import cookieParser from "cookie-parser"; 
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./utils/db.js"; 
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";


dotenv.config({});
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(cookieParser());
const corsOptions={
    // origin:'http://localhost:5173', 
    origin:'https://jobify-jobseeker.netlify.app',
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}
app.use(cors(corsOptions));

const port= process.env.PORT || 3000;

//apis
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job/",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
})