import React, { useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout, userAccountDelete, checkTokenValidation } from '../actions/userActions'
import Message from '../components/Message'
import { Spinner } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import { DELETE_USER_ACCOUNT_RESET } from '../constants'


function DeleteUserAccount() {

    let history = useHistory()
    const dispatch = useDispatch()
    const [myPassword, setMyPassword] = useState("")

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const deleteUserAccountReducer = useSelector(state => state.deleteUserAccountReducer)
    const { success, loading, error } = deleteUserAccountReducer

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            "id": userInfo.id,
            "password": myPassword
        }
        dispatch(checkTokenValidation())        
        dispatch(userAccountDelete(userData))        
    }
    
    if(success) {
        alert("Account successfully deleted.")
        dispatch({
            type: DELETE_USER_ACCOUNT_RESET
        })
        dispatch(logout()) // action
        history.push("/login")
        window.location.reload()
    }
}

export default DeleteUserAccount