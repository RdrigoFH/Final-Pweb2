import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { createProduct } from '../actions/productActions'
import { useHistory } from 'react-router'
import { checkTokenValidation, logout } from '../actions/userActions'
import { CREATE_PRODUCT_RESET } from '../constants'
import Message from '../components/Message';


const ProductCreatePage = () => {

    let history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState(false)
    const [image, setImage] = useState(null)

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const createProductReducer = useSelector(state => state.createProductReducer)
    const { product, success: productCreationSuccess, error: productCreationError } = createProductReducer

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        }
        dispatch(checkTokenValidation())
    }, [dispatch, userInfo, history])

    const onSubmit = (e) => {
        e.preventDefault()

        let form_data = new FormData()
        form_data.append('name', name)
        form_data.append('description', description)
        form_data.append('price', price)
        form_data.append('stock', stock)
        form_data.append('image', image)

        dispatch(createProduct(form_data))
    }

    if (productCreationSuccess) {
        alert("Product successfully created.")
        history.push(`/product/${product.id}/`)
        dispatch({
            type: CREATE_PRODUCT_RESET
        })
    }

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }
}

export default ProductCreatePage