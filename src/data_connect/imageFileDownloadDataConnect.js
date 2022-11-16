import axios from "axios";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const imageFileDownloadDataConnect = () => {
    return {
        downloadByCloud: async function (body) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/file-download/cloud`, body, {
                responseType: 'blob',
                withCredentials: true
            })
        }
    }
}

export {
    imageFileDownloadDataConnect
}