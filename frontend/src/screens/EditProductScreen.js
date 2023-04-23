import React, { useState, useEffect, } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
// import { getProductDetails, updateProduct } from '../actions/userActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstats';



const EditProductScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: productId } = useParams();
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState(null);
    const [isVerified, setIsVerified] = useState(false);

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            navigate('/admin/users/list');
        } else {
            if (!user || user._id !== productId) {
                // dispatch(getProductDetails(productId));
            } else {
                setName(user.name);
                setLastname(user.lastname);
                setEmail(user.email);
                setPhone(user.phone);
                setIsAdmin(user.isAdmin);
                setIsVerified(user.isVerified);
            }
        }
        setMessage(null);
    }, [dispatch, user, productId, navigate, successUpdate]);
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(updateProduct({ _id: productId, name, lastname, email, phone, isAdmin }));
    };
    return (<>
        <Link to='/admin/users/list' className='btn btn-light my-3' >
            Return
        </Link>
        <FormContainer>
            <h1>
                Edit Product
            </h1>
            {message && <Message variant='danger'> {message} </Message>}
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'> {errorUpdate} </Message>}
            { }
            {error && error.split(',').map(errorMessage => <Message key={errorMessage} variant='danger'> {errorMessage.trim().replace('Path ', '')} </Message>)}
            {loading ? <Loader /> :
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
                    <Form.Group controlId='isAdmin' className='pt-2'>
                        <Form.Check
                            type='checkbox'
                            label='is Admin'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>
                    <Form.Group controlId='isVerified' className='pt-2'>
                        <Form.Check
                            type='checkbox'
                            label='is Verified'
                            checked={isVerified}
                            onChange={(e) => setIsVerified(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='text-center my-2'>
                        Update
                    </Button>
                </Form>
            }

        </FormContainer >
    </>
    );
};

export default EditProductScreen;