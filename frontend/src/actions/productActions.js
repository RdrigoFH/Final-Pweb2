import {
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,

    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,

    CHANGE_DELIVERY_STATUS_REQUEST,
    CHANGE_DELIVERY_STATUS_SUCCESS,
    CHANGE_DELIVERY_STATUS_FAIL,

} from '../constants/index'

import axios from 'axios'


export const getProductsList = () => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCTS_LIST_REQUEST
        })

        const { data } = await axios.get("/api/products/")

        dispatch({
            type: PRODUCTS_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCTS_LIST_FAIL,
            payload: error.message
        })
    }
}
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/product/${id}/`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message
        })
    }
}