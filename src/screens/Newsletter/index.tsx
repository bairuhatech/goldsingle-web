import { useEffect } from "react";
import SaleMessage from "../../components/saleMessage";
import SubscribeNewsletter from "../../components/subscribeNewsletter";
import PageHeader from "../../components/pageHeader";
import { Checkbox, Form, Input, Button } from "antd";
import { Col, Row } from "react-bootstrap";
import React from "react";

function Newsletter() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  function onFinish(values: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="Screen-box">
      <div>
        <SaleMessage />
      </div>
      <div className="ftscreen-fnt m-2">
        <PageHeader text="Newsletter" />
        <Row className="d-flex justify-content-center ftscreen-fnt m-2">
          <Col md={5} className="m-5">
            <Form onFinish={onFinish}>
              <h3 className="text-center mb-3">Subscribe now</h3>
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your First Name" },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your Last Name" },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please enter your Email" }]}
              >
                <Input type="email" placeholder="Enter email" />
              </Form.Item>
              <Form.Item
                name="subscribe"
                valuePropName="checked"
                initialValue={false}
              >
                <Checkbox>
                  Yes, I would like to receive special product / service offers
                  from GOLD BAZAR.
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-100">
                  SUBSCRIBE
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
      <div className="mt-5">
        <SubscribeNewsletter />
      </div>
    </div>
  );
}
export default Newsletter;
