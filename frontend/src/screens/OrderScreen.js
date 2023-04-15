import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, Image, ListGroup, Col, Row, Button } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstatns';
import Message from '../components/Message';
import Loader from '../components/Loader';


const OrderScreen = () => {
    const navigate = useNavigate();
    const { id: orderId } = useParams();
    const dispatch = useDispatch();
    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
        // PAYPAL SCRIPT FETCH AND ADD DYNAMICALLY
        // eslint-disable-next-line
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();

            } else {
                setSdkReady(true);
            }
        }
        // dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId, successPay, sdkReady, loadingPay, order, navigate, userInfo]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder({ orderId, paymentResult }));
    };


    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
        {!order.isPaid && <Message variant='success'>
            <p>To pay for these totally real items, use this totally real paypal account:</p>
            Email ID: sb-av4u217215769@personal.example.com<br />
            Password: 1qaz2wsx
        </Message>}
        <h1>Order {order.orderNumber}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>
                            Shipping
                        </h2>
                        <p> <strong>Name: </strong> {order.user.name + ' ' + order.user.lastname}</p>
                        <p>Email: <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>
                                Address: {' '}
                            </strong>

                            {order.shippingAddress.address},
                            {order.shippingAddress.city}, {' '}
                            {order.shippingAddress.postalCode}, {' '}
                            {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant='success'>Delivered : {order.deliveryDate}</Message> : <Message variant='warning'>Not Delivered</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: {' '}</strong>
                        {order.paymentMethod}
                        {order.isPaid ? <Message variant='success'>Paid : {order.paymentDate}</Message> : <Message variant='warning'>Not Paid</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message>Your order is empty</Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
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
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>€{order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>€{order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>€{order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>€{order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />
                                )}
                            </ListGroup.Item>
                        )}
                        {/* {loadingDeliver && <Loader />} */}
                        {userInfo &&
                            userInfo.isAdmin &&
                            order.isPaid &&
                            // !order.isDelivered && 
                            (
                                <ListGroup.Item>
                                    <Button
                                        type='button'
                                        className='btn btn-block'
                                    // onClick={deliverHandler}
                                    >
                                        Mark As Delivered
                                    </Button>
                                </ListGroup.Item>
                            )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>;
};

export default OrderScreen;