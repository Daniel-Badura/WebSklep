import React, { useState, useEffect, } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
// import { getProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstats';
import { listProductDetails } from '../actions/productActions';



const EditProductScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: productId } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');



    const [message, setMessage] = useState(null);


    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            navigate('/admin/products/list');
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.category);
                setDescription(product.description);
                setCategory(product.category);
                setCountInStock(product.category);
            }
        }
        setMessage(null);
    }, [dispatch, product, productId, navigate, successUpdate]);
    const submitHandler = (e) => {
        e.preventDefault();
        // Update product
    };
    return (
        <>
            <Link to='/admin/products/list' className='btn btn-light my-3' >
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

                        <Form.Group controlId='price' className='pt-2'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category' className='pt-2'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description' className='pt-2'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='brand' className='pt-2'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='image' className='pt-2'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='string'
                                placeholder='Image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='countInStock' className='pt-2'>
                            <Form.Label>CountInStock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='CountInStock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
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