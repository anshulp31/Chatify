import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import {ENV} from "../lib/env.js"
import cloudinary from "../lib/cloudinary.js";
export const signup=async(req,res)=>{
     const {fullName, email, password}=req.body;
     try {
        if(!fullName || !email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        if(password.length<6){
            return res.status(400).json({
                message:"Password must be at least 6 characters"
            })
        }
        const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({
                message:"Invalid email format"
            })
        }

        const user=await User.findOne({email});

        if(user){
            return res.status(400).json({
                message:"Email already exists"
            })
        }

        //bcrypt the password

        const salt = await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(password, salt);

        const newUser=new User({
            fullName,email,password:hashedPass
        })

        if(newUser){
            const savedUser=await newUser.save();
            generateToken(savedUser,res);
            try {
                await sendWelcomeEmail(savedUser.email,savedUser.fullName,ENV.CLIENT_URL);
            } catch (error) {
                throw new Error("Getting error while sending the mail",error);
            }
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePicture:newUser.profilePicture
            })
        }else{
            res.status(400).json({
                message:"Invalid user data"
            })
        }


     } catch (error) {
        console.log("Error in signup controller",error);
        res.status(500).json({
            message:"Internal server error"
        })
     }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        const user=await User.findOne({email});
        //never tell the user which field is incorrect
        if(!user){
            return res.status(400).json({
                message:"Invalid Credentials"
            })
        }
        const isPassCorrect = await bcrypt.compare(password,user.password)
        if(isPassCorrect){
            generateToken(user._id, res);
            res.status(200).json({
                message:"Login successful",
                _id:user._id,
                fullName:user.fullName,
                profilePicture:user.profilePicture,
                email:user.email
            })
        }
        
    }catch(error){
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const logout=async(_, res)=>{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({
        message:"Logout successful"
    })
}

export const updateProfile=async(req,res)=>{
    try {
        const {profilePicture}=req.body;
        if(!profilePicture){
            return res.status(400).json({
                message:"Profile pic is requires"
            })
        }
        const userId=req.user._id;
        const uploadResponse=await cloudinary.uploader.upload(profilePicture);
        const updatedUser=await User.findByIdAndUpdate(userId,{ profilePicture:uploadResponse.secure_url},{new:true})

        res.status(200).json({
            message:"Profilepic updated successfully",
            updatedUser
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        })
    }
}