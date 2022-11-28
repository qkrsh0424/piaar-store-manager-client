import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productReleaseDataConnect = () => {
    return {
        searchOneByErpOrderItemId: async function (orderItemId) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-release/erp-order-item/${orderItemId}`,{
                withCredentials: true
            })
        },
        createBatch: async function(data){
            return await axios.post(`${API_SERVER_ADDRESS}/api/v2/product-release/batch`, data,{
                withCredentials: true
            })
        },
        searchBatchByOptionIds: async function (optionIds, params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v2/product-release/batch/status`, optionIds, {
                params,
                withCredentials: true
            })
        },
        updateOne: async function (data) {
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v2/product-release`, data, {
                withCredentials: true
            })
        },
    }
}

export {
    productReleaseDataConnect
}