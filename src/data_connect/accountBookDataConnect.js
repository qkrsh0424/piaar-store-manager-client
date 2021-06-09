import axios from "axios"

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const accountBookDataConnect = () =>{
    return{
        getAccountBookList: async function(accountBookType,bankType){
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/account-book/list`,{
                params:{
                    accountBookType:accountBookType,
                    bankType:bankType
                },
                withCredentials:true
            })
        },
        postAccountBookList: async function(accountBookList){
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/account-book/list`,accountBookList,{
                withCredentials:true
            })
        }
    }
}

export {
    accountBookDataConnect
}