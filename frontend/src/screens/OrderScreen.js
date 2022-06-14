import React, { useEffect } from 'react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { orderDetailsAction } from '../actions/orderActions'
import { Link } from 'react-router-dom'



const OrderScreen = () => {

    const {id} = useParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails

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
        if(!order || order._id !== id){
            dispatch(orderDetailsAction(id))
        }
    }, [dispatch, id])

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

                    {order.isDeliverd ? 
                    <Message variant='success'>
                        Deliverd On: {order.deliverdAt}
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
                </ListGroup>
            </Card>
        </Col>
    </Row>
  </>
}

export default OrderScreen