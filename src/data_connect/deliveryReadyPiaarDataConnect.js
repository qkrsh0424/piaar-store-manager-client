import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const deliveryReadyPiaarDataConnect = () => {
    return {
        postFile: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/piaar/upload`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        putFileData: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/piaar/store`, formData, {
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
        }
    }
}

export {
    deliveryReadyPiaarDataConnect
}