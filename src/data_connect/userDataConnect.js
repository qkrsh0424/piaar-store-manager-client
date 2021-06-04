import axios from "axios"

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const userDataConnect = () =>{
    return{
        loginCheck: async function(){
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/user/login-check`,{
                withCredentials:true
            })
        },
        postLogin: async function(loginData){
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/login`, loginData, {
                withCredentials:true
            })
        },
        postLogout: async function(){
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/logout`, {}, {
                withCredentials:true
            })
        }
    }
}

export{
    userDataConnect
}