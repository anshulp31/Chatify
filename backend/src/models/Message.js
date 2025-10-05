import mongoose, { Types } from "mongoose";

const messageSchema=new mongoose.Schema({
        senderId:{
            type:Types.ObjectId,
            required:true,
        },
        receiverId:{
            type:Types.ObjectId,
            required:true,
        },
        text:{
            type:String,
        },
        image:{
            type:String
        }

    },
    {timestamps:true}
)

const Message=mongoose.model("Message",messageSchema);

export default Message;