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
        searchChannelPerformance: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/channel`, {
                params,
                withCredentials: true
            })
        },        
        // 사용하지않는 api - 총 판매스토어 매출액
        searchSalesChannelPayAmount: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/sales-channel/total/pay-amount`, {
                params,
                withCredentials: true
            })
        },
        searchPayAmountByChannel: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/sales-channel/pay-amount`, {
                params,
                withCredentials: true
            })
        },
        searchRegistrationAndUnitByChannel: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/sales-channel/registration-and-unit`, {
                params,
                withCredentials: true
            })
        },
        searchPayAmountDayOfWeekByChannel: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/sales-channel/pay-amount/day-of-week`, {
                params,
                withCredentials: true
            })
        },
        searchProductPayAmountByChannel: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/sales-channel/pay-amount/product`, {
                params,
                withCredentials: true
            })
        }
    }
}

export {
    salesPerformanceDataConnect
}