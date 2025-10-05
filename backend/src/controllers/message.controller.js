import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js"
import User from "../models/User.js"

export const getAllContacts=async(req, res)=>{
    try {
        const loggedInUserId = req.user._id;
        // It filteres all the contacts except itself
        const filteredUsers =await User.find({ _id:{$ne:loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Internal Error",error);
        res.status(500).json({
            message:"Internal Server Error",
        })
    }
}

export const getMessageByUserId=async(req,res)=>{
    try {
        const myId = req.user._id;
        const {id:userToChatId}=req.params;
        const messages=await Message.find({
            $or : [
                {senderId : myId, receiverId: userToChatId},
                {senderId : userToChatId, receiverId: myId}
            ]
        });
        res.status(200).json(messages);

    } catch (error) {
        console.log("Internal Error",error);
        res.status(500).json({
            message:"Internal Server Error",
        })
    }
}

export const sendMessage= async(req, res)=>{
    try {
         const {text, image}=req.body;
         const {id: receiverId}=req.params;
         const senderId = req.user._id;
         let imageUrl;
         if(image){
            const uploadedResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadedResponse.secure_url;
         }

         const newMessage= new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
         })

         await newMessage.save();
         //Todo : send message in realtime we'll implement it
         res.status(201).json(newMessage)

    } catch (error) {
        console.log("Internal Error",error);
        res.status(500).json({
            message:"Internal Server Error",
        })
    }
}

export const getChatPartners = async(req,res) =>{
    try {
        const loggedInUserId = req.user._id;
        // find all the messages where loggedinuser is receiver or sender
        console.log(loggedInUserId)
        const messages= await Message.find({
            $or : [{senderId : loggedInUserId},{receiverId: loggedInUserId}]
        });  
        console.log(messages)
        const chatPartnerIds = [...new Set(messages.map((msg)=>
                msg.senderId==loggedInUserId 
                ? msg.receiverId.toString()
                : msg.senderId.toString()
            )
        )];
        console.log(chatPartnerIds)

        const chatPartners= await User.find({_id:{$in: chatPartnerIds}}).select("-password");

        res.status(201).json(chatPartners);

    } catch (error) {
        console.log("Internal Error",error);
         res.status(500).json({
            message:"Internal Server Error",
        })
    }
} 