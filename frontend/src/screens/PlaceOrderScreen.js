import React, { useEffect } from 'react';
import { Card, Image, ListGroup, Col, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Checkout from '../components/Checkout';
import Message from '../components/Message';
import { createOrder } from '../actions/orderActions';
import { CART_RESET } from '../constants/cartConstants';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const decimalize = (number) => {
        return (Math.round(number * 100) / 100).toFixed(2);
    };
    const cart = useSelector(state => state.cart);
    cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2);
    cart.shippingPrice = decimalize(cart.itemsPrice > 100 ? 0 : 100);
    cart.taxPrice = decimalize(Number((0.23 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = decimalize(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice));

    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success: orderCreateSuccess, error } = orderCreate;

    useEffect(() => {
        if (orderCreateSuccess) {
            dispatch({ type: CART_RESET });
            navigate(`/order/${order._id}`);
        }
    }, [navigate, orderCreateSuccess, order, dispatch]);
    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }));

        // navigate(`/order/${order._id}`);
    };

    return (
        <>
            <Checkout step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Shipping
                            </h2>
                            <p>
                                <strong>
                                    Address: {' '}
                                </strong>

                                {cart.shippingAddress.address},
                                {cart.shippingAddress.city}, {' '}
                                {cart.shippingAddress.postalCode}, {' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: {' '}</strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link className='link' to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.quantity} x €{item.price} = €{item.quantity * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className='text-centered'>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>€{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>€{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>€{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>€{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {error && <ListGroup.Item><Message variant='danger'>{error}</Message></ListGroup.Item>}

                            <ListGroup.Item className='text-centered'>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Submit Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col >
            </Row >
        </>
    );
};

export default PlaceOrderScreen;