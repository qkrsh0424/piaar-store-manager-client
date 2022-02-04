import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productReceiveDataConnect = () => {
    return {
        postList: async function(data){
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/product-receive/list`, data,{
                withCredentials: true
            })
        },
        searchList: async function(productOptionCid) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-receive/list/${productOptionCid}`,{
                withCredentials: true
            })
        },
        putOne: async function (data) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/product-receive/one`, data, {
                withCredentials: true
            })
        }
    }
}

export {
    productReceiveDataConnect
}