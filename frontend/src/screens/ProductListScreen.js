import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Row, Table } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { logout } from '../actions/userActions';
import { deleteProduct, listProducts } from '../actions/productActions';
import { useNavigate } from 'react-router-dom';

const ProductListScreen = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productDelete = useSelector((state) => state.productDelete);
    const { success: deleted, error: deleteError, loading: deleteLoading } = productDelete;

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts());
        } else {
            dispatch(logout());
            navigate('/login');
        }
    }, [dispatch, userInfo, navigate, deleted]);

    const deleteHandler = (id, name) => {
        if (window.confirm(`Confirm removing ${name}`)) {
            dispatch(deleteProduct(id));
        }
    };
    const createProductHandler = () => {
        //CREATE PRODUCT
    };



    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3 rounded' onClick={createProductHandler}>
                        <i className='fas fa-plus'> </i> Create Product
                    </Button>
                </Col>
            </Row>

            {deleteLoading && <Loader />}
            {deleteError && <Message variant='danger'>{error}</Message>}
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
                            </tr>
                        </thead>
                        <tbody>
                            {products ? products.map(product => (
                                <tr key={product._id}>
                                    {/* <td> <a href={`/products/${product._id}`}>{product._id} </a></td> */}
                                    <td >{product.name}</td>
                                    <td >{product.price}€</td>
                                    <td >{product.category}</td>
                                    <td >{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                            <Button variant='primary' className='btn-sm'>
                                                <i className='fas fa-edit' />
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => { deleteHandler(product._id, product.name); }} >
                                            <i className='fas fa-trash' />
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