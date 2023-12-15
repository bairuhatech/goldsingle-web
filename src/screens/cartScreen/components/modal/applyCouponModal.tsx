import { Button, Form, Modal } from "antd";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import FloatLabel from "../../../../components/floatLabel";
import React from "react";

function ApplayCoupan(props: any) {
  const User = useSelector((state: any) => state.User);
  const [isLoading, seIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let Content = () => {
    return (
      <Container fluid>
        <br />
        <div className="CartScreen-edittxt1">Coupon code</div>
        <div className="CartScreen-edittxt2">
          Applay Coupon code get discount
        </div>
        <br />
        <Form

        //   initialValues={{
        //     code: props.coupan.code,
        //   }}
        >
          <Form.Item name={"code"} rules={[{ required: true, message: "" }]}>
            <FloatLabel
              label="Enter Coupon here"
              placeholder="Enter Coupon here"
              name="code"
            />
          </Form.Item>
          {error ? error : null}
          <Row>
            <Col sm="6" xs="6">
              <Button
                style={{ height: 49 }}
                size="large"
                block
                onClick={() => props.close()}
              >
                Cancel
              </Button>
            </Col>
            <Col sm="6" xs="6">
              <Button
                style={{ height: 49 }}
                loading={isLoading}
                size="large"
                block
                type="primary"
                htmlType="submit"
              >
                Apply
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  };
  return (
    <Modal
      centered
      open={props.visible}
      onCancel={() => props.close()}
      closable={true}
      footer={false}
      width={400}
    >
      <Content />
      <br />
    </Modal>
  );
}

export default ApplayCoupan;
