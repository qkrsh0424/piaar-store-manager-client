import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const salesPerformanceDataConnect = () => {
    return {
        searchDashboard: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/dashboard`, {
                params,
                withCredentials: true
            })
        },
        searchTotalPerformance: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/total`, {
                params,
                withCredentials: true
            })
        },
        searchChannelPerformance: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/sales-performance/channel/search`, body, {
                // params,
                withCredentials: true
            })
        },
        searchCategoryPerformance: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/category`, {
                params,
                withCredentials: true
            })
        },
        searchCategoryAndProductPerformance: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/category/product`, {
                params,
                withCredentials: true
            })
        }
    }
}

export {
    salesPerformanceDataConnect
}