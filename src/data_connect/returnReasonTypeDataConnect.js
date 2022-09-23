import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const returnReasonTypeDataConnect = () => {
    return {
        searchAll: async function() {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/return-reason-types/all`, {
                withCredentials: true
            })
        }
    }
}

export {
    returnReasonTypeDataConnect
}