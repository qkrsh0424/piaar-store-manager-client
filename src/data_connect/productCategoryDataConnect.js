import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productCategoryDataConnect = () => {
    return {
        searchList: async function(){
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-category/list`,{
                withCredentials:true
            })
        },
        // 221109 FEAT
        createOne: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product-category`, body, {
                withCredentials:true
            })
        },
        changeOne: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/product-category`, body, {
                withCredentials:true
            })
        }
    }
}

export {
    productCategoryDataConnect
}