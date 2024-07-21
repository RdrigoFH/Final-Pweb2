import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card } from 'react-bootstrap'
import { checkTokenValidation, getAllAddress, getSingleAddress, logout, updateUserAddress } from '../actions/userActions'
import { useHistory } from 'react-router-dom'
import { UPDATE_USER_ADDRESS_RESET } from '../constants'


const AddressUpdatePage = ({ match }) => {

    let history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [pinCode, setPinCode] = useState("")
    const [houseNumber, setHouseNumber] = useState("")
    const [landmark, setLandmark] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    const getSingleAddressReducer = useSelector(state => state.getSingleAddressReducer)
    const { address, error: errorFetchingAddress } = getSingleAddressReducer
  
    const updateUserAddressReducer = useSelector(state => state.updateUserAddressReducer)
    const { success: addressUpdateSuccess } = updateUserAddressReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(getSingleAddress(match.params.id))
        }
    }, [dispatch, history, userInfo, match]) 
}

export default AddressUpdatePage    