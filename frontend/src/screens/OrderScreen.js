import React, { useEffect } from 'react';
import { Card, Image, ListGroup, Col, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import { getOrderDetails } from '../actions/orderActions';
import Loader from '../components/Loader';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId]);


    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
        <h1>Order {order._id}</h1>
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
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>;
};

export default OrderScreen;