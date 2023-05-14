import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row, Table } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { logout } from '../actions/userActions';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import { useNavigate, useParams } from 'react-router-dom';
import { PRODUCT_CREATE_RESET } from '../constants/productConstats';
import Paginate from '../components/Paginate';
import { useTranslation } from 'react-i18next';
const ProductListScreen = () => {
    const { t } = useTranslation();
    const { pageNumber } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productDelete = useSelector((state) => state.productDelete);
    const { success: deleted, error: deleteError, loading: deleteLoading, } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const { success: created, error: createError, loading: createLoading, product: createdProduct } = productCreate;

    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });
        if (!userInfo && !userInfo.isAdmin) {
            dispatch(logout());
            navigate('/login');
        }
        if (created) {
            navigate(`/admin/products/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts('', pageNumber));
        }
    }, [dispatch, userInfo, navigate, deleted, created, createdProduct, pageNumber]);

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
                    <Button className='my-3' variant='success' onClick={createProductHandler}>
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
                    <>
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
                                            <Button style={{ height: '100%' }} variant='outline-info' className='btn-sm' onClick={() => { navigate(`/admin/products/${product._id}/edit`); }}>
                                                <i className='fas fa-edit big' />
                                            </Button>

                                            <Button variant='outline-danger' className='btn-sm' onClick={() => { deleteHandler(product._id, product.name); }} >
                                                <i className='fas fa-trash big' />
                                            </Button>
                                        </td>
                                    </tr>
                                )) : ''}
                            </tbody>
                        </Table>
                        <Paginate pages={pages} page={page} isAdmin={true} /></>
                )}
        </>
    );
};

export default ProductListScreen;