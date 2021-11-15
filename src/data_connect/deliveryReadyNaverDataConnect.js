import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const deliveryReadyNaverDataConnect = () => {
    return {
        postFile: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/upload`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        putFileData: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/store`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        getUnreleasedData: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/unreleased`, {
                withCredentials: true
            })
        },
        getSelectedReleasedData: async function (date1, date2) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/released`, {
                params: {
                    startDate: date1,
                    endDate: date2
                },
                withCredentials: true
            })
        },
        deleteUnreleasedData: async function (itemCid) {
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/delete/one/${itemCid}`, {
                withCredentials: true
            })
        },
        deleteListUnreleasedData: async function (deliveryReadyitem) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/delete/batch`, deliveryReadyitem, {
                withCredentials: true
            })
        },
        changeListToReleaseData: async function (deliveryReadyItem) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/update/list/release`, deliveryReadyItem, {
                withCredentials: true
            })
        },
        updateReleasedData: async function (deliveryReadyItem) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/update/one`, deliveryReadyItem, {
                withCredentials: true
            })
        },
        changeListToUnreleaseData : async function (deliveryReadyItem) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/update/list/unrelease`, deliveryReadyItem, {
                withCredentials: true
            })
        },
        searchOptionInfo: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/search/list/option-info`, {
                withCredentials: true
            })
        },
        updateOptionInfo: async function (deliveryReadyItem, optionCode) {
            let json = {
                ...deliveryReadyItem,
                optionManagementCode: optionCode
            };

            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/update/option`, json, {
                withCredentials: true
            })
        },
        updateAllOptionInfo: async function (deliveryReadyItem, optionCode) {
            let json = {
                ...deliveryReadyItem,
                optionManagementCode: optionCode
            };

            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/update/options`, json, {
                withCredentials:true
            })
        },
        downloadHansanOrderForm: async function (data) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/download/hansan`, data, {
                responseType: 'blob',
                withCredentials:true
            })
        },
        downloadTailoOrderForm: async function (data) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/download/tailo`, data, {
                responseType: 'blob',
                withCredentials:true
            })
        },
        downloadLotteOrderForm: async function (data) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/download/lotte`, data, {
                responseType: 'blob',
                withCredentials:true
            })
        },
        downloadNaverExcelOrderForm: async function (data) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/download/excel`, data, {
                responseType: 'blob',
                withCredentials:true
            })
        },
        reflectStockUnit: async function (deliveryReadyItem, releaseMemo) {
            let json = deliveryReadyItem.map(r => {
                r.releaseMemo = releaseMemo;
                return r;
            });

            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/stock-unit`, json, {
                withCredentials:true
            })
        },
        cancelReflectedStockUnit: async function (deliveryReadyItem, receiveMemo) {
            let json = deliveryReadyItem.map(r => {
                r.receiveMemo = receiveMemo;
                return r;
            });

            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/delivery-ready/naver/view/stock-unit/cancel`, json, {
                withCredentials:true
            })
        }
    }
}

export {
    deliveryReadyNaverDataConnect
}