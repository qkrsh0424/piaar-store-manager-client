import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productReleaseDataConnect = () => {
    return {
        // Unused api
        searchList: async function(productOptionCid) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-release/batch/${productOptionCid}`,{
                withCredentials: true
            })
        },
        postList: async function(data){
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product-release/batch`, data,{
                withCredentials: true
            })
        },
        putOne: async function (data) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/product-release/one`, data, {
                withCredentials: true
            })
        }
    }
}

export {
    productReleaseDataConnect
}