import axios from "axios";
import { dateToYYYYMMDD, getStartDate } from "../utils/dateFormatUtils";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const salesPerformanceDataConnect = () => {
    return {
        searchDashboard: async function (params) {
            let date = ["2022-11-01", "2022-11-02"];
            date = date.map(r => getStartDate(dateToYYYYMMDD(r).toString()).toISOString());

            date = date.join(",");
            params = {
                ...params,
                date: date
            }
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/sales-performance/dashboard`, {
                params,
                withCredentials: true
            })
        }
    }
}

export {
    salesPerformanceDataConnect
}