import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const deliveryReadyPiaarDataConnect = () => {
    return {
        postFile: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/piaar/upload`, params, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        putFileData: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/piaar/store`, params, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        getOrderList: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/piaar/view/orderList`, {
                withCredentials: true
            })
        },
        updateListToSold: async function (orderData) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/piaar/view/orderList/sold`, orderData, {
                withCredentials: true
            })
        },
        updateListToReleased: async function (soldData) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/piaar/view/orderList/released`, soldData, {
                withCredentials: true
            })
        },
        getCombinedDeliveryItem: async function (releasedData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/piaar/view/orderList/combined`, releasedData, {
                withCredentials: true
            })
        },
        getUnitCombinedDeliveryItem: async function (releasedData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/piaar/view/orderList/combined-unit`, releasedData, {
                withCredentials: true
            })
        }
    }
}

export {
    deliveryReadyPiaarDataConnect
}