import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const excelTranslatorDataConnect = () => {
    return {
        searchList: async function () {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/excel-translator/list`, {
                withCredentials: true
            })
        },
        postOne: async function (headerTitle) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/excel-translator/one`, headerTitle, {
                withCredentials: true
            })
        },
        putOne: async function (headerTitle) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/excel-translator/one`, headerTitle, {
                withCredentials: true
            })
        },
        deleteOne: async function (headerId) {
            return await axios.delete(`${API_SERVER_ADDRESS}/api/v1/excel-translator/one/${headerId}`, {
                withCredentials: true
            })
        },
        postFile: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/excel-translator/upload`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        createUploadHeaderDetail: async function (uploadHeaderDetail) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/excel-translator/header/upload/one`, uploadHeaderDetail, {
                withCredentials: true
            })
        },
        createDownloadHeaderDetails: async function (downloadHeaderDetail) {
            return await axios.put(`${API_SERVER_ADDRESS}/api/v1/excel-translator/header/download/one`, downloadHeaderDetail, {
                withCredentials: true
            })
        },
        downloadTranslatedExcelFile: async function (uploadedExcelData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/excel-translator/download`, uploadedExcelData, {
                responseType: 'blob',
                withCredentials: true
            })
        },
        downloadUploadedHeaderDetails: async function (uploadedDetails) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/excel-translator/header/upload/download`, uploadedDetails, {
                responseType: 'blob',
                withCredentials: true
            })
        },
        postDownloadHeaderFile: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/excel-translator/upload/download-header`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        }
    }
}

export {
     excelTranslatorDataConnect
};