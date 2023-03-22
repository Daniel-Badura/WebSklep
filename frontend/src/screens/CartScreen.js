import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions';




const CartScreen = ({ history }) => {
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const quantity = location.search ? new URLSearchParams(location.search).get('qty') : 1;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, quantity));
        }
    }, [dispatch, id, quantity]);
    return (
        <div>Cart</div>
    );
};

export default CartScreen;