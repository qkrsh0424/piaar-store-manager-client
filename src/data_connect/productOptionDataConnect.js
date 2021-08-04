import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productOptionDataConnect = () => {
    return {
        getList: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-option/list`, {
                withCredentials: true
            })
        },
        postOne: async function(productOption){
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product-option/one`, productOption,{
                withCredentials: true
            })
        },
        putOne: async function (productOption) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/product-option/one`, productOption, {
                withCredentials: true
            })
        },
        deleteOne: async function(optionCid){
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/product-option/one/${optionCid}`,{
                withCredentials: true
            })
        }
    }
}

export {
    productOptionDataConnect
}