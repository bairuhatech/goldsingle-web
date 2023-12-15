import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";
import SuccessModal from "../../components/successModal";
import { BiErrorCircle } from "react-icons/bi";
import "./styles.scss";

import { POST } from "../../utils/apiCalls";
import API from "../../config/API";
import { login } from "../../redux/slices/userSlice";

import Country from "../../config/countryCode.json";
import { InputOTP } from "antd-input-otp";

import { Auth } from "../../config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import SummaryCard from "./summaryCard";
import GmailLogin from "../loginScreens/gmailLogin";
import React from "react";

function SignupScreen() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [successmodal, setSuccessmodal] = useState(false);

  const [datas, setdatas] = useState<any>({});
  const [verification, setverification] = useState(false);
  const [autho, setautho] = useState<any>(null);

  const LoginPhone = async (values: any) => {
    try {
      setdatas(values);
      setIsLoading(true);
      let recaptchas = await new RecaptchaVerifier(Auth, "recaptcha", {});
      let phone = `${values.code}${values.phone}`;
      let checkPhone: any = await signInWithPhoneNumber(
        Auth,
        phone,
        recaptchas
      );
      if (checkPhone?.verificationId) {
        setautho(checkPhone);
        setverification(true);
      } else {
        setError("Somehting went wrong");
      }
      setIsLoading(false);
    } catch (err) {
      setverification(false);
      console.log("LoginPhone = = = >", err);
      setIsLoading(false);
      setError("Somehting went wrong");
    }
  };

  const verifyOtp = async (values: any) => {
    try {
      setIsLoading(true);
      let otp = values.otp.join("");
      let verify = await autho.confirm(otp);
      if (verify?.user?.phoneNumber) {
        Signup();
      }
    } catch (err) {
      setIsLoading(false);
      setError("Somehting went wrong");
      console.log("verifyOtp err", err);
    }
  };

  const Signup = async () => {
    try {
      let url = API.SIGNUP;
      let body = {
        email: datas.email,
        username: datas.username,
        password: datas.password,
        first_name: datas?.firstname,
        last_name: datas?.lastname,
        name: `${datas?.firstname} ${datas?.lastname}`,
        countrycode: datas?.code,
        phone: datas?.phone,
        image: null,
        type: "user",
        phone_verify: true,
      };
      var signupRes: any = await POST(url, body);
      if (signupRes.status) {
        dispatch(login(signupRes));
        setSuccessmodal(true);
        setTimeout(() => {
          setSuccessmodal(false);
          window.location.replace("/home");
        }, 5000);
        setIsLoading(false);
      } else {
        setError(signupRes.message);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
      setIsLoading(false);
    }
  };

  const prefixSelector = (
    <Form.Item name="code" noStyle>
      <Select style={{ width: 85 }} size="large" showSearch={true}>
        {Country.map((item: any) => {
          return (
            <Select.Option key={item.dial_code} value={item.dial_code}>
              {item.dial_code}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );

  return (
    <div className="Screen-box">
      <br /> <br />
      <h2 className="signupScreen-txt1">Create your account</h2>
      <div className="signupScreen-txt2">
        Please enter the following details to signup to your account
      </div>
      <Container>
        <Row>
          <Col sm={4} xs={12}></Col>
          <Col sm={4} xs={12}>
            <div className="LoginScreen-box1">
              {verification ? (
                <>
                  <SummaryCard data={datas} />
                  <div className="signupScreen-txt2">
                    Enter OTP send to your mobile number
                  </div>
                  <Form onFinish={verifyOtp}>
                    <Form.Item
                      name="otp"
                      rules={[
                        {
                          required: true,
                          message: "Input 6 digit verification code !",
                        },
                      ]}
                    >
                      <InputOTP autoFocus inputType="numeric" length={6} />
                    </Form.Item>
                    {error ? (
                      <div className="signupScreen-errortxt">
                        <BiErrorCircle /> &nbsp;
                        {error} .Try again
                      </div>
                    ) : null}
                    <Button
                      block
                      type="primary"
                      size="large"
                      htmlType="submit"
                      loading={isLoading}
                      style={{ height: 45 }}
                    >
                      Verify
                    </Button>
                  </Form>
                </>
              ) : (
                <>
                  <div className="signupScreen-txt2">
                    Enter your Email and and Phone Number
                  </div>
                  <br />
                  <Form
                    onFinish={LoginPhone}
                    initialValues={{ code: "+91" }}
                    layout="vertical"
                  >
                    <Row>
                      <Col sm={6} xs={6}>
                        <Form.Item
                          name={"firstname"}
                          rules={[
                            {
                              required: true,
                              message: "Please enter firstname",
                            },
                          ]}
                        >
                          <Input placeholder="First Name" size="large" />
                        </Form.Item>
                      </Col>
                      <Col sm={6} xs={6}>
                        <Form.Item
                          name={"lastname"}
                          rules={[
                            {
                              required: true,
                              message: "Please enter lastname",
                            },
                          ]}
                        >
                          <Input placeholder="Last Name" size="large" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number",
                        },
                      ]}
                    >
                      <Input
                        addonBefore={prefixSelector}
                        style={{ width: "100%" }}
                        size="large"
                        placeholder="Enter Phone Number"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onKeyPress={(e) => {
                          const isNumber = /^[0-9]*$/;
                          if (!isNumber.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name={"email"}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your email id",
                        },
                        {
                          type: "email",
                          message: "Please enter valid email id",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Email Address" size="large" />
                    </Form.Item>
                    <Form.Item
                      name={"username"}
                      rules={[
                        { required: true, message: "Please enter username" },
                      ]}
                    >
                      <Input placeholder="User name Eg:Jhon@123" size="large" />
                    </Form.Item>

                    <Form.Item
                      name={"password"}
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        {
                          min: 8,
                          message: "Password must be minimum 8 characters.",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        size="large"
                        placeholder="Enter Password"
                      />
                    </Form.Item>
                    <Form.Item
                      name={"confirm"}
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The new password that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                      dependencies={["password"]}
                      hasFeedback
                    >
                      <Input.Password
                        size="large"
                        placeholder="Confirm Password"
                      />
                    </Form.Item>
                    {error ? (
                      <div className="signupScreen-errortxt">
                        <BiErrorCircle /> &nbsp;
                        {error} .Try again
                      </div>
                    ) : null}
                    <div id="recaptcha"></div>
                    <Button
                      block
                      type="primary"
                      size="large"
                      htmlType="submit"
                      loading={isLoading}
                      style={{ height: 45 }}
                    >
                      Create Account
                    </Button>
                  </Form>
                </>
              )}
              <br />
              <GmailLogin
                closeModal={() => setSuccessmodal(false)}
                openModal={() => setSuccessmodal(true)}
              />
              <br />
              <div
                className="signupScreen-txt4"
                onClick={() => navigation("/login")}
              >
                Already have an account?{" "}
                <span className="signupScreen-txt5">Login</span>
              </div>
            </div>
          </Col>
          <Col sm={4} xs={12}></Col>
        </Row>
      </Container>
      <br />
      <br />
      {successmodal ? (
        <SuccessModal
          visible={successmodal}
          onCancel={() => setSuccessmodal(false)}
          title="success"
          body="Account created successfully"
          onButtonClick={() => setSuccessmodal(false)}
          buttonText="Go Back"
        />
      ) : null}
    </div>
  );
}
export default SignupScreen;
