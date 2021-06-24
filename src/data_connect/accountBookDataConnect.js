import axios from "axios"

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const accountBookDataConnect = () =>{
    return{
        getAccountBookList: async function(accountBookType,bankType, startDate, endDate, currPage){
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/account-book/list`,{
                params:{
                    accountBookType:accountBookType,
                    bankType:bankType,
                    startDate:startDate,
                    endDate:endDate,
                    currPage:currPage
                },
                withCredentials:true
            })
        },
        postAccountBookList: async function(accountBookList){
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/account-book/list`,accountBookList,{
                withCredentials:true
            })
        },
        getSumOfIncome: async function(accountBookType,bankType, startDate, endDate){
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/account-book/sum/income`,{
                params:{
                    accountBookType:accountBookType,
                    bankType:bankType,
                    startDate:startDate,
                    endDate:endDate
                },
                withCredentials:true
            })
        },
        getSumOfExpenditure: async function(accountBookType,bankType, startDate, endDate){
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/account-book/sum/expenditure`,{
                params:{
                    accountBookType:accountBookType,
                    bankType:bankType,
                    startDate:startDate,
                    endDate:endDate
                },
                withCredentials:true
            })
        },
        deleteAccountBookOne: async function(id){
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/account-book/one`,{
                params:{
                    id:id
                },
                withCredentials:true
            })
        },
        patchExpenditureType: async function(id, expenditureTypeId){

        }
    }
}

export {
    accountBookDataConnect
}