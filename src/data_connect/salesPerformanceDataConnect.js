import axios from "axios";
import qs from "query-string";

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
        searchChannelPerformance: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/channel`, {
                params,
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