import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const erpReturnHeaderSocket = () => {
    return {
        createOne: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/ws/v1/erp-return-headers`, body, {
                withCredentials: true
            })
        },
        updateOne: async function (body) {
            return await axios.put(`${API_SERVER_ADDRESS}/ws/v1/erp-return-headers`, body, {
                withCredentials: true
            })
        },
        deleteOne: async function (headerId) {
            return await axios.delete(`${API_SERVER_ADDRESS}/ws/v1/erp-return-headers/${headerId}`, {
                withCredentials: true
            })
        }
    }
}

export {
    erpReturnHeaderSocket
}