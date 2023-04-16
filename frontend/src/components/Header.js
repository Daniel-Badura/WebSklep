import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';



const Header = () => {
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header >
            <Navbar bg="dark" variant='dark' expand="md" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>WebSklep</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" variant="success" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link ><i className='fas fa-shopping-cart' />Cart</Nav.Link>
                            </LinkContainer>
                            {/* ADMIN MENU:  */}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='ADMIN' id='username'>
                                    <LinkContainer to='/admin/users/list'>
                                        <NavDropdown.Item>
                                            Users List
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/products/list'>
                                        <NavDropdown.Item>
                                            Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orders/list'>
                                        <NavDropdown.Item>
                                            Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    {!userInfo.isVerified &&
                                        <LinkContainer to='/profile/verify'>
                                            <NavDropdown.Item>
                                                Email Verification
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    }
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/profile/orders'>
                                        <NavDropdown.Item>
                                            My Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>

                                </NavDropdown>

                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link ><i className='fas fa-user' />Sign in</Nav.Link>
                                </LinkContainer>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;