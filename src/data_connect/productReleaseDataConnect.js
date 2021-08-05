import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productReleaseDataConnect = () => {
    return {
        postList: async function(data){
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product-release/list`, data,{
                withCredentials: true
            })
        }
    }
}

export {
    productReleaseDataConnect
}