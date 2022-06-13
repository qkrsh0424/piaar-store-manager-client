import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const subOptionCodeDataConnect = () => {
    return {
        searchListByProductOptionId: async function(optionId) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sub-option-code/${optionId}`,{
                withCredentials: true
            })
        },
        deleteOne: async function (subOptionId) {
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/sub-option-code/${subOptionId}`, {
                withCredentials: true
            })
        },
        postOne: async function (data) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/sub-option-code`, data, {
                withCredentials: true
            })
        },
        putOne: async function (data) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/sub-option-code`, data, {
                withCredentials: true
            })
        }
    }
}

export {
    subOptionCodeDataConnect
}