import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const deliveryReadyDataConnect = () => {
    return {
        postFile: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/upload`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        putFileData: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/store`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        getUnreleasedData: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/view/unreleased`, {
                withCredentials: true
            })
        },
        getSelectedReleasedData: async function (date1, date2) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/view/release/${date1}&&${date2}`, {
                withCredentials: true
            })
        },
        deleteUnreleasedData: async function (itemId) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/view/deleteOne/${itemId}`, {
                withCredentials: true
            })
        },
        updateReleasedData: async function (itemId) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/view/updateOne/${itemId}`, {
                withCredentials: true
            })
        }
    }
}

export {
    deliveryReadyDataConnect
}