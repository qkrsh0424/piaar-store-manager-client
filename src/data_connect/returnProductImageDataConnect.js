import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const returnProductImageDataConnect = () => {
    return {
        createBatch: async function(data){
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/return-product-images/batch`, data,{
                withCredentials: true
            })
        },
        searchBatchByErpReturnItemId: async function(erpReturnItemId) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/return-product-images/batch/${erpReturnItemId}`, {
                withCredentials: true
            })
        },
        deleteOne: async function (imageId) {
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/return-product-images/${imageId}`, {
                withCredentials: true
            })
        }
    }
}

export {
    returnProductImageDataConnect
}