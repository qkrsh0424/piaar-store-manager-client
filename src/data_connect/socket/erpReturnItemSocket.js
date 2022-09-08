import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpReturnItemSocket = () => {
    return {
        updateOne: async function (body) {
            return await axios.put(`${API_SERVER_ADDRESS}/ws/v1/erp-return-items`, body, {
                withCredentials: true
            })
        }
    }
}

export {
    erpReturnItemSocket
}