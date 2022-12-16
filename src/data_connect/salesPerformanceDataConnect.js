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
        searchPayAmount: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/total/pay-amount`, {
                params,
                withCredentials: true
            })
        },
        searchRegistrationAndUnit: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/total/registration-and-unit`, {
                params,
                withCredentials: true
            })
        },
        searchPayAmountDayOfWeek: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/day-of-week/pay-amount`, {
                params,
                withCredentials: true
            })
        },
        searchSummaryData: async function (params) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/total/summary`, {
                params,
                withCredentials: true
            })
        }
    }
}

export {
    salesPerformanceDataConnect
}