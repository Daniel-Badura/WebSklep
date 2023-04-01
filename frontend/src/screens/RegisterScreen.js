import React, { useState, useEffect, } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, FormCheck } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';



const RegisterScreen = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);


    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;
    const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '/login';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            setMessage(null);
            dispatch(register(name, lastname, email, password, phone, isAdmin));
        }

    };
    return (
        <FormContainer>
            <h1>
                Register
            </h1>
            {message && <Message variant='danger'> {message} </Message>}
            { }
            {error && error.split(',').map(errorMessage => <Message key={errorMessage} variant='danger'> {errorMessage.trim().replace('Path ', '')} </Message>)}
            {/* {error && <Message variant='danger'> {error} </Message>} */}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='py-1'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='lastname' className='py-1'>
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Lastname'
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='py-1'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='phone' className='py-1'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type='tel'
                        placeholder='Phone #'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* {userInfo.isAdmin ?
                    <Form.Group controlId='isAdmin'>
                        <Form.Label>is Admin?</Form.Label>
                        <Form.Check
                            type='checkbox'
                            placeholder='is Admin?'
                            value={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.value)}
                        ></Form.Check>
                    </Form.Group>
                    : {}
                } */}

                <Form.Group controlId='password' className='py-1'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword' className='py-1'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='text-center'>
                    Submit
                </Button>
            </Form>
            <Row className='py-1'>
                <Col>
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Have an account?{' '}
                    </Link>
                </Col>
            </Row>
        </FormContainer >
    );
};

export default RegisterScreen;