import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productDetailPageDataConnect = () => {
    return {
        searchBatch: async function(productId) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-detail-pages/batch/${productId}`, {
                withCredentials: true
            })
        },
        createOne: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product-detail-pages`, body, {
                withCredentials: true
            })
        },
        deleteOne: async function (pageId) {
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/product-detail-pages/${pageId}`, {
                withCredentials: true
            })
        },
        changeOne: async function (body) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/product-detail-pages`, body, {
                withCredentials: true
            })
        }
    }
}

export {
    productDetailPageDataConnect
}