import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Select, message } from "antd";
import { BiErrorCircle } from "react-icons/bi";
import { InputOTP } from "antd-input-otp";
import Country from "../../../../config/countryCode.json";
import "../../styles.scss";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import API from "../../../../config/API";
import { PUT } from "../../../../utils/apiCalls";
import { Auth } from "../../../../config/firebase";
import { update } from "../../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import otpimage from "../../../../assets/images/otpverification.jpg";
import React from "react";

function PhoneVerifyOtp(props: any) {
  const navigate = useNavigate();
  const User = useSelector((state: any) => state?.User?.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [verification, setVerification] = useState(false);
  const [autho, setAutho] = useState<any>(null);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<any>(null);
  const [resendInitiated, setResendInitiated] = useState(false);

  const checkUser = async () => {
    try {
      let user: any = Auth.currentUser;
      if (user?.phoneNumber) {
        signOut(user);
      }
    } catch (err) {
      console.log("checkuser err", err);
    }
  };

  const resendOtp = async () => {
    try {
      setResendInitiated(true);
      checkUser();
      let recaptchas = await new RecaptchaVerifier(Auth, "recaptcha", {});
      let phone = `${data.countrycode}${data.phone}`;
      let checkPhone: any = await signInWithPhoneNumber(
        Auth,
        phone,
        recaptchas
      );

      if (checkPhone?.verificationId) {
        setAutho(checkPhone);
        setVerification(true);
      } else {
        setError("Something went wrong during resend");
      }
      setResendInitiated(false);
    } catch (err) {
      setVerification(false);
      console.log("ResendOtp error", err);
      setResendInitiated(false);
      setError("Failed to resend OTP. Try again.");
    }
  };

  const LoginVerifyOtp = async (values: any) => {
    try {
      setData(values);
      setIsLoading(true);
      checkUser();
      let recaptchas = await new RecaptchaVerifier(Auth, "recaptcha", {});
      let phone = `${values.countrycode}${values.phone}`;
      let checkPhone: any = await signInWithPhoneNumber(
        Auth,
        phone,
        recaptchas
      );

      if (checkPhone?.verificationId) {
        setAutho(checkPhone);
        setVerification(true);
      } else {
        setError("Something went wrong");
      }
      setIsLoading(false);
    } catch (err) {
      setVerification(false);
      console.log("LoginPhone error", err);
      setIsLoading(false);
      setError("Something went wrong");
    }
  };

  const verifyOtp = async (values: any) => {
    try {
      setIsLoading(true);
      let otp = values.otp.join("");
      let verify = await autho.confirm(otp);
      if (verify?.user?.phoneNumber) {
        PhoneVerifyOtp();
      }
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong during OTP verification");
      console.log("verifyOtp err", err);
    }
  };

  const PhoneVerifyOtp = async () => {
    try {
      setIsLoading(true);
      let url = API.USER_PHONENUMBER_UPDATE + `/${User.data._id}`;
      let body = {
        countrycode: data?.countrycode,
        phone: data?.phone,
        phone_verify: true,
      };
      var loginRes: any = await PUT(url, body);

      if (loginRes.status) {
        message.success(loginRes.message);
        dispatch(update(loginRes?.data));
        props.close();
        setIsLoading(false);
      } else {
        setError(loginRes.message);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log("err on PhoneVerifyOtp", err);
    }
  };

  const prefixSelector = (
    <Form.Item name="code" noStyle>
      <Select style={{ width: 85 }} size="large" showSearch={true}>
        {Country.map((item: any) => (
          <Select.Option key={item.dial_code} value={item.dial_code}>
            {item.dial_code}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );

  const [inputValue, setInputValue] = useState("");
  const handlePhoneInputChange = (e: any) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  };

  return (
    <div className="PhoneLogin">
      <div>
        <div className="LoginScreen-txt2">
          {verification ? (
            `Enter OTP sent to ${inputValue}`
          ) : (
            <div>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  textAlign: "center",
                }}
              >
                <img
                  style={{ width: "200px", height: "170px" }}
                  src={otpimage}
                />
              </div>
              <div className="PhoneVerifyOtp-txt2">OTP Verification </div>
              We will send you a <b>One Time Password</b> on your Mobile Number
            </div>
          )}
        </div>
        <br />
        <Form
          onFinish={verification ? verifyOtp : LoginVerifyOtp}
          initialValues={{ code: "+91" }}
        >
          {verification ? (
            <Form.Item
              name="otp"
              rules={[
                {
                  required: true,
                  message: "Input 6 digit verification code!",
                },
              ]}
            >
              <InputOTP autoFocus inputType="numeric" length={6} />
            </Form.Item>
          ) : (
            <>
              <div>Enter Your Number</div>
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
                  defaultValue={
                    User?.data?.phone
                      ? User?.data?.phone
                      : User?.data?.data?.phone
                  }
                  onChange={(e) => handlePhoneInputChange(e)}
                />
              </Form.Item>
              <div id="recaptcha"></div>
            </>
          )}
          {error ? (
            <div className="LoginScreen-errortxt">
              <BiErrorCircle />
              &nbsp;
              {error}. Try another way
            </div>
          ) : null}

          <Form.Item>
            <Button
              loading={isLoading}
              block
              type="primary"
              htmlType="submit"
              style={{ height: 40 }}
            >
              {verification ? "VERIFY & PROCEED" : "GET OTP"}
              {/* {verification ? "VERIFY & PROCEED" : resendInitiated ? "RESEND OTP" : "GET OTP"} */}
            </Button>
          </Form.Item>

          {verification && !resendInitiated && (
            <div style={{ textAlign: "center", marginTop: 10 }}>
              <Button onClick={resendOtp}>RESEND OTP</Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
export default PhoneVerifyOtp;
