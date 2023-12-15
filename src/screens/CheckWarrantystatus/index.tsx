import { Container, Row, Col } from "react-bootstrap";
import SaleMessage from "../../components/saleMessage";
import SubscribeNewsletter from "../../components/subscribeNewsletter";
import WarrantyImg from "../../assets/images/warrantyimage.png";
import WarrantyCheck from "../../assets/images/noticeboard.jpg";
import FAQ from "../../assets/images/faq.jpg";
import "./styles.scss";
import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import Country from "../../config/countryCode.json";
import React from "react";

function CheckWarrantystatus() {
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const submitOtp = () => {
    //
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
  const handleSendOtp = () => {
    setOtpModalVisible(true);

    // Handle form submission here if needed
    // For simplicity, just move to the next form
    submitOtp();
  };

  const handleOtpVerification = () => {
    // Handle OTP verification logic here
    // For simplicity, just submit
    setOtpModalVisible(false);
    submitOtp();
  };
  const handleResend = () => {
    setOtp("");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="Screen-box">
      <div>
        <SaleMessage />
      </div>
      <div className="ftscreen-fnt m-2 ">
        <Row className="m-0 mt-3">
          <div id="section1" className="CheckWarrantystatus-bg1">
            <Container>
              <div className="row p-0 justify-content-center mb-4">
                <div className="col-md-4 col-12 p-md-5  p-0 m-0 mt-5 mb-5 text-center text-white">
                  <h3 className="pt-md-5 pt-0">Warranty Portal</h3>
                  <h1 className="pt-1 display-6 lh-sm">
                    End-to-end warranty lifecycle management
                  </h1>
                  <a
                    className="btn btn-light text-capitalize rounded-pill ps-5 pe-5 scrolling-link"
                    href="#findmore"
                  >
                    <strong>Find out more</strong>
                  </a>
                  <p className="pt-3 fs-5">
                    Applicable warranties will show for products sold by GOLD BAZAR
                    only. We are coming soon with warranties bought from our
                    Marketplace sellers.
                  </p>
                </div>
                <div className="col-md-8 ">
                  <div className="CheckWarrantystatus-img1 align-items-center justify-content-center d-flex">
                    <div className="CheckWarrantystatus-loginform">
                      <Form
                        onFinish={handleSendOtp}
                        initialValues={{
                          code: "+91",
                        }}
                      >
                        <div className="text-center">
                          <img
                            src="https://bairuha-bucket.s3.ap-south-1.amazonaws.com/nextmiddleeast/logo.95174a95f2415bfa4f0f.png"
                            alt="Company Logo"
                            className=" mb-4 w-50 "
                          />
                        </div>
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
                        </>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                          >
                            Send OTP
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                </div>
                <Modal
                  title="Enter OTP"
                  visible={otpModalVisible}
                  footer={null}
                  onCancel={() => setOtpModalVisible(false)}
                  className="d-flex"
                >
                  <Form onFinish={handleOtpVerification}>
                    <div className="px-3">
                      <p className="mt-4">
                        An OTP has been sent to the registered mobile.
                      </p>
                      <div>
                        <p>Enter your Code here</p>
                        <div className="d-flex">
                          <OtpInput
                            onChange={setOtp}
                            value={otp}
                            inputStyle="inputStyle"
                            numInputs={6}
                            renderSeparator={<span></span>}
                            renderInput={(props) => <input {...props} />}
                          />
                        </div>

                        <p className="mt-3">Didn't receive the code?</p>
                        <p
                          className="resend"
                          onClick={handleResend}
                          style={{ cursor: "pointer" }}
                        >
                          Resend
                        </p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <Button type="primary" size="large" htmlType="submit">
                          Verify
                        </Button>
                      </div>
                    </div>
                  </Form>
                </Modal>
              </div>
            </Container>
          </div>
        </Row>
        <Row id="findmore" className="my-4">
          <div className="container p-5 justify-content-center">
            <div className="row p-md-5 p-0">
              <div className="col-md-4 p-md-4 p-0 m-md-5 m-0 mt-5 mb-5 text-md-start text-center text-black">
                <h2 className="pt-md-5 display-6 p-2 lh-sm">
                  Are you a GOLD BAZAR Customer?
                </h2>
                <h2 className="pt-1 display-6 lh-sm mt-3">
                  Want to know the warranty status of your product?
                </h2>
              </div>
              <div className="col-md-6">
                <img className="mt-md-2 mt-5 rounded w-100" src={WarrantyImg} />
              </div>
            </div>
          </div>
        </Row>
        <div className="px-4">
          <Row className="bg-light">
            <div className="container p-5 justify-content-center">
              <div className="row p-md-5 p-0">
                <div className="col-md-6">
                  <img className="mt-2 rounded w-100" src={WarrantyCheck} />
                </div>
                <div className="col-md-4 p-md-4 p-0 m-md-5 m-0 mt-5 mb-5 text-md-start text-center">
                  <h5 className="pt-1 pt-md-5 lh-sm">
                    You will get a single screen with 360 degrees view where all
                    your Gold Bazar purchases can be listed along with the
                    in-repair, in-warranty and out-of-warranty products.
                  </h5>
                  <h4 className="pt-1 display-6 lh-sm mt-3">
                    A complete solution for all warranty-related issues.
                  </h4>
                </div>
              </div>
            </div>
          </Row>
          <Row className="CheckWarrantystatus-img2">
            <div className=" container p-5 ">
              <div className="row p-md-5 p-0">
                <div className="col-md-4 col-12 p-md-4 m-md-5 p-0 m-0 mt-5 mb-5 text-md-start text-center text-white">
                  <h4 className="pt-1  lh-sm">
                    It will also enable you to take action regarding any
                    warranties you plan to claim.
                  </h4>
                </div>
              </div>
            </div>
          </Row>
          <Row className="bg-light">
            <div className="container p-5 justify-content-center">
              <div className="row p-md-5 p-0">
                <div className="col-md-4 p-md-4 p-0 m-md-5 m-0 mt-5 mb-5 text-md-start text-center">
                  <h2 className="pt-1  lh-sm text-uppercase">
                    Frequently asked questions
                  </h2>
                  <h6>
                    Can I check the warranty details of my products online via
                    the Warranty Application?
                  </h6>
                  <p className="fs-6">
                    Yes, you can log on to https://goldbazar.com/warranty
                    and check the warranty of the products that you purchased
                    from www.goldbazar.com
                  </p>
                  <p className="pt-1 fw-bolder fs-5 lh-sm mt-3">
                    You can only view the warranty of the products sold by Gold Bazar; incase the purchased product is sold by a Marketplace
                    seller the warranty will not show in this application.
                  </p>
                  <Button
                    type="primary"
                    size="large"
                    block
                    className="m-2 rounded-pill px-5"
                    href="./faq"
                    target="_self"
                  >
                    <strong>View More</strong>
                  </Button>
                </div>
                <div className="col-md-6">
                  <img className="mt-md-2 mt-5 rounded w-100" src={FAQ} />
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
      <div className="mt-5">
        <SubscribeNewsletter />
      </div>
    </div>
  );
}
export default CheckWarrantystatus;
