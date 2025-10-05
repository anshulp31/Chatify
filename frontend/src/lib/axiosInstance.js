import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:"h"  ? "" :"/api",
    withCredentials:true
})