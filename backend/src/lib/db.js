import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDb=async ()=>{
    try {
        const conn=await mongoose.connect(ENV.MONGO_URL);
        console.log("Sucessfully Connected with Mongodb");
    } catch (error) {
        console.log("Mongodb connection failed")
        process.exit(1);
    }
}