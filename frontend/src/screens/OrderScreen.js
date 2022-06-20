import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deliverOrderAction, orderDetailsAction, payOrderAction } from '../actions/orderActions'
import { Link } from 'react-router-dom'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'



const OrderScreen = () => {

    const {id} = useParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay, success:successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading:loadingDeliver, success:successDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    if (!loading) {
        // Calculat prices
        const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
        order.orderItems.reduce(
            (acc, item) => acc + item.price * item.qty, 0
        ))
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || order._id !== id || successPay || successDeliver){
            dispatch({
                type: ORDER_PAY_RESET
            })
            dispatch({
                type: ORDER_DELIVER_RESET
            })
            dispatch(orderDetailsAction(id))
        } else if (!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, id, successPay, order, successDeliver, userInfo])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrderAction(id, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrderAction(order))
    }

  return loading ? <Loader /> : error ?
  <Message variant='danger'></Message> :
  <>
    <h1>Order {order._id}</h1>
    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p><strong>Name: </strong> {order.user.name}</p>
                    <p>
                        <strong>Email: </strong>
                        <a href={`mailto:${order.user.email}`}>
                            {order.user.email}
                        </a>
                    </p>
                    <p>
                        <strong>Address:</strong>
                        {order.shippingAddress.address},{' '}
                        {order.shippingAddress.city},{' '}     
                        {order.shippingAddress.postalcode},{' '}
                        {order.shippingAddress.country}
                    </p>

                    {order.isDelivered ? 
                    <Message variant='success'>
                        Deliverd On: {order.deliveredAt}
                    </Message> : 
                    <Message variant='danger'>
                        Not Deliverd
                    </Message>}

                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                    </p>

                    {order.isPaid ? 
                    <Message variant='success'>
                        Paid On: {order.paidAt}
                    </Message> : 
                    <Message variant='danger'>
                        Not Paid
                    </Message>}

                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ?
                        <Message>
                        No order
                    </Message> :
                        (
                    <ListGroup variant='flush'>
                        {order.orderItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col m={1}>
                                        <Image src={item.image}
                                        alt={item.name} rounded fluid />
                                    </Col>

                                    <Col>
                                        <Link to={`/product/${item.product_id}`}>
                                            {item.name}
                                        </Link>
                                    </Col>

                                    <Col md={4}>
                                        {item.qty} x ${item.price} = {item.qty * item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    )}
                </ListGroup.Item>
            </ListGroup>
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order summary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>
                                ${order.itemsPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>
                                ${order.shippingPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>
                                ${order.taxPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>
                                ${order.totalPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    {!order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && <Loader />}
                            {!sdkReady ? <Loader /> : (
                                <PayPalButton amount={order.totalPrice} 
                                onSuccess={successPaymentHandler} />
                            )}
                        </ListGroup.Item>
                    )}

                    {loadingDeliver && <Loader />}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDeliverd && (
                        <ListGroup.Item>
                            <Button type='button' className='btn w-100'
                            onClick={deliverHandler}>
                                Mark As Deliverd
                            </Button>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
        </Col>
    </Row>
  </>
}

export default OrderScreen