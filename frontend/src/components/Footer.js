import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import i18n from "../i18n";

const Footer = () => {
  return (
    <>
      <Row className="text-center">
        <Col className="py-3">Copyright &copy; Websklep</Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Button
            onClick={() => i18n.changeLanguage("en")}
            variant="success"
            className="rounded btn-success english border border-successs"
          >
            {" "}
          </Button>
          <Button
            onClick={() => i18n.changeLanguage("pl")}
            variant="success"
            className="rounded btn-success polish border border-successs"
          >
            {" "}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
