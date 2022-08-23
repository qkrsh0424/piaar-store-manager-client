import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productDetailDataConnect = () => {
    return {
        // Unused API
        searchDetailListByOption: async function (optionCid) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-detail/batch/${optionCid}`, {
                withCredentials: true
            })
        },
        searchAll: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-detail/all`, {
                withCredentials: true
            })
        },
        postOne: async function (productDetail) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product-detail`, productDetail, {
                withCredentials: true
            })
        },
        putOne: async function (productDetail) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/product-detail`, productDetail, {
                withCredentials: true
            })
        },
        deleteOne: async function (detailId) {
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/product-detail/${detailId}`, {
                withCredentials: true
            })
        }
    }
}

export {
    productDetailDataConnect
}