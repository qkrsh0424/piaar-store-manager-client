import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const deliveryReadyCoupangDataConnect = () => {
    return {
        postFile: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/upload`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        putFileData: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/store`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        getUnreleasedData: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/unreleased`, {
                withCredentials: true
            })
        },
        getSelectedReleasedData: async function (date1, date2) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/released`, {
                params: {
                    startDate: date1,
                    endDate: date2
                },
                withCredentials: true
            })
        },
        deleteUnreleasedData: async function (itemCid) {
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/deleteOne/${itemCid}`, {
                withCredentials: true
            })
        },
        updateReleasedData: async function (deliveryReadyItem) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/updateOne`, deliveryReadyItem, {
                withCredentials: true
            })
        },
        searchOptionInfo: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/searchList/optionInfo`, {
                withCredentials: true
            })
        },
        updateOptionInfo: async function (deliveryReadyItem, optionCode) {
            let json = {
                ...deliveryReadyItem,
                optionManagementCode: optionCode
            };

            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/updateOption`, json, {
                withCredentials: true
            })
        },
        updateAllOptionInfo: async function (deliveryReadyItem, optionCode) {
            let json = {
                ...deliveryReadyItem,
                optionManagementCode: optionCode
            };

            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/updateOptions`, json, {
                withCredentials:true
            })
        },
        downloadHansanOrderForm: async function (data) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/download/hansan`, data, {
                responseType: 'blob',
                withCredentials:true
            })
        },
        downloadTailoOrderForm: async function (data) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/download/tailo`, data, {
                responseType: 'blob',
                withCredentials:true
            })
        }
    }
}

export {
    deliveryReadyCoupangDataConnect
}