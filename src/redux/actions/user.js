import * as t from '../type/type';

export const setUserLoadingFalse = () =>{
    return{
        type:t.USER_LOADING_FALSE
    }
}

export const setUserLoadingTrue = () =>{
    return{
        type:t.USER_LOADING_TRUE
    }
}

export const setUserInfo = (userInfo) =>{
    return{
        type:t.SET_USER_INFO,
        payload:userInfo
    }
}