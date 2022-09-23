import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpReturnHeaderDataConnect = () => {
    return {
        searchAll: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/erp-return-headers/all`, {
                withCredentials: true
            })
        }
    }
}

export {
    erpReturnHeaderDataConnect
}