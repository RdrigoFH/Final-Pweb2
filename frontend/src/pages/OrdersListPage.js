import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkTokenValidation, getAllOrders, logout } from '../actions/userActions'
import { useHistory } from 'react-router-dom'
import { Table, Spinner } from 'react-bootstrap'
import { dateCheck } from '../components/GetDate'
import { changeDeliveryStatus } from '../actions/productActions'
import { CHANGE_DELIVERY_STATUS_RESET } from '../constants'
import SearchBarForOrdersPage from '../components/SearchBarForOrdersPage'
import Message from '../components/Message'


function OrdersListPage() {

    let history = useHistory()
    const dispatch = useDispatch()
    const placeholderValue = "Search orders by Customer Name, Address or by Ordered Item"

    const todays_date = dateCheck(new Date().toISOString().slice(0, 10))

    const [currentDateInfo] = useState(todays_date)
    const [idOfchangeDeliveryStatus, setIdOfchangeDeliveryStatus] = useState(0)
    const [cloneSearchTerm, setCloneSearchTerm] = useState("")

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const getAllOrdersReducer = useSelector(state => state.getAllOrdersReducer)
    const { orders, loading: loadingOrders } = getAllOrdersReducer

    const changeDeliveryStatusReducer = useSelector(state => state.changeDeliveryStatusReducer)
    const { success: deliveryStatusChangeSuccess, loading: deliveryStatusChangeSpinner } = changeDeliveryStatusReducer

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(getAllOrders())
        }
    }, [userInfo, dispatch, history])

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    const changeDeliveryStatusHandler = (id, status) => {
        setIdOfchangeDeliveryStatus(id)
        const productData = {
            "is_delivered": status,
            "delivered_at": status ? currentDateInfo : "Not Delivered"
        }
        dispatch(changeDeliveryStatus(id, productData))
    }

    if (deliveryStatusChangeSuccess) {
        alert("Delivery status changed successfully")
        dispatch({
            type: CHANGE_DELIVERY_STATUS_RESET
        })
        dispatch(getAllOrders())
    }

    const handleSearchTerm = (term) => {
        setCloneSearchTerm(term)
    };
}

export default OrdersListPage