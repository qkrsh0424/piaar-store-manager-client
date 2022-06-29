import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpSalesHeaderDataConnect = () => {
    return {
        searchList: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/erp-sales-headers`, {
                withCredentials: true
            })
        },
        createOne: async function (params) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/erp-sales-headers`, params, {
                withCredentials: true
            })
        },
        updateOne: async function (params) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/erp-sales-headers`, params, {
                withCredentials: true
            })
        },
        deleteOne: async function (headerId) {
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/erp-sales-headers/${headerId}`, {
                withCredentials: true
            })
        }
    }
}

export {
    erpSalesHeaderDataConnect
}