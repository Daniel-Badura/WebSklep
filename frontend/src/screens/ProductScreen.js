import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Rating as Stars } from "react-simple-star-rating";
import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import { REVIEW_CREATE_RESET } from "../constants/productConstats";
import Meta from "../components/Meta";
import { useTranslation } from "react-i18next";

const ProductScreen = () => {
  const { t } = useTranslation();
  const { id: productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reviewCreate = useSelector((state) => state.reviewCreate);
  const {
    loading: loadingReview,
    success: successReview,
    error: errorReview,
  } = reviewCreate;

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (successReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: REVIEW_CREATE_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successReview]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, quantity));
    navigate("/cart");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };
  const ratingHandler = (rate) => {
    setRating(rate);
  };
  return (
    <>
      <Link className="btn btn-warning my-3 rounded" to="/">
        {t("return")}
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image className="rounded shadowed" src={product.image} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroup.Item>
                  <Rating value={product.rating} text={product.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>
                  {t("productScreen.price")}: €{product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  {t("productScreen.description")}: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>€{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? `${t("inStock")}: ${product.countInStock}`
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>{t("productScreen.quantity")}</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(element) =>
                              setQuantity(element.target.value)
                            }
                          >
                            {" "}
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className={
                        product.countInStock > 0
                          ? "btn-success "
                          : "btn-danger "
                      }
                      type="button"
                      disabled={product.countInStock < 1}
                    >
                      {t("productScreen.addToCart")}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="py-4">
            <Col md={6}>
              <h2>{t("productScreen.reviews")}</h2>
              {product.reviews.length === 0 && (
                <Message>{t("productScreen.noReviews")}</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col>
              <ListGroup.Item>
                <h2>{t("productScreen.writeReview")}</h2>
                {successReview && (
                  <Message variant="success">
                    {t("productScreen.reviewSubmitted")}
                  </Message>
                )}
                {loadingReview && <Loader />}
                {errorReview && (
                  <Message variant="danger">{errorReview}</Message>
                )}

                {userInfo && (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label> {t("rating")}</Form.Label>
                      {/* <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}> */}
                      <Stars onClick={ratingHandler} initialValue={rating} />
                      {/* </Form.Control> */}
                    </Form.Group>
                    <Form.Group controlId="rating">
                      <Form.Label>{t("productScreen.comment")}</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button className="my-3" type="submit" variant="success">
                      {t("submit")}
                    </Button>
                  </Form>
                )}
              </ListGroup.Item>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
