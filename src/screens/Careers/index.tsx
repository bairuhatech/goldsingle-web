import React, { useEffect } from "react";
import "./styles.scss";
import { Row, Col, Card, Container } from "react-bootstrap";
import { Button, Form, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

function Careers() {
  const { Option } = Select;
  const navigation = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="m-0 mw-100 p-0">
      <div className="Careers-container mx-0">
        <Row className="mx-0 mw-100">
          <Col md={8} />
          <Col md={4} xs={12} className="Careers-navBar px-2 px-md-0 mx-0">
            <FaFacebook className="social-icon" />
            <RiTwitterXFill className="social-icon" />
            <FaInstagram className="social-icon" />
            <FaYoutube className="social-icon" />
            <FaLinkedin className="social-icon" />
          </Col>
        </Row>

        <Row className="mx-0">
          <Col md={3} />
          <Col md={6}>
            <div className="Careers-text-container text-white p-5  m-0 text-center ftscreen-fnt">
              <h5>Find the career of your dreams</h5>
              <h1 className="display-5">
                We're more than just a workplace. We're a family.
              </h1>
              <p className="fs-6">
                We know that finding a meaningful and rewarding job can be a
                long journey. Our goal is to make that process as easy as
                possible for you, and to create a work environment that's
                satisfying - one where you'll look forward to coming to every
                day. Start your journey with us by browsing available jobs.
              </p>
              <Button
                type="primary"
                size="large"
                className="rounded-pill px-5 mt-5 m-2"
                href=""
              >
                <strong>View Openings</strong>
              </Button>
            </div>
          </Col>
          <Col md={3} />
        </Row>
      </div>
      <div className="Screen-box">
        <div className="ftscreen-fnt m-2 ">
          <Row className="m-5 text-center">
            <h3>Join us at GOLD BAZAR</h3>
            <p className="fs-6">Current Openings</p>
          </Row>
          <Row className="align-items-right">
            <Col xs={6} md={10}></Col>
            <Col xs={6} md={2}>
              <Form layout="inline">
                <Form.Item label="Filter By" name="filter" className="mr-2">
                  <Select placeholder="Select" style={{ width: "100px" }}>
                    <Option value="all">All</Option>
                    <Option value="fulltime">Full Time</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <hr />
          <Row>
            <Row gutter={16}>
              <Col span={8}>
                <Card title="Card title">Card content</Card>
              </Col>
              <Col span={8}>
                <Card title="Card title">Card content</Card>
              </Col>
              <Col span={8}>
                <Card title="Card title">Card content</Card>
              </Col>
            </Row>
          </Row>
        </div>
      </div>
    </Container>
  );
}

export default Careers;
