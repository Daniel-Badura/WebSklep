import React from "react";
import { Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { LinkContainer } from "react-router-bootstrap";

const Checkout = ({ step1, step2, step3 }) => {
  const { t } = useTranslation();
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>{t("checkout.shipping")}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{t("checkout.shipping")}</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/payment">
            <Nav.Link>{t("checkout.payment")}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{t("checkout.payment")}</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>{t("checkout.placeOrder")}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{t("checkout.placeOrder")}</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default Checkout;
