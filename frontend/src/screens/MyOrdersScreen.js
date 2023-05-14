import React, { useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getMyOrders } from '../actions/orderActions';
import { useTranslation } from 'react-i18next';


const MyOrdersScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderMyOrders = useSelector((state) => state.orderMyOrders);
    const { loading: loadingMyOrders, error: errorMyOrders, orders } = orderMyOrders;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch(getMyOrders());
        if (!userInfo) {
            navigate('/login');
        }
    }, [userInfo, dispatch, navigate]);

    return (
        <>
            <Row>
                <Col>
                    <h2>
                        My Orders
                    </h2>
                    {loadingMyOrders
                        ? <Loader />
                        : errorMyOrders
                            ? <Message variant='danger'>{errorMyOrders}</Message>
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
                                                <td>{order.totalPrice}</td>
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
                                                            ? order.deliveryDate.substring(0, 10)
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

export default MyOrdersScreen;