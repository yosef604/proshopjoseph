import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import { Button, Col, Row, Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { userDeleteAction, usersListAction } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { listProductAction, productCreateAction, productDeleteAction } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductsListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    const productCreate = useSelector(state => state.productCreate)
    const {
        error:errorCrete, 
        loading:loadingCreate, 
        success:successCreate,
        product:createdProduct
    } = productCreate

    const productDelete = useSelector(state => state.productDelete)
    const {
        error:errorDelete, 
        loading:loadingDelete, 
        success:successDelete
    } = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo || !userInfo.isAdmin) {
            navigate('/login')
        }

        if (successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProductAction())
        }
    }, [
        dispatch, 
        userInfo, 
        successDelete, 
        successCreate, 
        createdProduct
    ])

    const createProductHandler = () => {
        dispatch(productCreateAction())
    }

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(productDeleteAction(id))
        }
    }

  return (
    <>
        <Row className='align-items-center'>
            <Col> <h1>Products</h1> </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCrete && <Message variant='danger'>{errorCrete}</Message>}
        {loading ? <Loader /> : error ? 
        <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive
            className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>

                                <Button variant='danger' className='btn-sm'
                                onClick={() => deleteHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )} 
    </>
  )
}

export default ProductsListScreen