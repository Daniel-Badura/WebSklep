import React, { useState, useEffect, } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserDetails } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';




const ProfileScreen = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [newPassword, setNewPassword] = useState('');

    const userDetails = useSelector(state => state.userDetails);
    const { loading, user } = userDetails;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo, error } = userLogin;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    let { success } = userUpdateProfile;

    const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '/login';

    useEffect(() => {
        if (!userInfo) {
            navigate(redirect);
        } else {
            if (!userInfo.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails('profile'));
            } else {
                setName(userInfo.name);
                setLastname(userInfo.lastname);
                setPhone(userInfo.phone);
                setEmail(userInfo.email);
            }
        }
    }, [navigate, user, redirect, userInfo, dispatch, success]);
    const submitHandler = (e) => {
        success = null;
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(updateUserDetails({ id: userInfo._id, name, lastname, email, phone, password, newPassword }));
        }

    };
    return (
        <Row><Col md={3}>
            <h2>
                Update Profile
            </h2>
            {message && <Message variant='danger'> {message} </Message>}
            {success && <Message variant='success'>Profile successfully updated </Message>}
            {error && error.split(',').map(errorMessage => <Message key={errorMessage} variant='danger'> {errorMessage.trim().replace('Path ', '')} </Message>)}
            {/* {error && <Message variant='danger'> {error} </Message>} */}
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='pt-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='lastname' className='pt-2'>
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Lastname'
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='pt-2'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='phone' className='pt-2'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type='tel'
                        placeholder='Phone #'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* {user.isAdmin ?
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

                <Form.Group controlId='password' className='pt-2'>
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword' className='pt-2'>
                    <Form.Label> New Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmNewPassword' className='pt-2'>
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='text-center my-2'>
                    Update
                </Button>
            </Form>
        </Col>
            <Col md={9}>
                <h2> My Orders </h2>
            </Col>
        </Row >
    );
};

export default ProfileScreen;