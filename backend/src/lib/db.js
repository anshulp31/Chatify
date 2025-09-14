import mongoose from "mongoose";

export const connectDb=async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log("Sucessfully Connected with Mongodb");
    } catch (error) {
        console.log("Mongodb connection failed")
        process.exit(1);
    }
}