import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const bankTypeDataConnect = () =>{
    return{
        getBankTypeList: async function(){
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/bank-type/list`,{
                withCredentials:true
            })
        }
    }
}

export {
    bankTypeDataConnect
};