import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpReturnItemSocket = () => {
    return {
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
        deleteBatch: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items/batch-delete`, params, {
                withCredentials: true
            })
        },
        changeReturnReasonForListInBatch: async function (body) {
            return await axios.patch(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items/batch/return-reason`, body, {
                withCredentials: true
            })
        }
    }
}

export {
    erpReturnItemSocket
}