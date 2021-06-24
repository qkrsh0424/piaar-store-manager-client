import axios from 'axios';

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const expenditureTypeDataConnect = () => {
    return {
        getExpenditureTypeList: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/expenditure-type/list`, {
                withCredentials: true
            })
        }
    }
}

export {
    expenditureTypeDataConnect
}