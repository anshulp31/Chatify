import mongoose from "mongoose";

export const connectDb=async ()=>{
    try {
        const conn=await mongoose.connect("mongodb+srv://anshulporwal_db_user:XHihJ0iECb2DVygk@cluster0.23sqm8t.mongodb.net/chatify");
        console.log("Sucessfully Connected with Mongodb");
    } catch (error) {
        console.log("Mongodb connection failed")
        process.exit(1);
    }
}