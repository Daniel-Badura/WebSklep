import React, { useEffect, useState } from "react";
// import Loader from './Loader';
import Message from "./Message";
import { featuredProducts, topRatedProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductCarousel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [option, setOption] = useState("featured");

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  // const productFeatured = useSelector((state) => state.productFeatured);
  // const { loadingFeatured, errorFeatured, productsFeatured } = productFeatured;

  useEffect(() => {
    dispatch(topRatedProducts());
  }, [dispatch]);

  return loading ? (
    <></>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      {option === "featured" ? (
        <Button
          className="rounded btn-block"
          variant="outline-success"
          onClick={() => {
            dispatch(topRatedProducts());
            setOption("topRated");
          }}
        >
          {t("topRated")}
        </Button> ? (
          option === "topRated"
        ) : (
          <Button
            variant="outline-success"
            onClick={() => {
              dispatch(featuredProducts());
              setOption("Featured");
            }}
          >
            {t("featured")}
          </Button>
        )
      ) : (
        ""
      )}
      <Carousel pause="hover" className="bg-dark rounded">
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/products/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className="carousel-caption">
                <h2>
                  {product.name} ({product.price}€)
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ProductCarousel;
