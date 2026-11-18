import axiosInstance from "./axiosinstance";

const apiServiece=async(httpmethod,url,reqBody)=>{

    const reqConfig={

        method:httpmethod,
        url,
        data:reqBody
    }
    try{
    const res=await axiosInstance(reqConfig)
    return res

    }catch(err){
        return err
    }}

    export default apiServiece