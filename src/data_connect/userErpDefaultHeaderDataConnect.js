import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const userErpDefaultHeaderDataConnect = () => {
    return {
        searchOne: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/user-erp-default-headers`, {
                withCredentials: true
            })
        },
        createOne: async function (data) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/user-erp-default-headers`, data, {
                withCredentials: true
            })
        },
        patchOne: async function (params) {
            return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/user-erp-default-headers`, params, {
                withCredentials: true
            })
        }
    }
}

export {
    userErpDefaultHeaderDataConnect
}