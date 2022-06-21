import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Carousel, Image, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Message from './Message'
import { listTopProductAction } from '../actions/productActions'

const ProductsCarousel = () => {
    const dispatch = useDispatch()

    const getTopProducts = useSelector(state => state.getTopProducts)
    const {loading, error, topProducts} = getTopProducts

    useEffect(() => {
        dispatch(listTopProductAction())
    }, [dispatch])

  return (
    <>
    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' className='bg-dark'>
            {topProducts.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>

        
    )}
    </>
  )
}

export default ProductsCarousel