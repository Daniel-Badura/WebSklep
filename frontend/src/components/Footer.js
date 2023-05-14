import React from "react";
import { Col, Row } from "react-bootstrap";
import LanguageDropdown from "./LanguageDropdown";

const Footer = () => {
  return (
    <Row>
      <Col className="text-right py-3">Copyright &copy; WebSklep</Col>
      <Col>
        <LanguageDropdown />
      </Col>
    </Row>
  );
};

export default Footer;
