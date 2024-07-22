import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_DETAILS_REQUEST,
    UPDATE_USER_DETAILS_SUCCESS,
    UPDATE_USER_DETAILS_FAIL,
    UPDATE_USER_DETAILS_RESET,
    DELETE_USER_ACCOUNT_REQUEST,
    DELETE_USER_ACCOUNT_SUCCESS,
    DELETE_USER_ACCOUNT_FAIL,
    DELETE_USER_ACCOUNT_RESET,
    GET_USER_ALL_ADDRESSES_REQUEST,
    GET_USER_ALL_ADDRESSES_SUCCESS,
    GET_USER_ALL_ADDRESSES_FAIL,
    GET_SINGLE_ADDRESS_REQUEST,
    GET_SINGLE_ADDRESS_SUCCESS,
    GET_SINGLE_ADDRESS_FAIL,
    GET_SINGLE_ADDRESS_RESET,
    CREATE_USER_ADDRESS_REQUEST,
    CREATE_USER_ADDRESS_SUCCESS,
    CREATE_USER_ADDRESS_FAIL,
    CREATE_USER_ADDRESS_RESET,
    UPDATE_USER_ADDRESS_REQUEST,
    UPDATE_USER_ADDRESS_SUCCESS,
    UPDATE_USER_ADDRESS_FAIL,
    UPDATE_USER_ADDRESS_RESET,
    DELETE_USER_ADDRESS_REQUEST,
    DELETE_USER_ADDRESS_SUCCESS,
    DELETE_USER_ADDRESS_FAIL,
    DELETE_USER_ADDRESS_RESET,
    CHECK_TOKEN_VALID_REQUEST,
    CHECK_TOKEN_VALID_SUCCESS,
    CHECK_TOKEN_VALID_FAIL,
    CHECK_TOKEN_VALID_RESET,
    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAIL,
} from '../constants/index'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}
