import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productDetailConnect = () => {
    return {
        searchList: async function (optionCid) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-detail/list/${optionCid}`, {
                withCredentials: true
            })
        }
    }
}

export {
    productDetailConnect
}