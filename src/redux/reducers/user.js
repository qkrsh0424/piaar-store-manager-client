import * as t from '../type/type';

const user = (state = {
    isLoading: true,
    userInfo: null
}, action) => {
    switch (action.type) {
        case t.USER_LOADING_TRUE:
            return {
                ...state,
                isLoading: true
            }
        case t.USER_LOADING_FALSE:
            return {
                ...state,
                isLoading: false
            }
        case t.SET_USER_INFO:
            return{
                ...state,
                userInfo:action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default user;