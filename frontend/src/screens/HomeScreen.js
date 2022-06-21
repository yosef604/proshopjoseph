import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { listProductAction } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import PaginationComponent from '../components/PaginationComponent'
import Product from '../components/Product'
import ProductsCarousel from '../components/ProductsCarousel'
 

const HomeScreen = () => {
  const {keyword} = useParams()
  const {pagenumber} = useParams() || 1
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const {loading, error, products, page, pages} = productList

  useEffect(() => {
    dispatch(listProductAction(keyword, pagenumber))
  }, [dispatch, keyword, pagenumber])
  return (
    <>
        <Meta />
        {!keyword ? <ProductsCarousel /> : <Link to='/' className='btm btn-light'>Go Back</Link>}
        <h1>Latest Products</h1>
        {loading ? 
        <Loader /> : 
        error ? <Message variant='danger'>{error}</Message> : 
        <>
            <Row>
              {products.map(product => (
                  <Col key={product._id} sm={12} md={6} xl={3}> 
                      <Product product = {product} />
                  </Col>
              ))}
            </Row>

            <PaginationComponent page={page} pages={pages} 
            keyword={keyword ? keyword : ''}/>
        </>}
    </>
  )
}

export default HomeScreen