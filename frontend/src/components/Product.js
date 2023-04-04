import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from '../components/Rating';

const Product = ({ product }) => {

    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const hover = isHovered ? 'p-1' : 'p-4';
    return (
        <>
            <Card className={`rounded highlight my-3 ${hover}`} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
                <Link to={`/product/${product._id}`}>
                    <Card.Img className='rounded' src={product.image} variant='top' />
                </Link>
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title className='text-center card-title enlarge' as='div'>
                            <strong className='fw-bold'>{product.name}</strong>
                        </Card.Title>
                    </Link>
                    <Card.Text className='enlarge move-right' as='div'>
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews}`}
                        >

                        </Rating>
                    </Card.Text>
                    <Card.Text as='h3' className='enlarge move-right'>€{product.price}
                    </Card.Text>
                </Card.Body>

            </Card>
        </>
    );
};

export default Product;