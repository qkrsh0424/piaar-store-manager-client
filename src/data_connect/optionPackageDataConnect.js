import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const optionPackageDataConnect = () => {
    return {
        searchBatchByParentOptionId: async function (parentOptionId) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v2/option-packages/parent-option/${parentOptionId}`, {
                withCredentials: true
            })
        },
        deleteAndCreateBatch: async function (parentOptionId, data) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v2/option-packages/${parentOptionId}`, data, {
                withCredentials: true
            })
        }
    }
}

export {
    optionPackageDataConnect
}