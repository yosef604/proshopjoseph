import React, { useEffect } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { addToCartAction, removeFromCartAction } from '../actions/cartActions'
import Message from '../components/Message'

const CartScreen = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    useEffect(() => {
        if (id) {
            dispatch(addToCartAction(id, qty))
        }
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCartAction(id))
    }

    const checkOutHandler = (id) => {
        navigate(`/login?redirect=shipping`)
    }
    
  return (
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? 
            <Message>
                Your cart is empty <Link to='/'> Go Back </Link>
            </Message> : (
                <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product_id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>

                                <Col md={3}>
                                    <Link to={`/product/${item.product_id}`}>
                                        {item.name}
                                    </Link>
                                </Col>

                                <Col md={2}>${item.price}</Col>

                                <Col md={2}>
                                    <Form.Control as='select' value={item.qty} onChange={
                                        (e) => dispatch(addToCartAction(item.product_id, Number(e.target.value)))}>
                                        {[...Array(item.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}> {x + 1} </option>
                                        ))}
                                    </Form.Control>
                                </Col>

                                <Col md={2}>
                                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product_id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Subtotal: ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>

                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button type='button' className='w-100' disabled={cartItems.length === 0}
                        onClick={checkOutHandler}>Proceed To Checkout</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
  )
}

export default CartScreen