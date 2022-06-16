import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { userDetailsAction, userUpdateAction } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_RESET } from '../constants/userConstants'

 const EditUserScreen = () => {

    const {id} = useParams()

    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, user, error} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading:loadingUpdate, success:successUpdate, error:errorUpdate} = userUpdate

    const navigate = useNavigate()

    useEffect(() => {
        if (successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/userslist')
        } else {
            if (!user.name || user._id !== id) {
                dispatch(userDetailsAction(id))
              } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
              }
        }
      
    }, [dispatch, user, id, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userUpdateAction({
            _id: id, name, email, password, isAdmin
        }))
       
    }

  return (
    <>
    <Link to='/admin/userslist' className='btn btn-light my-3'>
        Go Back
    </Link>
    <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader />
         : ( error ? <Message variant='danger'>{error}</Message>
          : (
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter Name' value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email}
                onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password}
                onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
                <Form.Check type='checkbox' label='Is Admin' checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
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

export default EditUserScreen