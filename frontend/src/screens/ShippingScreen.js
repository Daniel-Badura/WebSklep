import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import Checkout from '../components/Checkout';


const ShippingScreen = () => {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const [invoice, setInvoice] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [vatNumber, setVatNumber] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country, companyName, vatNumber }));
        navigate('/payment');
    };

    return (
        <FormContainer>
            <Checkout step1 />
            <h1 className='text-center'>Shipping</h1>


            <Form onSubmit={submitHandler} >
                <Form.Label>Request Invoice{' '}
                    <Form.Check
                        id='invoice'
                        className='block'
                        type='checkbox'
                        checked={invoice}
                        onChange={(e) => setInvoice(e.target.checked)}
                    ></Form.Check>
                </Form.Label>
                {invoice && <>
                    <Form.Group controlId='companyName' className='pt-2'>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Company Name'
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='vatNumber' className='pt-2'>
                        <Form.Label>VAT Number</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='VAT Number'
                            value={vatNumber}
                            onChange={(e) => setVatNumber(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                </>
                }
                <Form.Group controlId='address' className='pt-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city' className='pt-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode' className='pt-2'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Postal Code'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='country' className='pt-2'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='text-center my-2 mx-auto d-block '>
                    Submit
                </Button>

            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;