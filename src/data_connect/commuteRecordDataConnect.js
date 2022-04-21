import axios from "axios"

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const getCommuteRecordTodayStrict = async () =>{
    return await axios.get(`${API_SERVER_ADDRESS}/api/v1/commute-record/today/strict`, {
        withCredentials: true
    })
}

const setCommuteRecordWorkStart = async (params) =>{
    return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/commute-record/work/start`,params,{
        withCredentials: true
    });
}

const setCommuteRecordWorkEnd = async (params) =>{
    return await axios.patch(`${API_SERVER_ADDRESS}/api/v1/commute-record/work/end`,params,{
        withCredentials: true
    });
}


export {
    getCommuteRecordTodayStrict,
    setCommuteRecordWorkStart,
    setCommuteRecordWorkEnd
}