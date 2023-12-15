import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Select, message } from "antd";
import { BiErrorCircle } from "react-icons/bi";
import Country from "../../config/countryCode.json";
import { InputOTP } from "antd-input-otp";

import { Auth } from "../../config/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";

import API from "../../config/API";
import { POST } from "../../utils/apiCalls";

import { login } from "../../redux/slices/userSlice";
import React from "react";

function PhoneLogin() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [verification, setverification] = useState(false);
  const [autho, setautho] = useState<any>(null);
  const [data, setdata] = useState<any>({});
  const [error, setError] = useState<any>(null);

  const checkuser = async () => {
    try {
      let user: any = Auth.currentUser;
      if (user?.phoneNumber) {
        signOut(user);
      }
    } catch (err) {
      console.log("checkuser err", err);
    }
  };

  const LoginPhone = async (values: any) => {
    try {
      setdata(values);
      setIsLoading(true);
      checkuser();
      setError("");
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
      // window.location.reload();
    }
  };

  const verifyOtp = async (values: any) => {
    try {
      setIsLoading(true);
      let otp = values.otp.join("");
      let verify = await autho.confirm(otp);
      if (verify?.user?.phoneNumber) {
        PhoneLogin();
      }
    } catch (err) {
      setIsLoading(false);
      setError("Somehting went wrong");
      console.log("verifyOtp err", err);
    }
  };

  const PhoneLogin = async () => {
    try {
      setIsLoading(true);
      let url = API.LOGIN_PHONE;
      let body = {
        code: data?.code,
        phone: data?.phone,
      };
      var loginRes: any = await POST(url, body);
      if (loginRes.status) {
        message.success("Login Successful");
        dispatch(login(loginRes));
        window.location.replace("/home");
        setIsLoading(false);
      } else {
        setError(loginRes.message);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log("err", err);
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
    <div className="PhoneLogin">
      <div>
        <div className="LoginScreen-txt2">
          {verification
            ? "Enter OTP send to your mobile number"
            : "Enter your phone Number and we’ll check for you."}
        </div>
        <br />
        <Form
          onFinish={verification ? verifyOtp : LoginPhone}
          initialValues={{ code: "+91" }}
        >
          {verification ? (
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
          ) : (
            <>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{ width: "100%" }}
                  size="large"
                  placeholder="Enter Phone Number"
                  type="number"
                />
              </Form.Item>
              <div id="recaptcha"></div>
            </>
          )}
          {error ? (
            <div className="LoginScreen-errortxt">
              <BiErrorCircle />
              &nbsp;
              {error} .Try antoher way
            </div>
          ) : null}
          <Form.Item>
            <Button
              loading={isLoading}
              block
              size="large"
              type="primary"
              htmlType="submit"
              style={{ height: 45 }}
            >
              {verification ? "Login" : "Get OTP"}
            </Button>
            {error ? (
              <Button
                className="mt-2"
                // loading={isLoading}
                block
                size="large"
                style={{ height: 40 }}
                htmlType="submit"
                onClick={LoginPhone}
              >
                {"Resend OTP"}
              </Button>
            ) : null}
          </Form.Item>
        </Form>
        <hr />
      </div>
    </div>
  );
}
export default PhoneLogin;
