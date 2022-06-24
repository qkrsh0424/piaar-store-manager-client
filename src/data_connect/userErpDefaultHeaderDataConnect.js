import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const userErpDefaultHeaderDataConnect = () => {
    return {
        searchOne: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/user-erp-default-headers`, {
                withCredentials: true
            })
        }
    }
}

export {
    userErpDefaultHeaderDataConnect
}