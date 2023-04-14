import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Checkout from '../components/Checkout';
import { savePaymentMethod } from '../actions/cartActions';


const PaymentScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        navigate('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <FormContainer>
            <Checkout step1 step2 step3 />
            <h1 className='text-center'>Payment Method</h1>

            <Form onSubmit={submitHandler} >
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>

                    <Col>
                        <Form.Check
                            type='radio'
                            label='CreditCard'
                            id='CreditCard'
                            name='paymentMethod'
                            value='CreditCard'
                            checked
                            onChange={(element) => setPaymentMethod(element.target.value)}>
                        </Form.Check>
                        {/* <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            onChange={(element) => setPaymentMethod(element.target.value)}>
                        </Form.Check> */}
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary' className='text-center my-2 mx-auto d-block '>
                    Continue
                </Button>

            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;