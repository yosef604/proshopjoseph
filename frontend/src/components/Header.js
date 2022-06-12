import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Nav, Navbar, Container, NavDropdown}  from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../actions/userActions'

const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler = () => {
    dispatch(logoutAction())
  }
  return (
    <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to={'/'}>
              <Navbar.Brand>ProShop</Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">

              <Nav className="ms-auto">
                <LinkContainer to={'/cart'}>
                  <Nav.Link href="/cart"> <i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                </LinkContainer>

                {userInfo ? 
                (<NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>) : (
                  <LinkContainer to={'/login'}>
                  <Nav.Link href="/login"> <i className='fas fa-user'></i> Sign in</Nav.Link>
                </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  )
}

export default Header