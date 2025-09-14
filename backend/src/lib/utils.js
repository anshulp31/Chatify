import jwt from "jsonwebtoken";

const JWT_SECRET=process.env.JWT_SECRET || "chatify@6068"
export const generateToken=(userId,res)=>{
    const token= jwt.sign({userId},JWT_SECRET,{
        expiresIn:"7d"
    })
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true, //prevent  XSS attacks
        sameSite:"strict" ,// prevents CSRf Attacks
        secure:false
    })

    return token;
}