import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import LanguageDropdown from "./LanguageDropdown";
import i18n from "../i18n";

const Footer = () => {
  return (
    <>
      <Row>
        <Col className="text-center">Copyright &copy; WebSklep</Col>
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
