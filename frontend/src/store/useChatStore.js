import { create } from "zustand";
import {axiosInstance} from "../lib/axiosInstance"

export const useChatStore = create((set,get)=>({
    isBusy:false,
    allContacts:[],
    messages:[],
    chats:[],
    activeTab:"chats",
    selectedUser:null,
    isSoundEnabled:!!localStorage.getItem("isSoundEnabled"),

    toggleSound:()=>{
        localStorage.setItem("isSoundEnabled",!get().isSoundEnabled);
        set({isSoundEnabled:get().isSoundEnabled})
    },

    setActiveTab:(tab)=>set({activeTab:tab}),
    setSelectedUser:(user)=>set({selectedUser:user}),

    getAllContacts:async()=>{
        try {
            set({isBusy:true});
            const res=await axiosInstance.get('/message/contacts');
            set({allContacts:res.data});
        } catch (error) {
            toast.error(error.response.data);
        }finally{
            set({isBusy:false});
        }
    },

    getMyChatPartners:async()=>{
         try {
            set({isBusy:true});
            const res=await axiosInstance.get('/message/chats');
            set({chats:res.data});
        } catch (error) {
            toast.error(error.response.data);
        }finally{
            set({isBusy:false});
        }
    }

}))