import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productReleaseDataConnect = () => {
    return {
        // Unused api
        searchList: async function(productOptionId) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-release/batch/${productOptionId}`,{
                withCredentials: true
            })
        },
        postList: async function(params, data){
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product-release/batch`, data,{
                params,
                withCredentials: true
            })
        },
        putOne: async function (params, data) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/product-release`, data, {
                params,
                withCredentials: true
            })
        }
    }
}

export {
    productReleaseDataConnect
}