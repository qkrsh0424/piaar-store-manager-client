import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpReturnItemSocket = () => {
    return {
        createBatch: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items/batch`, body, {
                withCredentials: true
            })
        },
        updateOne: async function (body) {
            return await axios.put(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items`, body, {
                withCredentials: true
            })
        },
        changeCollectYnForList: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items/batch/collect-yn`, body, {
                withCredentials: true
            })
        },
        changeCollectCompleteYnForList: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items/batch/collect-complete-yn`, body, {
                withCredentials: true
            })
        },
        changeReturnCompleteYnForList: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items/batch/return-complete-yn`, body, {
                withCredentials: true
            })
        },
        changeHoldYnForList: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items/batch/hold-yn`, body, {
                withCredentials: true
            })
        },
        changeReturnRejectYnForList: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items/batch/return-reject-yn`, body, {
                withCredentials: true
            })
        },
        deleteBatch: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items/batch-delete`, params, {
                withCredentials: true
            })
        },
        changeReturnReasonForListInBatch: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items/batch/return-reason`, body, {
                withCredentials: true
            })
        },
        actionReflectDefective: async function (body, params) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items/defective/action-reflect`, body, {
                params,
                withCredentials: true
            })
        },
        actionCancelDefective: async function (body, params) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items/defective/action-cancel`, body, {
                params,
                withCredentials: true
            })
        },
        actionReflectStock: async function (body, params) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items/stock/action-reflect`, body, {
                params,
                withCredentials: true
            })
        },
        actionCancelStock: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items/stock/action-cancel`, body, {
                withCredentials: true
            })
        }
    }
}

export {
    erpReturnItemSocket
}