import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { userDetailsAction, userUpdateAction } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { listProductAction, listProductDetailsAction } from '../actions/productActions'

 const EditProductScreen = () => {

    const {id} = useParams()

    const[name, setName] = useState('')
    const[price, setPrice] = useState(0)
    const[image, setImage] = useState('')
    const[brand, setBrand] = useState('')
    const[category, setCategory] = useState('')
    const[countInStock, setCountInStock] = useState(0)
    const[description, setDescription] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, product, error} = productDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading:loadingUpdate, success:successUpdate, error:errorUpdate} = userUpdate

    const navigate = useNavigate()

    useEffect(() => {

        if (!product.name || product._id !== id) {
            dispatch(listProductDetailsAction(id))
            } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.isAdmin)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
            }
        
    }, [dispatch, product, id])

    const submitHandler = (e) => {
        e.preventDefault()
    //
       
    }

  return (
    <>
    <Link to='/admin/productslist' className='btn btn-light my-3'>
        Go Back
    </Link>
    <FormContainer>
        <h1>Edit Product</h1>
        {/* {loadingUpdate && <Loader />} */}
        {/* {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
        {loading ? <Loader />
         : ( error ? <Message variant='danger'>{error}</Message>
          : (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter Name' value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control type='number' placeholder='Enter price' value={price}
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control type='text' placeholder='Enter Image URL' value={image}
                onChange={(e) => setImage(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control type='number' placeholder='Enter Count In Stock' value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control type='text' placeholder='Enter Category ' value={category}
                onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' placeholder='Enter Description ' value={description}
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Update
            </Button>
        </Form>
          )
        )}
       
    </FormContainer>
    </>
  )
}

export default EditProductScreen