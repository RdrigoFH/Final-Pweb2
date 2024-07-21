import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savedCardsList } from '../actions/cardActions'
import { checkTokenValidation, logout } from '../actions/userActions'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import Message from "../components/Message"
import DeleteCardComponent from '../components/DeleteCardComponent'
import { useHistory } from 'react-router-dom'


const CardDetailsPage = () => {

    let history = useHistory()

    const dispatch = useDispatch()
    const [userId, setUserId] = useState(0)
    const [runCardDeleteHandler, setRunCardDeleteHandler] = useState(false)
    const [deleteCardNumber, setDeleteCardNumber] = useState("")

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    const savedCardsListReducer = useSelector(state => state.savedCardsListReducer)
    const { stripeCards, loading } = savedCardsListReducer

    const deleteSavedCardReducer = useSelector(state => state.deleteSavedCardReducer)
    const { success } = deleteSavedCardReducer

    const toggleRunCardDeleteHandler = () => {
        setRunCardDeleteHandler(!runCardDeleteHandler)
    }
}

export default CardDetailsPage