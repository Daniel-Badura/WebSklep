import React, { useState, useEffect, } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { verifyEmail } from '../actions/userActions';



const VerificationScreen = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [verificationCode, setPassword] = useState('');
    const userLogin = useSelector(state => state.userLogin);
    const { loading, userInfo } = userLogin;
    const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '/profile';
    const userVerifyEmail = useSelector(state => state.userVerifyEmail);


    useEffect(() => {
        if (!userInfo) {
            navigate(redirect);
        } else if (userInfo.isVerified) {
            navigate(redirect);
        }
        userVerifyEmail.error = null;
    }, [navigate, userInfo, redirect, userVerifyEmail]);



    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(verifyEmail({ verificationCode }));
    };
    return (
        <FormContainer>

            <h1>
                Verify Email Address:
            </h1>

            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='verification' className='py-2'>
                    <Form.Control
                        type='text'
                        placeholder='Email Verification Code'
                        value={verificationCode}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='text-center'>
                    Submit
                </Button>

            </Form>
            <div className='py-1'></div>
            {userVerifyEmail.error && <Message variant='danger'> {userVerifyEmail.error} </Message>}
        </FormContainer>
    );
};

export default VerificationScreen;