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
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/delete/one/${itemCid}`, {
                withCredentials: true
            })
        },
        deleteListUnreleasedData: async function (deliveryReadyItem) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/delete/batch`, deliveryReadyItem, {
                withCredentials: true
            })
        },
        changeListToReleaseData: async function (deliveryReadyItem) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/update/list/release`, deliveryReadyItem, {
                withCredentials: true
            })
        },
        updateReleasedData: async function (deliveryReadyItem) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/update/one`, deliveryReadyItem, {
                withCredentials: true
            })
        },
        changeListToUnreleaseData : async function (deliveryReadyItem) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/update/list/unrelease`, deliveryReadyItem, {
                withCredentials: true
            })
        },
        searchOptionInfo: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/search/list/option-info`, {
                withCredentials: true
            })
        },
        updateOptionInfo: async function (deliveryReadyItem, optionCode) {
            let json = {
                ...deliveryReadyItem,
                optionManagementCode: optionCode
            };

            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/update/option`, json, {
                withCredentials: true
            })
        },
        updateAllOptionInfo: async function (deliveryReadyItem, optionCode) {
            let json = {
                ...deliveryReadyItem,
                optionManagementCode: optionCode
            };

            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/update/options`, json, {
                withCredentials:true
            })
        },
        updateReleaseOptionInfo: async function (deliveryReadyItem, releaseOptionCode) {
            let json = {
                ...deliveryReadyItem,
                releaseOptionCode: releaseOptionCode
            };

            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/update/release-option`, json, {
                withCredentials: true
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
        },
        downloadLotteOrderForm: async function (data) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/download/lotte`, data, {
                responseType: 'blob',
                withCredentials:true
            })
        },
        downloadCoupangExcelOrderForm: async function (data) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/download/excel`, data, {
                responseType: 'blob',
                withCredentials:true
            })
        },
        reflectStockUnit: async function (deliveryReadyItem, releaseMemo) {
            let json = deliveryReadyItem.map(r => {
                r.releaseMemo = releaseMemo;
                return r;
            });

            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/stock-unit`, json, {
                withCredentials:true
            })
        },
        cancelReflectedStockUnit: async function (deliveryReadyItem, receiveMemo) {
            let json = deliveryReadyItem.map(r => {
                r.receiveMemo = receiveMemo;
                return r;
            });

            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/coupang/view/stock-unit/cancel`, json, {
                withCredentials:true
            })
        }
    }
}

export {
    deliveryReadyCoupangDataConnect
}