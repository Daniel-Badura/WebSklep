import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';




const CartScreen = () => {
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate();
    const quantity = location.search ? new URLSearchParams(location.search).get('qty') : 1;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart ? cart : [1];

    useEffect(() => {
        // if (!userInfo) { } else if ((!userInfo.isVerified)) { navigate('/profile/verify'); }
        if (id) {
            dispatch(addToCart(id, quantity));
        }
    }, [dispatch, id, quantity, userInfo, navigate]);

    const removeFromCartHandler = (id => {
        dispatch(removeFromCart(id));
    });
    const checkoutHandler = (id => {
        console.log('checkout');
    });

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty -
                        <Link to='/'>Return </Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroupItem key={item.product}>
                                <Row>
                                    <Col>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>€{item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as='select'
                                            value={item.quantity}
                                            onChange={(e) => dispatch(addToCart(item.product,
                                                Number(e.target.value)))}
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>))}

                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <i className='fas fa-trash'>Delete</i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}

                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>
                                Subtotal ({cartItems.reduce((accumulator, item) => accumulator + parseInt(item.quantity), 0)}) items
                            </h3>
                            €{cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroupItem>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Checkout
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;