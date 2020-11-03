
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_DETAILS_CLEAR,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_ALL_FAIL,
    USER_ALL_REQUEST,
    USER_ALL_SUCCESS,
    USER_BY_ID_FAIL,
    USER_BY_ID_REQUEST,
    USER_BY_ID_SUCCESS,
    USER_UPDATE_BY_ID_FAIL,
    USER_UPDATE_BY_ID_REQUEST,
    USER_UPDATE_BY_ID_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS
} from '../constants/userConstants'



export const userLoginReducer = (state = { user: {} }, action) => {

    switch (action.type) {

        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, user: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}


export const userDetailsReducer = (state = { userData: {} }, action) => {

    switch (action.type) {

        case USER_DETAILS_REQUEST:
            return { loading: true }

        case USER_DETAILS_SUCCESS:
            return { loading: false, userData: action.payload }

        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case USER_DETAILS_CLEAR:
            return {}

        default:
            return state
    }
}


export const userRegisterReducer = (state={}, action) => {

    switch (action.type) {

        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, success: true }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

            default:
                return state
    }
}

export const userUpdateReducer = (state={}, action) => {

    switch (action.type) {

        case USER_UPDATE_REQUEST:
            return { loading: true }

        case USER_UPDATE_SUCCESS:
            return { loading: false, message: action.payload }

        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

            default:
                return state
    }
}


export const userListReducer=(state={users:[]},action)=>{
    
    switch (action.type) {

        case USER_ALL_REQUEST:
            return { loading: true }

        case USER_ALL_SUCCESS:
            return { loading: false, users: action.payload }

        case USER_ALL_FAIL:
            return { loading: false, error: action.payload }

            default:
                return state
    }
}

export const userDetailsByIdReducer=(state={user:{}},action)=>{
    
    switch (action.type) {

        case USER_BY_ID_REQUEST:
            return { loading: true }

        case USER_BY_ID_SUCCESS:
            return { loading: false, user: action.payload }

        case USER_BY_ID_FAIL:
            return { loading: false, error: action.payload }

            default:
                return state
    }
}


export const userUpdateByIdReducer=(state={},action)=>{
        
    switch (action.type) {

        case USER_UPDATE_BY_ID_REQUEST:
            return { loading: true }

        case USER_UPDATE_BY_ID_SUCCESS:
            return { loading: false, message: action.payload.message,success:true }

        case USER_UPDATE_BY_ID_FAIL:
            return { loading: false, error: action.payload }

            default:
                return state
    }
}



export const userDeleteReducer=(state={},action)=>{
    
    switch (action.type) {

        case USER_DELETE_REQUEST:
            return { loading: true }

        case USER_DELETE_SUCCESS:
            return { loading: false, message: action.payload.message,success:true }

        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }

            default:
                return state
    }
}
