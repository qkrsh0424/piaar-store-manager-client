import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const productCategoryDataConnect = () => {
    return {
        searchList: async function(){
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/product-category/list`,{
                withCredentials:true
            })
        }
    }
}

export {
    productCategoryDataConnect
}