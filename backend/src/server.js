import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import {connectDb} from "./lib/db.js"
import {ENV} from "./lib/env.js"

dotenv.config();


const app=express();

//middleware to acess the users payload
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);

const PORT=ENV.PORT;

connectDb().then(()=>{
   app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}` );
    })
}).catch((error)=>{
    console.log("Error connecting to database",error);
});
