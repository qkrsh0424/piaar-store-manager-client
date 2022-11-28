import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productReceiveDataConnect = () => {
    return {
        createBatch: async function(data){
            return await axios.post(`${API_SERVER_ADDRESS}/api/v2/product-receive/batch`, data,{
                withCredentials: true
            })
        },
        searchBatchByOptionIds: async function (optionIds, params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v2/product-receive/batch/status`, optionIds, {
                params,
                withCredentials: true
            })
        },
        updateOne: async function (data) {
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v2/product-receive`, data, {
                withCredentials: true
            })
        },
    }
}

export {
    productReceiveDataConnect
}