import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpOrderItemDataConnect = () => {
    return {
        uploadExcelFile: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/excel/upload`, formData, {
                withCredentials: true
            })
        },
        uploadExcelFileByOtherForm: async function (headerId, formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/excel/upload/${headerId}`, formData, {
                withCredentials: true
            })
        },
        searchList: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/search`, {
                params: params,
                withCredentials: true
            })
        },
        refreshList: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/action-refresh`, params, {
                withCredentials: true
            })
        },
        searchReleaseList: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/search/release`, {
                params: params,
                withCredentials: true
            })
        },
        createList: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch`, params, {
                withCredentials: true
            })
        },
        updateOne: async function (body) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/erp-order-items`, body, {
                withCredentials: true
            })
        },
        changeSalesYnForListInSales: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch/sales-yn`, body, {
                withCredentials: true
            })
        },
        changeReleaseYnForList: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch/release-yn`, body, {
                withCredentials: true
            })
        },
        changeOptionCodeForListInBatch: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch/option-code/all`, body, {
                withCredentials: true
            })
        },
        changeReleaseOptionCodeForListInBatch: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch/release-option-code`, body, {
                withCredentials: true
            })
        },
        deleteList: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch-delete`, params, {
                withCredentials: true
            })
        },
        changeWaybillForList: async function (formData) {
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch/waybill`, formData, {
                withCredentials: true
            })
        }
    }
}

export {
    erpOrderItemDataConnect
}