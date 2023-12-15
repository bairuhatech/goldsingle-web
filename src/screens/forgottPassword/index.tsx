import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET } from "../../utils/apiCalls";
import API from "../../config/API";
import { Button, Form, Input, message } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import { BiErrorCircle } from "react-icons/bi";
import React from "react";

function ForgottPassword() {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [successmodal, setSuccessmodal] = useState(false);

  const ForgotPassword = async (val: any) => {
    try {
      setIsLoading(true);
      let url = API.REQUEST_RESET + val.email;
      var reqPasswordChange: any = await GET(url, null);
      if (reqPasswordChange.status) {
        setSuccessmodal(true);
        setIsLoading(false);
      } else {
        setError("Ooops something went wrong...!");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Ooops something went wrong...!");
    }
  };

  return (
    <div className="Screen-box">
      <br /> <br />
      <Container>
        <Row>
          <Col sm={4} xs={12}></Col>
          <Col sm={4} xs={12}>
            <h2 className="LoginScreen-txt1">Forgot Your Password ?</h2>
            <div className="LoginScreen-txt2">
              Please enter your email address to retrieve your password
            </div>
            <br />
            <div className="LoginScreen-box1">
              <Form onFinish={ForgotPassword}>
                <Form.Item
                  name={"email"}
                  rules={[{ required: true, message: "" }]}
                >
                  <Input size="large" placeholder="Enter Email" />
                </Form.Item>
                {error ? (
                  <div className="LoginScreen-errortxt">
                    <BiErrorCircle />
                    &nbsp;
                    {error} .Try again
                  </div>
                ) : null}
                <Row>
                  <Col sm={6} xs={12}></Col>
                  <Col sm={6} xs={12}>
                    <Button
                      loading={isLoading}
                      block
                      size="large"
                      type="primary"
                      htmlType="submit"
                    >
                      Send Request
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
            <br />
            <div
              className="LoginScreen-txt4"
              onClick={() => navigation("/login")}
            >
              Already have an account?{" "}
              <span className="LoginScreen-txt5">Login</span>
            </div>
          </Col>
          <Col sm={4} xs={12}></Col>
        </Row>
      </Container>
    </div>
  );
}
export default ForgottPassword;
