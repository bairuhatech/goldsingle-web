import { Button, Input, Modal, message } from "antd";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import listItems from "./helpers/listItems.json";
import { useSelector } from "react-redux";
import API from "../../../config/API";
import { PUT } from "../../../utils/apiCalls";
import { useDispatch } from "react-redux";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { Auth } from "../../../config/firebase";
import { logout, update } from "../../../redux/slices/userSlice";
import { clearCart } from "../../../redux/slices/cartSlice";
import { clearSettings } from "../../../redux/slices/settingsSlice";
import { clearLocation } from "../../../redux/slices/locationSlice";
import { clearStore } from "../../../redux/slices/storeSlice";
import { useNavigate } from "react-router-dom";

const listItems2 = [
  {
    text: "Reactivation is easy.",
    className: "profile-dashboard-txt11",
  },
  {
    text: "Simply Login with your registered email id or mobile number and password combination used prior to deactivation. Your account data is fully restored. Default settings are applied, and you will be subscribed to receive promotional emails from Gold Bazar.",
    className: "profile-dashboard-txt12",
  },
  {
    text: "Gold Bazar retains your account data for you to conveniently start off from where you left if you decide to reactivate your account",
    className: "profile-dashboard-txt11",
  },
  {
    text: "Remember: Account Reactivation can be done on the desktop version Only.",
    className: "profile-dashboard-txt11",
  },
];
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

function DeactivateModal(props: any) {
  const User = useSelector((state: any) => state.User?.user);
  const [autho, setautho] = useState<any>(null);
  const [verification, setverification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enterOtp, setEnterOtp] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const LoginPhone = async () => {
    try {
      setIsLoading(true);
      checkuser();
      let recaptchas = new RecaptchaVerifier(Auth, "recaptcha", {});
      let phone = User?.data?.countrycode + User?.data?.phone;
      let checkPhone: any = await signInWithPhoneNumber(
        Auth,
        phone,
        recaptchas
      );
      if (checkPhone?.verificationId) {
        setautho(checkPhone);
        setverification(true);
        setEnterOtp(true);
      } else {
        // setError(true);
      }
      setIsLoading(false);
    } catch (err) {
      setverification(false);
      setEnterOtp(false);
      console.log("LoginPhone = = = >", err);
      setIsLoading(false);
      //   setError(true);
    }
  };
  const verifyOtp = async () => {
    if (otp.length) {
      try {
        setOtpLoading(true);
        let verify = await autho.confirm(otp);
        if (verify?.user?.phoneNumber) {
          deactivateAccount();
          // setError(false);
          // register();
        }
      } catch (err) {
        alert("failed to verify");
        setOtpLoading(false);
        //   setError(true);
        //   messageApi.error(`invalid otp plase try again!`);
        setverification(false);
      } finally {
      }
    }
  };
  const deactivateAccount = async () => {
    try {
      setIsLoading(true);
      const url = API.USER_DEACTIVATE + User?.data?._id;
      const body = { status: false };
      const response: any = await PUT(url, body);
      if (response.status) {
        dispatch(update(response));
        setEnterOtp(false);
        messageApi.success(`Your Account has been Deactivated Successfully`);
        props?.cancelModal();
        dispatch(logout(null));
        dispatch(clearCart(null));
        dispatch(clearSettings(null));
        dispatch(clearLocation(null));
        dispatch(clearStore(null));
        navigation("/");
      }
    } catch (err) {
      messageApi.success("Failed to Update your Account status.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      width={1000}
      open={props?.open || false}
      //   onOk={handleOk}
      onCancel={() => {
        props?.cancelModal();
        setEnterOtp(false);
        setverification(false);
      }}
      footer={null}
      centered
    >
      {contextHolder}
      <div>
        <Row>
          <Col md={8}>
            <div className="profile-dashboard-Box3">
              When you deactivate your account
            </div>
            {listItems.map((item: any) => (
              <ul>
                <li key={item.text} className="profile-dashboard-txt10">
                  {item.text}
                </li>
              </ul>
            ))}
            <div className="profile-dashboard-Box3">
              How do I reactivate my Gold Bazar account?
            </div>
            {listItems2.map((item) => (
              <div style={{ paddingLeft: "14px" }}>
                <p key={item.text} className={item.className}>
                  {item.text}
                </p>
              </div>
            ))}
          </Col>
          <Col md={4}>
            <div className="profile-dashboard-Box3">
              Are you sure you want to leave?
            </div>
            <Input
              size="large"
              placeholder="Email Address"
              defaultValue={User?.data?.email}
              disabled
            ></Input>
            <br />
            <br />
            <Input
              size="large"
              placeholder="Mobile Number"
              defaultValue={User?.data?.phone}
              disabled
            ></Input>
            <br />

            {enterOtp ? (
              <>
                <br />
                <Input
                  size="large"
                  placeholder="Enter Recieved OTP"
                  onChange={(e: any) => setOtp(e.target?.value)}
                ></Input>
              </>
            ) : null}
            <br />
            <br />
            <Button
              size="large"
              block
              className="profile-dashboard-Btn2"
              onClick={verification ? verifyOtp : LoginPhone}
              loading={isLoading}
            >
              {verification ? "CONFIRM DEACTIVATION" : "Verify Phone Number"}
            </Button>
            {verification ? null : <div id="recaptcha"></div>}
            <br />
            <br />
            <div
              className="profile-dashboard-Box4"
              onClick={() => {
                props?.cancelModal();
                setEnterOtp(false);
                setverification(false);
              }}
            >
              NO LET ME STAY !
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}

export default DeactivateModal;
