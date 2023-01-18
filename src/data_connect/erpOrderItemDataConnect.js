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
        searchAll: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v2/erp-order-items`, {
                params: params,
                withCredentials: true
            })
        },
        searchList: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v2/erp-order-items/search`, {
                params: params,
                withCredentials: true
            })
        },
        searchBatch: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v2/erp-order-items/batch/search`, {
                params: params,
                withCredentials: true
            })
        },
        refreshOrderList: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v2/erp-order-items/action-refresh`, params, {
                withCredentials: true
            })
        },
        // refreshOrderList: async function (params) {
        //     return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/target:order/action-refresh`, params, {
        //         withCredentials: true
        //     })
        // },
        // refreshSalesList: async function (params) {
        //     return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/target:sales/action-refresh`, params, {
        //         withCredentials: true
        //     })
        // },
        // refreshReleaseList: async function (params) {
        //     return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/target:release/action-refresh`, params, {
        //         withCredentials: true
        //     })
        // },
        // searchReleaseList: async function (params) {
        //     return await axios.get(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/search/release`, {
        //         params: params,
        //         withCredentials: true
        //     })
        // },
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
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/batch/release-option-code/all`, body, {
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
        },
        actionDownloadForDownloadReleaseItems: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-order-items/download-release-items/action-download`, body, {
                responseType: 'blob',
                withCredentials: true
            })
        },
        // 패키지옵션으로 구성된 item을 구성상품으로 변경해 리턴
        searchReleasePackageItem: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v2/erp-order-items/option-package/release-confirm`, body, {
                withCredentials: true
            })
        },
        // 기간내에 erp order item에 등록된 sales channel을 중복없이 조회한다
        searchSalesChannel: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v2/erp-order-items/sales-channel`, {
                params,
                withCredentials: true
            })
        },
        // 판매성과 - 성과 조회 페이지에서 검색되는 item
        searchPerformance: async function (body, params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v2/erp-order-items/search/sales-performance`, body, {
                params: params,
                withCredentials: true
            })
        }
    }
}

export {
    erpOrderItemDataConnect
}