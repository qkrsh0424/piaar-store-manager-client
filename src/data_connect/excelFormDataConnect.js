import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const excelFormDataConnect = () => {
    return {
        checkPwdForUploadedExcelFile: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/excel/check-password`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        }
    }
}

export {
     excelFormDataConnect
};