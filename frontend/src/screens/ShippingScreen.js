import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddressAction } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'

const ShippingScreen = () => {

    const navigate = useNavigate()
    
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalcode, setPostalcode] = useState(shippingAddress.postalcode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddressAction({
            address, city, postalcode, country
        }))
        navigate('/payment')
    }
  return (
    <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='Enter Addresss'
                onChange={(e) => setAddress(e.target.value)} 
                required value={address}></Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder='Enter City'
                onChange={(e) => setCity(e.target.value)}
                required value={city}></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalcode'>
                <Form.Label>Postalcode</Form.Label>
                <Form.Control type='text' placeholder='Enter Postalcode'
                onChange={(e) => setPostalcode(e.target.value)}
                required value={postalcode}></Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' placeholder='Enter Country'
                onChange={(e) => setCountry(e.target.value)}
                required value={country}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen