import React, { useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrdersList } from '../actions/orderActions';



const OrderListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderList = useSelector((state) => state.orderList);
    const { loading: loadingOrders, error: errorOrders, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch(getOrdersList());
        if (!userInfo) {
            navigate('/login');
        }
        console.log(orders);
    }, [userInfo, dispatch, navigate, orders]);

    return (
        <>
            <Row>
                <Col>
                    <h2>
                        All Orders
                    </h2>
                    {loadingOrders
                        ? <Loader />
                        : errorOrders
                            ? <Message variant='danger'>{errorOrders}</Message>
                            : (
                                <Table className='table-md text-centered' striped hover bordered responsive >
                                    <thead >
                                        <tr >
                                            <th>ID</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Paid</th>
                                            <th>Delivered</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.orderNumber}>
                                                <td>
                                                    <a href={`/order/${order._id}`}>{order.orderNumber} </a>
                                                </td>
                                                <td >{order.createdAt.substring(0, 10)}</td>
                                                <td>{order.totalPrice} €</td>
                                                <td >
                                                    {
                                                        order.isPaid
                                                            ? order.paymentDate.substring(0, 10)
                                                            : (<i className='fas fa-times red' />)
                                                    }
                                                </td>
                                                <td >
                                                    {
                                                        order.isDelivered
                                                            ? order.delivereyDate.substring(0, 10)
                                                            : (<i className='fas fa-times red' />)
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                </Col>
            </Row>
        </>
    );
};

export default OrderListScreen;