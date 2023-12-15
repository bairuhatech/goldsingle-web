import { Button, Form, Modal, Rate, Input, message } from "antd";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../../style.scss";
import API from "../../../../config/API";
import { POST } from "../../../../utils/apiCalls";
import React from "react";

function AddReview(props: any) {
  const User = useSelector((state: any) => state.User.user);
  const [isLoading, seIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    const obj = {
      product_id: props?.data?._id,
      user_id: User.data?._id,
      message: values?.message,
      rating: values?.rating,
      userName: User.data?.username,
    };
    seIsLoading(true);
    const url = API.PRODUCT_REVIEW;
    try {
      const response: any = await POST(url, obj);
      if (response?.status) {
        props.close();
        await props?.getReviews();
        form.resetFields();
      }
    } catch (err) {
      messageApi.error("Something went wrong!");
    } finally {
      seIsLoading(false);
    }
  };

  let Content = () => {
    return (
      <Container fluid>
        <br />
        <div className="text-center fs-3 fw-bold">Leave a review</div>
        <div className="text-center review-modal-text">
          Your review will be posted pulicly on the app
        </div>
        <br />
        <Form onFinish={onFinish} form={form}>
          <div className="ProductDetailScreen-rateBox text-center">
            <Form.Item
              name={"rating"}
              rules={[{ required: true, message: "" }]}
            >
              <Rate tooltips={desc} value={0} style={{ fontSize: 40 }} />
            </Form.Item>
          </div>
          <Form.Item name={"message"} rules={[{ required: true, message: "" }]}>
            <Input.TextArea
              placeholder="Enter your review here . . . "
              rows={4}
              name="message"
            />
          </Form.Item>

          <br />
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
                onClick={() => form.submit()}
              >
                Done
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
      {contextHolder}
      <Content />
      <br />
    </Modal>
  );
}

export default AddReview;
