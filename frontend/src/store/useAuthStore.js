import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const useAuthStore = create((set,get)=>({
    authUser:null,
    isBusy:false,

    checkAuth:async()=>{
        try {
            set({isBusy:true})
            const res=await axiosInstance.get('/auth/check');
            set({authUser:res.data});
        } catch (error) {
            console.log("Error while checking auth",error);
            set({authUser:null});
        }finally{
            set({isBusy:false});
        }
    },

    signup:async(data)=>{
        try {
            set({isBusy:true});
            const res= await axiosInstance.post('/auth/signup',data);
            set({authUser:res.data});
            toast.success("Account created sucessfully");
        } catch (error) {
            console.log("Error while signing up user",error);
            set({authUser:null});
            toast.error(error.response.data);
        } finally{
            set({isBusy:false});
        }
    },

    login:async(data)=>{
        try {
            set({isBusy:true});
            const res= await axiosInstance.post('/auth/login',data);
            set({authUser:res.data});
        } catch (error) {
            console.log("Error while logging in user",error);
            set({authUser:null});
            toast.error(error.response.data);
        }finally{
            set({isBusy:false})
        }
    },

    logout:async()=>{
        try {
            const res= await axiosInstance.post('/auth/logout');
            set({authUser:res.data});
        } catch (error) {
            console.log("Error while logging out user",error);
            set({authUser:null});
            toast.error(error.response.data);
        }finally{
            set({isBusy:false})
        }
    }
}));