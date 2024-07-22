import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { getProductDetails, updateProduct } from '../actions/productActions'
import { checkTokenValidation, logout } from '../actions/userActions'
import { UPDATE_PRODUCT_RESET } from '../constants'
import Message from '../components/Message'


const ProductUpdatePage = ({ match }) => {

    const productDetailsReducer = useSelector(state => state.productDetailsReducer)
    const { loading: loadingPageDetails, product } = productDetailsReducer

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState(product.stock)
    const [image, setImage] = useState("")

    let history = useHistory()
    const dispatch = useDispatch()

    const [newImage, setNewImage] = useState(false)

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const updateProductReducer = useSelector(state => state.updateProductReducer)
    const {
        success: productUpdationSuccess,
        loading: loadingProductUpdations,
        error: productUpdationError
    } = updateProductReducer

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer
    
    useEffect(() => {
        if (!userInfo || !userInfo.admin) {
            history.push("/login")
        }
        dispatch(checkTokenValidation())
        dispatch(getProductDetails(match.params.id))
    }, [dispatch, userInfo, history, match])

    const onSubmit = (e) => {
        e.preventDefault()
        const productId = product.id
        let form_data = new FormData()
        form_data.append('name', name)
        form_data.append('description', description)
        form_data.append('price', price)
        form_data.append('stock', stock)
        form_data.append('image', image)

        dispatch(updateProduct(productId, form_data))
    }

    if (productUpdationSuccess) {
        alert("Product successfully updated.")
        dispatch({
            type: UPDATE_PRODUCT_RESET
        })
        history.push(`/product/${product.id}`)
    }


    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }
}

export default ProductUpdatePage