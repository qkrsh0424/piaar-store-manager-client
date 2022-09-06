import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpReturnItemDataConnect = () => {
    return {
        createBatch: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-return-items/batch`, body, {
                withCredentials: true
            })
        },
        searchBatchByPage: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/erp-return-items/batch/page`, {
                params: params,
                withCredentials: true
            })
        }
    }
}

export {
    erpReturnItemDataConnect
}