import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { Row, Col } from "react-bootstrap";
import { BiErrorCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../redux/slices/userSlice";

import API from "../../config/API";
import { POST } from "../../utils/apiCalls";
import React from "react";

function EmailLogin() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const LoginEmail = async (values: any) => {
    try {
      setIsLoading(true);
      let url = API.LOGIN_EMAIL;
      let body = {
        email: values.username,
        password: values.password,
      };
      var loginRes: any = await POST(url, body);
      if (loginRes.status) {
        message.success("Login Sucessful");
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
    <div>
      <div className="LoginScreen-txt2">
        Enter your email and we’ll check for you.
      </div>
      <br />
      <Form onFinish={LoginEmail}>
        <Form.Item name={"username"} rules={[{ required: true, message: "" }]}>
          <Input size="large" placeholder="Enter your Email" />
        </Form.Item>
        <Form.Item name={"password"} rules={[{ required: true, message: "" }]}>
          <Input.Password size="large" placeholder="Enter Password" />
        </Form.Item>
        {error ? (
          <div className="LoginScreen-errortxt">
            <BiErrorCircle />
            &nbsp;
            {error} .Try again
          </div>
        ) : null}
        <Row>
          <Col sm={6} xs={12}>
            <div
              className="LoginScreen-txt3"
              onClick={() => navigation("/forgott")}
            >
              Forgott password ?
            </div>
          </Col>
          <Col sm={6} xs={12}>
            <Button
              loading={isLoading}
              block
              size="large"
              type="primary"
              htmlType="submit"
              style={{ height: 45 }}
            >
              Login
            </Button>
          </Col>
        </Row>
      </Form>
      <hr />
    </div>
  );
}
export default EmailLogin;
