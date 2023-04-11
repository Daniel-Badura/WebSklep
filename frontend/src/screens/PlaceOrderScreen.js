import React, { useState } from 'react';
import { Form, Button, Card, Image, ListGroup, Col, Row, ListGroupItem } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import Checkout from '../components/Checkout';

const PlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart);
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
                                    Address:
                                </strong>
                                {cart.shippingAddress.address},
                                {cart.shippingAddress.city}, {' '}
                                {cart.shippingAddress.postalCode}, {' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method:</strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;