import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Image, ListGroup, Col, Row, Button } from "react-bootstrap";
import { deliverOrder, getOrderDetails } from "../actions/orderActions";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstatns";
import Message from "../components/Message";
import Loader from "../components/Loader";
import PaypalCheckoutButton from "../components/PaypalCheckoutButton";
import { useTranslation } from "react-i18next";
const OrderScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  useEffect(() => {
    if (order) {
      if (order.user._id !== userInfo._id) {
        if (!userInfo.isAdmin) {
          navigate("/profile/orders");
        }
      } else {
        if (!userInfo) {
          navigate("/login");
        }
      }
      if (!order || successPay || successDeliver || order._id !== orderId) {
        dispatch({ type: ORDER_PAY_RESET });
        dispatch({ type: ORDER_DELIVER_RESET });
        dispatch(getOrderDetails(orderId));
      }
    } else {
      dispatch(getOrderDetails(orderId));
    }
  }, [
    dispatch,
    orderId,
    successPay,
    navigate,
    userInfo,
    successDeliver,
    loadingDeliver,
    order,
  ]);

  const deliverHandler = () => {
    dispatch(deliverOrder(orderId));
    dispatch(getOrderDetails(orderId));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      {!order.isPaid && (
        <Message variant="success">
          <p>
            To pay for these totally real items, use this totally real paypal
            account:
          </p>
          Email ID: sb-av4u217215769@personal.example.com
          <br />
          Password: 1qaz2wsx
        </Message>
      )}
      <h1>Order {order.orderNumber}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{t("shipping")}</h2>
              <p>
                {" "}
                <strong>{t("fullName")}: </strong>{" "}
                {order.user.name + " " + order.user.lastname}
              </p>
              <p>
                {t("email")}:{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>{t("address")}: </strong>
                {order.shippingAddress.companyName},
                {order.shippingAddress.vatNumber},
                {order.shippingAddress.address},{order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  {t("delivered")} : {order.deliveryDate.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="warning">{t("notDelivered")}</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>{t("paymentMethod")}</h2>
              <strong>{t("method")}: </strong>
              {order.paymentMethod}
              {order.isPaid ? (
                <Message variant="success">
                  {t("paid")} : {order.paymentDate.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="warning">{t("notPaid")}</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>{t("orderScreen.orderItems")}</h2>
              {order.orderItems.length === 0 ? (
                <Message>{t("orderScreen.orderEmpty")}</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            className="link"
                            to={`/product/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x €{item.price} = €
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{t("orderScreen.orderSummary")}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>{t("items")}:</Col>
                  <Col>€{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>{t("shipping")}:</Col>
                  <Col>€{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>{t("tax")}:</Col>
                  <Col>€{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>{t("total")}:</Col>
                  <Col>€{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {
                    <PaypalCheckoutButton
                      amount={order.totalPrice}
                      currency={"EUR"}
                      orderId={order._id}
                    />
                  }
                </ListGroup.Item>
              )}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      {t("orderScreen.markDelivered")}
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
