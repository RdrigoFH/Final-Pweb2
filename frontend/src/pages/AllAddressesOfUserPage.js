import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Modal, Button, Spinner } from 'react-bootstrap'
import { deleteUserAddress, getAllAddress, checkTokenValidation, logout } from '../actions/userActions'
import { DELETE_USER_ADDRESS_RESET, GET_SINGLE_ADDRESS_RESET } from '../constants'
import { useHistory } from 'react-router-dom'
import CreateAddressComponent from '../components/CreateAddressComponent'


function AllAddressesOfUserPage() {

    let history = useHistory()

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer


    const dispatch = useDispatch()
    const [deleteAddress, setDeleteAddress] = useState("")
    const [createAddress, setCreateAddress] = useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const getAllAddressesOfUserReducer = useSelector(state => state.getAllAddressesOfUserReducer)
    const { addresses, loading: loadingAllAddresses } = getAllAddressesOfUserReducer

    const deleteUserAddressReducer = useSelector(state => state.deleteUserAddressReducer)
    const { success: addressDeletionSuccess } = deleteUserAddressReducer

    
}

export default AllAddressesOfUserPage