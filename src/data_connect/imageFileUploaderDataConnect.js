import axios from "axios";

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
        }
    }
}

export {
    imageFileUploaderDataConnect
}