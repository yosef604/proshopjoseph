import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom'
import { allOrdersAction } from '../actions/orderActions'

const OrdersListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const allOrders = useSelector(state => state.allOrders)
    const {error, loading, orders} = allOrders

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(allOrdersAction())
        } else {
            navigate('/login')
        }
    }, [dispatch, userInfo])

  return (
    <>
        <h1>Orders</h1>
        {loading ? <Loader /> : error ? 
        <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive
            className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>deliverd</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>
                                {
                                    order.isPaid ? order.paidAt.substring(0, 10) :
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                }
                            </td>
                            <td>
                                {
                                    order.isDeliverd ? order.deliverdAt.substring(0, 10) :
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                }
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                        Details
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )} 
    </>
  )
}

export default OrdersListScreen