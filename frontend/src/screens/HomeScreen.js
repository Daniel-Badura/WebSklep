import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { useTranslation } from 'react-i18next';


const HomeScreen = () => {
    const { t } = useTranslation();
    const { keyword, pageNumber } = useParams();
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);



    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-success rounded'>
                Back
            </Link>}
            {
                loading
                    ? <Loader />
                    : error
                        ? (<Message variant='danger'>{error}</Message>)
                        : (<>
                            <Row>
                                {products.map((product) => (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3} className='align-items-stretch d-flex'>
                                        <Product product={product} />
                                    </Col>

                                ))}
                            </Row>
                            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                        </>
                        )
            }

        </>
    );
};

export default HomeScreen;