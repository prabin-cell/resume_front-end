import apiServiece from "../api/apiService";

//add resume api

export const addResumeAPI=async(reqBody)=>{
    return await apiServiece("POST",`/resumes`,reqBody)
    
}

//get single resume
export const getResumeAPI=async(resumeId)=>{
    return await apiServiece("GET",`/resumes/${resumeId}`,{})
}
//download API
export const downloadResumeAPI = async (reqBody) => {
    return await apiServiece("POST", `/history`, reqBody)
}

// get history
export const getHistoryAPI = async () => {
  return await apiServiece("GET",`/history`, {})
}

// delete history
export const dltHistoryAPI = async (id) => {
  return await apiServiece("DELETE",`/history/${id}`, {})
}

// upadate Resume
export const UpdateResumeAPI = async (id,reqBody) => {
  return await apiServiece("PUT",`/resumes/${id}`,reqBody)
}