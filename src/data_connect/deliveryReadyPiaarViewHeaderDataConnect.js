import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const deliveryReadyPiaarViewHeaderDataConnect = () => {
    return {
        postOne: async function (viewHeader) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/piaar-header/view/one`, viewHeader, {
                withCredentials: true
            })
        },
        searchOneByUser: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/piaar-header/view/searchOne`, {
                withCredentials: true
            })
        },
        putOne: async function (viewHeader) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/piaar-header/view/one`, viewHeader, {
                withCredentials: true
            })
        }
    }
}

export {
    deliveryReadyPiaarViewHeaderDataConnect
}