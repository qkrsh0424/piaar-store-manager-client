import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpOrderItemDataConnect = () => {
    return {
        // checkPwdForUploadedExcelFile: async function (formData) {
        //     return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/excel/upload/check-password`, formData, {
        //         withCredentials: true
        //     })
        // },
        uploadExcelFile: async function (formData, params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/excel/upload`, formData, {
                params,
                withCredentials: true
            })
        },
        searchBatch: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v2/erp-order-items/batch`, {
                params: params,
                withCredentials: true
            })
        },
        searchBatchByPage: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v2/erp-order-items/batch/page`, {
                params: params,
                withCredentials: true
            })
        },
        refreshOrderList: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v2/erp-order-items/action-refresh`, params, {
                withCredentials: true
            })
        },
        actionDownloadForDownloadReleaseItems: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/download-release-items/action-download`, body, {
                responseType: 'blob',
                withCredentials: true
            })
        }
        // deprecated api
        // searchAll: async function (params) {
        //     return await axios.get(`${API_SERVER_ADDRESS}/api/v2/erp-order-items`, {
        //         params: params,
        //         withCredentials: true
        //     })
        // },
        // searchList: async function (params) {
        //     return await axios.get(`${API_SERVER_ADDRESS}/api/v2/erp-order-items/search`, {
        //         params: params,
        //         withCredentials: true
        //     })
        // },
        // searchBatch: async function (params) {
        //     return await axios.get(`${API_SERVER_ADDRESS}/api/v2/erp-order-items/batch/search`, {
        //         params: params,
        //         withCredentials: true
        //     })
        // },
        // refreshOrderList: async function (params) {
        //     return await axios.post(`${API_SERVER_ADDRESS}/api/v2/erp-order-items/action-refresh`, params, {
        //         withCredentials: true
        //     })
        // },
        
        // unused api
        // createBatch: async function (params) {
        //     return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch`, params, {
        //         withCredentials: true
        //     })
        // },
        // updateOne: async function (body) {
        //     return await axios.put(`${API_SERVER_ADDRESS}/api/v1/erp-order-items`, body, {
        //         withCredentials: true
        //     })
        // },
        // changeSalesYnForListInSales: async function (body) {
        //     return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch/sales-yn`, body, {
        //         withCredentials: true
        //     })
        // },
        // changeReleaseYnForBatch: async function (body) {
        //     return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch/release-yn`, body, {
        //         withCredentials: true
        //     })
        // },
        // changeOptionCodeForBatch: async function (body) {
        //     return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch/option-code/all`, body, {
        //         withCredentials: true
        //     })
        // },
        // changeReleaseOptionCodeForListInBatch: async function (body) {
        //     return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch/release-option-code/all`, body, {
        //         withCredentials: true
        //     })
        // },
        // deleteBatch: async function (params) {
        //     return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch-delete`, params, {
        //         withCredentials: true
        //     })
        // },
        // changeWaybillForBatch: async function (formData) {
        //     return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch/waybill`, formData, {
        //         withCredentials: true
        //     })
        // },
    }
}

export {
    erpOrderItemDataConnect
}