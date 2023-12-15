import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.scss";
import { Container, Row, Col } from "react-bootstrap";

import EmailLogin from "./emailLogin";
import GmailLogin from "./gmailLogin";
import PhoneLogin from "./phoneLogin";
import React from "react";

function LoginScreen() {
  const navigation = useNavigate();
  const [useEmail, setUseEmail] = useState(false);

  return (
    <div className="Screen-box">
      <br /> <br />
      <Container>
        <Row>
          <Col sm={4} xs={12}></Col>
          <Col sm={4} xs={12}>
            <h2 className="LoginScreen-txt1">Sign in or create your account</h2>
            <div className="LoginScreen-txt2">
              Please enter the following details to login
            </div>

            <div className="LoginScreen-box1">
              {useEmail ? (
                <>
                  <EmailLogin />
                  <div
                    className="LoginScreen-txt6"
                    onClick={() => setUseEmail(false)}
                  >
                    Phone Login
                  </div>
                </>
              ) : (
                <div>
                  <PhoneLogin />
                  <div
                    className="LoginScreen-txt6"
                    onClick={() => setUseEmail(true)}
                  >
                    Email Login
                  </div>
                </div>
              )}
              <br />
              <GmailLogin />
              <div
                className="LoginScreen-txt4"
                onClick={() => navigation("/signup/user")}
              >
                Don’t have an account?{" "}
                <span className="LoginScreen-txt5">Create Account</span>
              </div>
            </div>
          </Col>
          <Col sm={4} xs={12}></Col>
        </Row>
      </Container>
      <br />
      <br />
    </div>
  );
}
export default LoginScreen;
