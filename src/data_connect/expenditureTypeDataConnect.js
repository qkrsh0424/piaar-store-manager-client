import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const expenditureTypeDataConnect = () => {
    return {
        getExpenditureTypeList: async function (startDate, endDate) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/expenditure-type/list`, {
                params: {
                    startDate: startDate,
                    endDate: endDate
                },
                withCredentials: true
            })
        }
    }
}

export {
    expenditureTypeDataConnect
}