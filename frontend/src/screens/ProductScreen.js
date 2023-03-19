import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Row, Col, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';


const ProductScreen = () => {
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const { id } = useParams();

    useEffect(() => {
        dispatch(listProductDetails(id));
    }, [dispatch]);

    return (
        <>
            <Link className='btn btn-warning my-3' to='/'>
                Return
            </Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                    text={product.numReviews}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: €{product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>
                                                €{product.price}
                                            </strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>
                                                {product.countInStock > 0
                                                    ? 'In Stock'
                                                    : 'Out of Stock'}
                                            </strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        className=
                                        {
                                            product.countInStock > 0
                                                ? 'btn-success'
                                                : 'btn-danger'
                                        }
                                        type='button'
                                        disabled={
                                            product.countInStock < 1
                                        }>
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>

            )}

        </>
    );
};

export default ProductScreen;