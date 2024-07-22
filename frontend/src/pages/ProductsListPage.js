import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useHistory } from "react-router-dom";
import { CREATE_PRODUCT_RESET } from '../constants'


function ProductsListPage() {

    let history = useHistory()
    let searchTerm = history.location.search
    const dispatch = useDispatch()

    const productsListReducer = useSelector(state => state.productsListReducer)
    const { loading, error, products } = productsListReducer

    useEffect(() => {
        dispatch(getProductsList())
        dispatch({
            type: CREATE_PRODUCT_RESET
        })
    }, [dispatch])

    const showNothingMessage = () => {
        return (
            <div>
                {!loading ? <Message variant='info'>Nothing to show</Message> : ""}                
            </div>
        )
    }

    return (
        <div>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <span style={{ display: "flex" }}>
                <h5>Getting Products</h5>
                <span className="ml-2">
                    <Spinner animation="border" />
                </span>
            </span>}
            <div>
                <Row>

                    {/* Si la longitud del resultado del filtro es igual a 0, se mostrará el mensaje "no se encontró nada".
                        con la ayuda de la función showNothingMessage; de ​​lo contrario, muestra el resultado filtrado en el
                        página web y luego ejecutar la función de mapa */}

                    {(products.filter((item) =>
                        item.name.toLowerCase().includes(searchTerm !== "" ? searchTerm.split("=")[1] : "")
                    )).length === 0 ? showNothingMessage() : (products.filter((item) =>
                        item.name.toLowerCase().includes(searchTerm !== "" ? searchTerm.split("=")[1] : "")
                    )).map((product, idx) => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                            <div className="mx-2"> 
                                <Product product={product} />
                            </div>
                        </Col>
                    )
                    )}
                </Row>
            </div>
        </div>
    )
}

export default ProductsListPage