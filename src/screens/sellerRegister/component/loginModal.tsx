import { Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Container, Row, Col } from "react-bootstrap";
import { Form, Input, Button, message } from "antd";
import { BiErrorCircle } from "react-icons/bi";
import API from "../../../config/API";
import { POST } from "../../../utils/apiCalls";
import { login } from "../../../redux/slices/userSlice";
import React from "react";

const SellerLoginModal = (props: any) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state: any) => state.User);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const LoginNow = async (values: any) => {
    try {
      setIsLoading(true);
      let url = API.LOGIN_EMAIL;
      let body = {
        email: values.username,
        password: values.password,
      };
      var loginRes: any = await POST(url, body);
      if (loginRes.status) {
        message.success(loginRes.message);
        dispatch(login(loginRes));
        window.location.replace("/home");
        setIsLoading(false);
      } else {
        setError(loginRes.message);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError("Somehting went wrong");
    }
  };

  return (
    <Modal open={props.open} onCancel={props.onCancel} footer={false}>
      <div className="loginMaodal-Screen-box">
        <Container>
          <Row>
            <br />
            <br />
            <h2 className="LoginScreen-txt1">Seller Login</h2>
            <div className="LoginScreen-box1">
              <Form onFinish={LoginNow}>
                <Form.Item
                  name={"username"}
                  rules={[{ required: true, message: "" }]}
                >
                  <Input size="large" placeholder="Enter Email or Username" />
                </Form.Item>
                <Form.Item
                  name={"password"}
                  rules={[{ required: true, message: "" }]}
                >
                  <Input.Password size="large" placeholder="Enter Password" />
                </Form.Item>
                {error ? (
                  <div className="LoginScreen-errortxt">
                    <BiErrorCircle />
                    &nbsp;
                    {error} .Try again
                  </div>
                ) : null}
                <Button
                  loading={isLoading}
                  block
                  size="large"
                  type="primary"
                  htmlType="submit"
                >
                  Login
                </Button>
              </Form>
            </div>
          </Row>
        </Container>
      </div>
    </Modal>
  );
};
export default SellerLoginModal;
