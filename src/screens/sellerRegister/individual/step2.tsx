import { Row, Col, Button, Tag } from "antd";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function IndividualStep2({ loading, goBack }: any) {
  const navigation = useNavigate();

  return (
    <div>
      <h5 className="">Application Submitted</h5>
      <br />
      <div className="sellerRegister-text2 mb-3">
        You have Successfully registered as an Individual seller on GOLD BAZAR! We
        will verify your application and get back to you
      </div>

      <Row className="mb-3">
        <Col sm={6} xs={12}>
          <Button block size="large" onClick={() => goBack()}>
            Go Back
          </Button>
        </Col>
        <Col sm={6} xs={12} className="px-3">
          <Button
            type="primary"
            block
            size="large"
            onClick={() => navigation(-1)}
          >
            Login
          </Button>
        </Col>
      </Row>
    </div>
  );
}
export default IndividualStep2;
