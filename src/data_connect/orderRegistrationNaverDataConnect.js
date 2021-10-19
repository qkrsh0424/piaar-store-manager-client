import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const orderRegistrationNaverDataConnect = () => {
    return {
        postHansanFile: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/order-registration/naver/upload/hansan`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        downloadNaverExcelByHansan: async function (data) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/order-registration/naver/download/hansan`, data, {
                responseType: 'blob',
                withCredentials:true
            })
        },
        postSendedTailoFile: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/order-registration/naver/upload/tailo/sended`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        postReceivedTailoFile: async function (formData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/order-registration/naver/upload/tailo/received`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        downloadNaverExcelByTailo: async function (sendedTailoExcel, receivedTailoExcel) {
            let json = {
                sendedDto : [...sendedTailoExcel],
                receivedDto : [...receivedTailoExcel]
            };

            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/order-registration/naver/download/tailo`, json, {
                responseType: 'blob',
                withCredentials:true
            })
        }
    }
}

export {
    orderRegistrationNaverDataConnect
}