import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Row, Table } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { logout } from '../actions/userActions';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_CREATE_RESET } from '../constants/productConstats';

const ProductListScreen = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productDelete = useSelector((state) => state.productDelete);
    const { success: deleted, error: deleteError, loading: deleteLoading, } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const { success: created, error: createError, loading: createLoading, product: createdProduct } = productCreate;

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });
        if (!userInfo && !userInfo.isAdmin) {
            dispatch(logout());
            navigate('/login');
        }
        if (created) {
            navigate(`/admin/products/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts());
        }
    }, [dispatch, userInfo, navigate, deleted, created, createdProduct]);

    const deleteHandler = (id, name) => {
        if (window.confirm(`Confirm removing ${name}`)) {
            dispatch(deleteProduct(id));
        }
    };
    const createProductHandler = () => {
        dispatch(createProduct());
    };



    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-center'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'> </i> Create Product
                    </Button>
                </Col>
            </Row>
            {/* {deleted && <Message variant='success'>Successfully removed item</Message>} */}
            {deleteLoading && <Loader />}
            {deleteError && <Message variant='danger'>{deleteError}</Message>}
            {createLoading && <Loader />}
            {createError && <Message variant='danger'>{createError}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (
                    <Table striped bordered hover responsive className='table-sm ' >
                        <thead >
                            <tr >
                                {/* <th>ID</th> */}
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products ? products.map(product => (
                                <tr key={product._id}>
                                    {/* <td> <a href={`/products/${product._id}`}>{product._id} </a></td> */}
                                    <td> <a href={`/products/${product._id}`}>{product.name} </a></td>
                                    <td >{product.price}€</td>
                                    <td >{product.category}</td>
                                    <td >{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                            <Button variant='primary' className='btn-sm'>
                                                <i className='fas fa-edit big ' />
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => { deleteHandler(product._id, product.name); }} >
                                            <i className='fas fa-trash big' />
                                        </Button>
                                    </td>
                                </tr>
                            )) : ''}
                        </tbody>
                    </Table>
                )}
        </>
    );
};

export default ProductListScreen;