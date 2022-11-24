import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productDataConnect = () => {
    return {
        createProductAndOptions: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v2/products/options`, body, {
                withCredentials: true
            })
        },
        // TODO :: 제거
        modifyProductAndOptions: async function (body) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v2/products/options`, body, {
                withCredentials: true
            })
        },
        searchBatch: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v2/products/batch/stock`, {
                params,
                withCredentials: true
            })
        },
        searchBatchByPaging: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v2/products/batch/stock/page`, {
                params,
                withCredentials: true
            })
        },
        // TODO :: 제거
        searchProductAndOptions: async function (productId) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v2/products/${productId}`, {
                withCredentials: true
            })
        },
        searchBatch: async function(){
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/products/batch`, {
                withCredentials: true
            })
        },
        // 22.10.20 FEAT
        deleteOne: async function (productId) {
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v2/products/${productId}`, {
                withCredentials: true
            })
        },
        // 22.11.08 FEAT
        searchOne: async function (productId) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v2/products/${productId}`, {
                withCredentials: true
            })
        },
        // 22.11.08 FEAT
        modifyProduct: async function (body) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v2/products`, body, {
                withCredentials: true
            })
        },
    }
}

export {
    productDataConnect
}