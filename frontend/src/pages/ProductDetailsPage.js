import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col, Container, Card, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CREATE_PRODUCT_RESET, DELETE_PRODUCT_RESET, UPDATE_PRODUCT_RESET, CARD_CREATE_RESET } from '../constants'


function ProductDetailsPage({ history, match }) {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const productDetailsReducer = useSelector(state => state.productDetailsReducer)
    const { loading, error, product } = productDetailsReducer

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const deleteProductReducer = useSelector(state => state.deleteProductReducer)
    const { success: productDeletionSuccess } = deleteProductReducer

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
        dispatch({
            type: UPDATE_PRODUCT_RESET
        })
        dispatch({
            type: CREATE_PRODUCT_RESET
        })
        dispatch({
            type: CARD_CREATE_RESET
        })
    }, [dispatch, match])

    const confirmDelete = () => {
        dispatch(deleteProduct(match.params.id))
        handleClose()
    }

    if (productDeletionSuccess) {
        alert("Product successfully deleted.")
        history.push("/")
        dispatch({
            type: DELETE_PRODUCT_RESET
        })
    }
}

export default ProductDetailsPage