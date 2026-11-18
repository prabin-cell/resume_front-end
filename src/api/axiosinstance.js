import axios from 'axios'

const axiosInstance = axios.create({

    baseURL: 'https://resumebuilder-server-k4xl.onrender.com',
    timeout: 5000


})

export default axiosInstance

//response interceptors: handling global/common errors

axiosInstance.interceptors.response.use((response) => {
    return response

}, (error) => {
    if (error.response) {
        const status = error.response.status

        if (status == 401) {
            console.log("Un-Authorized");

        }
        else if (status == 404) {
            console.log("API not found");

        }
        else if (status == 500) {
            console.log("server error");

        }
        else if (ErrorEvent.request) {
            console.log("No response from server");

        }
        else {
            console.log("Error:" + error.message);

        }
        return Promise.reject(error);

    }
})