import {
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGIN_FAIL,
   USER_LOGOUT,
   CARD_CREATE_RESET,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_REGISTER_FAIL,
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,
   USER_DETAILS_FAIL,
   UPDATE_USER_DETAILS_REQUEST,
   UPDATE_USER_DETAILS_SUCCESS,
   UPDATE_USER_DETAILS_FAIL,
   DELETE_USER_ACCOUNT_REQUEST,
   DELETE_USER_ACCOUNT_SUCCESS,
   DELETE_USER_ACCOUNT_FAIL,
   GET_USER_ALL_ADDRESSES_REQUEST,
   GET_USER_ALL_ADDRESSES_SUCCESS,
   GET_USER_ALL_ADDRESSES_FAIL,
   GET_SINGLE_ADDRESS_REQUEST,
   GET_SINGLE_ADDRESS_SUCCESS,
   GET_SINGLE_ADDRESS_FAIL,
   CREATE_USER_ADDRESS_REQUEST,
   CREATE_USER_ADDRESS_SUCCESS,
   CREATE_USER_ADDRESS_FAIL,
   UPDATE_USER_ADDRESS_REQUEST,
   UPDATE_USER_ADDRESS_SUCCESS,
   UPDATE_USER_ADDRESS_FAIL,
   DELETE_USER_ADDRESS_REQUEST,
   DELETE_USER_ADDRESS_SUCCESS,
   DELETE_USER_ADDRESS_FAIL,
   CHECK_TOKEN_VALID_REQUEST,
   CHECK_TOKEN_VALID_SUCCESS,
   CHECK_TOKEN_VALID_FAIL,
   GET_ALL_ORDERS_REQUEST,
   GET_ALL_ORDERS_SUCCESS,
   GET_ALL_ORDERS_FAIL,

} from '../constants/index'

import axios from 'axios'
export const login = (username, password) => async (dispatch) => {
   try {
       dispatch({
           type: USER_LOGIN_REQUEST
       })

       const config = {
           headers: {
               'Content-type': 'application/json'
           }
       }

       const { data } = await axios.post(
           '/account/login/',
           { 'username': username, 'password': password },
           config
       )

       dispatch({
           type: USER_LOGIN_SUCCESS,
           payload: data
       })

       localStorage.setItem('userInfo', JSON.stringify(data)) 
      
   } catch (error) {
       dispatch({
           type: USER_LOGIN_FAIL,
           payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
       })
   }
}

export const logout = () => (dispatch) => {
   localStorage.removeItem('userInfo')
   dispatch({
       type: USER_LOGOUT
   })
   dispatch({
       type: CARD_CREATE_RESET
   })
}

export const register = (username, email, password) => async (dispatch) => {
   try {
       dispatch({ type: USER_REGISTER_REQUEST })

       const config = {
           headers: {
               'Content-type': 'application/json'
           }
       }

       const { data } = await axios.post(`/account/register/`,
           { 'username': username, 'email': email, 'password': password },
           config
       )

       dispatch({
           type: USER_REGISTER_SUCCESS,
           payload: data
       })

       dispatch({
           type: USER_LOGIN_SUCCESS,
           payload: data
       })

       localStorage.setItem('userInfo', JSON.stringify(data))
   }
   catch (error) {
       dispatch({
           type: USER_REGISTER_FAIL,
           payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
       })
   }
}

export const checkTokenValidation = () => async (dispatch, getState) => {
   try {

       dispatch({
           type: CHECK_TOKEN_VALID_REQUEST
       })

       const {
           userLoginReducer: { userInfo }
       } = getState()

       const config = {
           headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${userInfo.token}`
           }
       }

       const { data } = await axios.get("/payments/check-token/", config)

       dispatch({
           type: CHECK_TOKEN_VALID_SUCCESS,
           payload: data
       })

   } catch (error) {
       dispatch({
           type: CHECK_TOKEN_VALID_FAIL,
           payload: error.response && error.response.data.details ? error.response.data.details : error.message
       })
   }
}

export const userDetails = (id) => async (dispatch, getState) => {

   try {

       dispatch({
           type: USER_DETAILS_REQUEST
       })

       const {
           userLoginReducer: { userInfo }
       } = getState()

       const config = {
           headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${userInfo.token}`
           }
       }
       const { data } = await axios.get(`/account/user/${id}`, config)

       dispatch({
           type: USER_DETAILS_SUCCESS,
           payload: data
       })

   } catch (error) {
       dispatch({
           type: USER_DETAILS_FAIL,
           payload: error.response && error.response.data.details ? error.response.data.details : error.message
       })
   }
}