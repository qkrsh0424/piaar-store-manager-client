import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productDetailDataConnect = () => {
    return {
        searchDetailListByOption: async function (optionCid) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-detail/list/${optionCid}`, {
                withCredentials: true
            })
        },
        postOne: async function (productDetail) {
            console.log(productDetail);
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product-detail/one`, productDetail, {
                withCredentials: true
            })
        },
        putOne: async function (productDetail) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/product-detail/one`, productDetail, {
                withCredentials: true
            })
        },
        deleteOne: async function (detailCid) {
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/product-detail/one/${detailCid}`, {
                withCredentials: true
            })
        }
    }
}

export {
    productDetailDataConnect
}