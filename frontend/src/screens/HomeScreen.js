import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { listProductAction } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
 

const HomeScreen = () => {
  const {keyword} = useParams()
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList

  useEffect(() => {
    dispatch(listProductAction(keyword))
  }, [dispatch, keyword])
  return (
    <>
        <h1>Latest Products</h1>
        {loading ? <Loader /> : error ? <Message variant='danger' /> : 
            <Row>
              {products.map(product => (
                  <Col key={product._id} sm={12} md={6} xl={3}> 
                      <Product product = {product} />
                  </Col>
              ))}
            </Row>}
    </>
  )
}

export default HomeScreen