import {
    CARD_CREATE_REQUEST,
    CARD_CREATE_SUCCESS,
    CARD_CREATE_FAIL,
    CARD_CREATE_RESET,

    CHARGE_CARD_REQUEST,
    CHARGE_CARD_SUCCESS,
    CHARGE_CARD_FAIL,
    CHARGE_CARD_RESET,

    SAVED_CARDS_LIST_REQUEST,
    SAVED_CARDS_LIST_SUCCESS,
    SAVED_CARDS_LIST_FAIL,

    UPDATE_STRIPE_CARD_REQUEST,
    UPDATE_STRIPE_CARD_SUCCESS,
    UPDATE_STRIPE_CARD_FAIL,
    UPDATE_STRIPE_CARD_RESET,

    DELETE_SAVED_CARD_REQUEST,
    DELETE_SAVED_CARD_SUCCESS,
    DELETE_SAVED_CARD_FAIL,

} from '../constants/index'

export const createCardReducer = (state = {}, action) => {
    switch (action.type) {
        case CARD_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
                cardData: {},
                success: false,
                error: ""
            }
        case CARD_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                cardData: action.payload,
                error: ""
            }
        case CARD_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                cardData: {},
                success: false,
                error: action.payload
            }
        case CARD_CREATE_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                cardData: {},
                error: "",
            }
        default:
            return state
    }
    
}
export const chargeCardReducer = (state = {}, action) => {
    switch (action.type) {
        case CHARGE_CARD_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: ""
            }
        case CHARGE_CARD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: ""
            }
        case CHARGE_CARD_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        case CHARGE_CARD_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                error: ""
            }
        default:
            return state
    }
}

