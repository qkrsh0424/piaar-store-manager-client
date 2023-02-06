import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const salesPerformanceDataConnect = () => {
    return {
        searchDashboard: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/sales-performance/search/dashboard`, body, {
                withCredentials: true
            })
        },
        searchTotalPerformance: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/sales-performance/search/total`, body, {
                withCredentials: true
            })
        },
        searchChannelPerformance: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/sales-performance/search/channel`, body, {
                withCredentials: true
            })
        },
        searchCategoryPerformance: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/sales-performance/search/category`, body, {
                withCredentials: true
            })
        },
        searchCategoryAndProductPerformance: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/sales-performance/search/category/product`, body, {
                withCredentials: true
            })
        },
        searchProductOptionPerformance: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/sales-performance/search/product-option`, body, {
                withCredentials: true
            })
        },
        searchProductPerformance: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/sales-performance/search/product`, body, {
                withCredentials: true
            })
        },
        searchBestProductPerformance: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/sales-performance/search/product/best`, body, {
                params: {
                    page: body.page,
                    size: body.size
                },
                withCredentials: true
            })
        },
        searchOptionPerformanceByProduct: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/sales-performance/search/product/product-option`, body, {
                withCredentials: true
            })
        },
        searchProductChannelPerformance: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/sales-performance/search/product/channel`, body, {
                withCredentials: true
            })
        }
    }
}

export {
    salesPerformanceDataConnect
}