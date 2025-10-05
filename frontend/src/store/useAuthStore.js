import { create } from "zustand";

export const useAuthStore = create((set,get)=>({
    authUser:{name:"John",_id:23,age:20},
    isLoggedIn:false,
    isLoading:false,

    login:()=>{
        set({isLoggedIn:true, isLoading:true});
    }
}));