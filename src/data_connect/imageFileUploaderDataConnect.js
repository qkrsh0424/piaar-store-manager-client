import axios from "axios";
import { dateToYYMMDDhhmmss } from "../utils/dateFormatUtils";

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const imageFileUploaderDataConnect = () => {
    return {
        postToCloud: async function (e) {
            const formData = new FormData();

            formData.append('files', e.target.files[0]);

            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/file-upload/cloud`, formData, {
                headers: {
                    "content-types": "multipart/form-data"
                },
                withCredentials: true
            })
        },
        downloadByUrl: async function (url, fileName) {
            fetch(url, { method: 'GET' })
                .then(res => {
                    return res.blob();
                })
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;

                    let date = dateToYYMMDDhhmmss(new Date());

                    link.download = '[' + date + ']' + fileName + '.png';
                    document.body.appendChild(link);
                    link.click();

                    setTimeout((_) => {
                        window.URL.revokeObjectURL(url) // 해당 url 사용 제한
                    }, 60000);
                    
                    link.remove();
                })
        }
    }
}

export {
    imageFileUploaderDataConnect
}