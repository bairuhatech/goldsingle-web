import { Avatar, Form, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import "../styles.scss";
import EditModal from "./components/editModal";
import EditEmail from "./components/editEmail";

import EditName from "./components/editName";
// import EditPhoneNumber from "./components/editPhoneNumber";
import PhoneVerifyOtp from "./components/phoneVerify";
import DeactivateModal from "./deactivateModal";
import EditProfilePhoto from "./components/editProfilePhoto";
import EditPassword from "./components/updatePassword";
import EmailVerificationModal from "./components/emailVerficationModal";

const ProfileDashboard = () => {
  const User = useSelector((state: any) => state.User.user);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [passwordType, setPasswordType] = useState<"add" | "update">("update");
  const [messageApi, contextHolder] = message.useMessage();
  const [verifyEmailModalVisible, setVerifyEmailModalVisible] = useState(false);
  const handleeditcancel = () => {
    setModal(false);
    setModal1(false);
    setModal2(false);
    setModal3(false);
    setPasswordModal(false);
  };

  // Deactivation modal--------------
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    if (User?.data.phone) {
      setIsModalOpen(true);
    } else {
      messageApi.error(`Phone number not verified.`);
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openVerifyEmailModal = () => {
    setVerifyEmailModalVisible(true);
  };

  const closeVerifyEmailModal = () => {
    setVerifyEmailModalVisible(false);
  };

  const listItems2 = [
    {
      text: "Reactivation is easy.",
      className: "profile-dashboard-txt11",
    },
    {
      text: "Simply Login with your registered email id or mobile number and password combination used prior to deactivation. Your account data is fully restored. Default settings are applied, and you will be subscribed to receive promotional emails from NextMI.",
      className: "profile-dashboard-txt12",
    },
    {
      text: "NextMi retains your account data for you to conveniently start off from where you left if you decide to reactivate your account",
      className: "profile-dashboard-txt11",
    },
    {
      text: "Remember: Account Reactivation can be done on the desktop version Only.",
      className: "profile-dashboard-txt11",
    },
  ];

  return (
    <>
      <div>
        {contextHolder}
        <Container>
          <Row className="profile-dashboard-txt2">
            <Col md={6} className="d-flex justify-content-center">
              <div
                onClick={() => {
                  setModal3(true);
                }}
              >
                {User?.data?.image ? (
                  <Avatar
                    className="profileDashboard-avatar"
                    size={100}
                    src={User?.data?.image}
                  />
                ) : (
                  <Avatar
                    size={100}
                    className="d-flex justify-content-center align-items-center"
                    icon={
                      <FaRegUserCircle
                        style={{ width: "100%", height: "100%" }}
                      />
                    }
                  />
                )}
              </div>
            </Col>
          </Row>
          <Row className="profile-dashboard-txt2">
            <Col md={6} className="d-flex justify-content-center">
              <div>{User?.data?.first_name}</div>
            </Col>
          </Row>
          <br />

          <Form>
            <Row>
              <div className="profile-dashboard-Box1">
                <div className="profile-dashboard-txt5">User Name</div>
                <br />
              </div>
              <Col md={4}>
                <div className="profile-dashboard-Box5">
                  {User?.data?.username}
                </div>
              </Col>
              <Col md={1}></Col>
              <br />
              <Col md={2}></Col>
            </Row>
            <hr className="profileDashboard-hrStyle" />
            <Row>
              <div className="profile-dashboard-Box1">
                <div className="profile-dashboard-txt5">Name</div>
                <br />
              </div>
              <Col md={4}>
                <div className="profile-dashboard-Box5">
                  {User?.data?.first_name}
                  &nbsp;
                  {User?.data?.last_name}
                </div>
              </Col>
              <Col md={1}></Col>
              <br />
              <Col md={2}>
                <div
                  className="profile-edit-btn"
                  onClick={() => {
                    setModal1(true);
                  }}
                >
                  {User?.data?.first_name ? "Edit" : "Add"}
                </div>
              </Col>
            </Row>
            <hr className="profileDashboard-hrStyle" />

            <Row>
              <div className="profile-dashboard-txt5">Email Address</div>
              <br />
              <Col md={4}>
                <div className="profile-dashboard-Box5">
                  {User?.data?.email}
                </div>
              </Col>
              <Col md={1}>
                {User?.data?.email ? (
                  User?.data?.mail_verify ? (
                    <Tag color="green" bordered={false}>
                      Verified
                    </Tag>
                  ) : (
                    <div>
                      <Tag
                        color="orange"
                        bordered={false}
                        onClick={openVerifyEmailModal}
                        style={{ cursor: "pointer" }}
                      >
                        Verify
                      </Tag>
                      <EmailVerificationModal
                        visible={verifyEmailModalVisible}
                        onClose={closeVerifyEmailModal}
                      />
                    </div>
                  )
                ) : null}
              </Col>

              <Col md={2}>
                <div
                  className="profile-edit-btn"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  {User?.data?.email ? "Edit" : "Add"}
                </div>
              </Col>
            </Row>
            <hr className="profileDashboard-hrStyle" />
            <Row>
              <div className="profile-dashboard-Box1">
                <div className="profile-dashboard-txt5">Mobile Number</div>
                <br />
              </div>
              <Col md={4}>
                <div className="profile-dashboard-Box5">
                  {User?.data?.phone ? (
                    <>
                      {User?.data?.countrycode} {User?.data?.phone}
                    </>
                  ) : null}
                </div>
              </Col>
              <Col md={1}>
                {User?.data?.phone ? (
                  User.data?.phone_verify ? (
                    <Tag color="green" bordered={false}>
                      Verified
                    </Tag>
                  ) : (
                    <Tag color="red" bordered={false}>
                      Not Verified
                    </Tag>
                  )
                ) : null}
              </Col>

              <Col md={2}>
                <div
                  className="profile-edit-btn"
                  onClick={() => {
                    setModal2(true);
                  }}
                >
                  {User?.data?.phone ? "Edit" : "Add"}
                </div>
              </Col>
            </Row>
            <hr className="profileDashboard-hrStyle" />
            <Row>
              <div className="profile-dashboard-Box1">
                <div className="profile-dashboard-txt5">Password</div>
                <br />
              </div>
              <Col md={5}>
                <div className="profile-dashboard-Box5">
                  <div>{User?.data?.password ? "********" : ""}</div>
                </div>
              </Col>

              <Col md={2}>
                <div
                  className="profile-edit-btn"
                  onClick={() => {
                    if (User?.data?.password) {
                      setPasswordType("update");
                    } else {
                      setPasswordType("add");
                    }
                    setPasswordModal(true);
                  }}
                >
                  {User?.data?.password ? "Edit" : "Add"}
                </div>
              </Col>
            </Row>
            <hr className="profileDashboard-hrStyle" />
          </Form>
          <br />
          <div>
            <div className="profile-dashboard-txt6">FAQs</div>
            <br />
            <p className="profile-dashboard-txt7">
              What happens when I update my email address (or mobile number)?
            </p>
            <p className="profile-dashboard-txt8">
              Your login email id (or mobile number) changes, likewise. You'll
              receive all your account related communication on your updated
              email address (or mobile number).
            </p>
            <p className="profile-dashboard-txt7">
              When will my NextMe account be updated with the new email address
              (or mobile number)?
            </p>
            <p className="profile-dashboard-txt8">
              It happens as soon as you confirm the verification code sent to
              your email (or mobile) and save the changes.
            </p>
            <p className="profile-dashboard-txt7">
              What happens to my existing NextMe account when I update my email
              address (or mobile number)?
            </p>
            <p className="profile-dashboard-txt8">
              Updating your email address (or mobile number) doesn't invalidate
              your account. Your account remains fully functional. You'll
              continue seeing your Order history, saved information and personal
              details.
            </p>
            <p className="profile-dashboard-txt7">
              Does my Seller account get affected when I update my email
              address?
            </p>
            <p className="profile-dashboard-txt8">
              NextMe has a 'single sign-on' policy. Any changes will reflect in
              your Seller account also.
            </p>
            <br />
            <div
              className="profile-dashboard-txt9"
              onClick={showModal}
              style={{ cursor: "pointer" }}
            >
              Deactivate Account
            </div>
          </div>
          <br />
        </Container>
      </div>

      {modal ? (
        <EditModal
          ui={<EditEmail close={handleeditcancel} />}
          open={modal}
          close={handleeditcancel}
        />
      ) : null}
      {modal1 ? (
        <EditModal
          ui={<EditName close={handleeditcancel} />}
          open={modal1}
          close={handleeditcancel}
        />
      ) : null}
      {modal2 ? (
        <EditModal
          ui={<PhoneVerifyOtp close={handleeditcancel} />}
          open={modal2}
          close={handleeditcancel}
        />
      ) : null}
      <EditModal
        ui={<EditPassword close={handleeditcancel} type={passwordType} />}
        open={passwordModal}
        close={handleeditcancel}
      />
      {modal3 ? (
        <EditProfilePhoto open={modal3} close={handleeditcancel} />
      ) : null}
      <DeactivateModal open={isModalOpen} cancelModal={handleCancel} />
    </>
  );
};

export default ProfileDashboard;
