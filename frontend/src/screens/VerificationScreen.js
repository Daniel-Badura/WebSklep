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
    const { loading, error, userInfo } = userLogin;
    const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '/login';
    const id = userInfo._id;

    useEffect(() => {
        if (!userInfo) {
            // console.log(user);
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);



    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(verifyEmail({ verificationCode, id }));
    };
    return (
        <FormContainer>
            <h1>
                Verify Email Address:
            </h1>
            {error && <Message variant='danger'> {error} </Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
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
            {/* <Row className='py-2'>
                <Col>

                    <Link to={redirect ? `/profile/?redirect=${redirect}` : '/profile/'}>
                        Profile
                    </Link>
                </Col>
            </Row> */}
        </FormContainer>
    );
};

export default VerificationScreen;