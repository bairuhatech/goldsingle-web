import { useState } from "react";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { Auth, GoogleProvide } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { message, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import API from "../../config/API";
import { POST } from "../../utils/apiCalls";

import { login } from "../../redux/slices/userSlice";
import React from "react";
import { useNavigate } from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

function GmailLogin(props: any) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginGmail = async () => {
    try {
      signInWithPopup(Auth, GoogleProvide).then((data: any) => {
        setIsLoading(true);
        let datas = data?._tokenResponse;
        let obj = {
          first_name: datas?.firstName,
          last_name: datas?.lastName,
          name: datas?.displayName,
          email: datas?.email,
          image: datas?.photoUrl,
          type: "user",
        };
        LoginEmail(obj);
      });
    } catch (err) {
      message.error("Somehting went wrong");
    }
  };

  const LoginEmail = async (values: any) => {
    try {
      let url = API.LOGIN_GMAIL;
      var loginRes: any = await POST(url, values);
      if (loginRes.status) {
        if (loginRes.newAccount == true) {
          dispatch(login(loginRes));
          if (typeof props?.openModal == "function") {
            props?.openModal();
          }
          setTimeout(() => {
            navigate("/");
            if (typeof props?.closeModal == "function") {
              props?.closeModal();
            }
          }, 2000);
          setIsLoading(false);
        } else {
          message.success("Login Successfull");
          dispatch(login(loginRes));
          window.location.replace("/home");
          setIsLoading(false);
        }
      } else {
        message.error(loginRes.message);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      message.error("Somehting went wrong");
    }
  };

  return (
    <>
      <div className="GmailLogin" onClick={() => loginGmail()}>
        <div className="GmailLogin-row">
          <div>
            <FcGoogle size={30} />
          </div>
          <div>&nbsp;Continue With Google</div>
        </div>
      </div>
      <Modal
        width={250}
        centered
        open={isLoading}
        footer={false}
        closable={false}
      >
        <div className="GmailLogin-txt1">
          <Spin indicator={antIcon} />
          &nbsp; &nbsp; &nbsp;Checking Account . . .
        </div>
      </Modal>
    </>
  );
}
export default GmailLogin;
