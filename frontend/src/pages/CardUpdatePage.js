import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savedCardsList, updateStripeCard } from '../actions/cardActions'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'
import { UPDATE_STRIPE_CARD_RESET } from '../constants'
import { checkTokenValidation, logout } from '../actions/userActions'
import { useHistory } from 'react-router-dom'   


const CardUpdatePage = () => {

    let history = useHistory()

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer


    const dispatch = useDispatch()
    const [cardNumber, setCardNumber] = useState("")
    const [name, setName] = useState("")
    const [expMonth, setExpMonth] = useState("")
    const [expYear, setExpYear] = useState("")
    const [addressCity, setAddressCity] = useState("")
    const [addressCountry, setAddressCountry] = useState("")
    const [addressState, setAddressState] = useState("")
    const [addressZip, setAddressZip] = useState("")
    const [customerId, setCustomerId] = useState("")
    const [cardId, setCardId] = useState("")

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const savedCardsListReducer = useSelector(state => state.savedCardsListReducer)
    const { stripeCards, loading } = savedCardsListReducer

    const updateStripeCardtReducer = useSelector(state => state.updateStripeCardtReducer)
    const { success } = updateStripeCardtReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(savedCardsList())
        }
    }, [dispatch, history, userInfo, success])

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }


    const onSubmit = (e) => {
        e.preventDefault()
        if (customerId && cardId) {
            const all_card_data = {
                card_number: cardNumber,
                customer_id: customerId,
                card_id: cardId,
                exp_month: expMonth,
                exp_year: expYear,
                name_on_card: name,
                address_city: addressCity,
                address_country: addressCountry,
                address_state: addressState,
                address_zip: addressZip
            }
            // action
            dispatch(updateStripeCard(all_card_data))
        }
    }

    const setCustomerAndCardIds = (cus_Id, card_Id, c_num) => {
        setCustomerId(cus_Id)
        setCardId(card_Id)
        setCardNumber(c_num)
    }

    if (success) {
        alert("Card Successfully Updated")
        history.push("/stripe-card-details")
        dispatch({
            type: UPDATE_STRIPE_CARD_RESET
        })
    }  
}

export default CardUpdatePage