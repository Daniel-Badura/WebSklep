import React, { useState, useEffect, } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstats';
import { listProductDetails, updateProduct } from '../actions/productActions';
import axios from 'axios';
import { useTranslation } from 'react-i18next';



const EditProductScreen = () => {
    const { t } = useTranslation();
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
    const [uploading, setUploading] = useState('');
    const [featured, setFeatured] = useState('');



    const [message, setMessage] = useState(null);

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

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
                setBrand(product.brand);
                setDescription(product.description);
                setCategory(product.category);
                setCountInStock(product.countInStock);
            }
        }
        setMessage(null);
    }, [dispatch, product, productId, navigate, successUpdate]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            description,
            category,
            countInStock,
            featured
        }));
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,

                }
            };
            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    return (
        <>
            <Link to='/admin/products/list' className='btn btn-light my-3' >
                {t('editProductScreen.return')}
            </Link>
            <FormContainer>
                <h1>
                    {t('editProductScreen.editProduct')}
                </h1>
                {message && <Message variant='danger'> {message} </Message>}
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'> {errorUpdate} </Message>}
                { }
                {error && error.split(',').map(errorMessage => <Message key={errorMessage} variant='danger'> {errorMessage.trim().replace('Path ', '')} </Message>)}
                {loading ? <Loader /> :
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className='pt-2'>
                            <Form.Label>{t('name')}</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price' className='pt-2'>
                            <Form.Label>{t('price')}</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category' className='pt-2'>
                            <Form.Label>{t('category')}</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description' className='pt-2'>
                            <Form.Label>{t('description')}</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='brand' className='pt-2'>
                            <Form.Label>{t('brand')}</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='image' className='pt-2'>
                            <Form.Label>{t('image')}</Form.Label>
                            <Form.Control
                                type='string'
                                placeholder='Image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.Control
                                type='file'
                                label='Choose File'
                                onChange={uploadFileHandler}
                            >
                            </Form.Control>
                            {uploading && <Loader />}
                        </Form.Group>
                        <Form.Group controlId='countInStock' className='pt-2'>
                            <Form.Label>{t('countInStock')}</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='CountInStock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='featured' className='pt-2'>
                            <Form.Check
                                type='checkbox'
                                label='Featured'
                                checked={featured}
                                onChange={(e) => setFeatured(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>
                        <Button type='submit' variant='primary' className='text-center my-2'>
                            {t('update')}
                        </Button>
                    </Form>
                }

            </FormContainer >
        </>
    );
};

export default EditProductScreen;