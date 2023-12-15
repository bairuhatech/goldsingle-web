import { Col, Container, Row } from "react-bootstrap";
import { Form, Input, Button, Select } from "antd";
import Country from "../../../config/countryCode.json";
import {
  FcBullish,
  FcCustomerSupport,
  FcInTransit,
  FcIphone,
  FcSalesPerformance,
} from "react-icons/fc";
import { TbTruckReturn } from "react-icons/tb";
import React from "react";
import { useSelector } from "react-redux";
function Step1({ moveToNextStep, formData }: any) {
  const User = useSelector((state: any) => state.User.user);
  const userType = User?.data?.type;
  const onFinish = async (values: any) => {
    try {
      moveToNextStep({ step1Data: values });
    } catch (error) {
      console.log(error);
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
    <div>
      <Container>
        <Row>
          <Col md={4}>
            <Form
              onFinish={onFinish}
              initialValues={{
                first_name: userType === 'user' ? User?.data?.first_name : formData?.first_name,
                last_name: userType === 'user' ? User?.data?.last_name : formData?.last_name,
                email: userType === 'user' ? User?.data?.email : formData?.email,
                password: userType === 'user' ? User?.data?.password : formData?.password,
                confirm_password: userType === 'user' ? User?.data?.password : formData?.password,
                code: userType === 'user' ? User?.data?.countrycode : "+91",
                phone: userType === 'user' ? User?.data?.phone : formData.phone,
              }}
              // disabled={userType === 'user'}
            >
              <Row>
                <Col sm={6} xs={6}>
                  <div className="input-form-label">First Name</div>
                  <Form.Item
                    name={"first_name"}
                    rules={[{ required: true, message: "name is required" }]}
                  >
                    <Input placeholder="Enter name" size="large" disabled={userType === 'user'}/>
                  </Form.Item>
                </Col>
                <Col sm={6} xs={6}>
                  <div className="input-form-label">Last Name</div>
                  <Form.Item
                    name={"last_name"}
                    rules={[{ required: true, message: "name is required" }]}
                  >
                    <Input placeholder="Enter name" size="large" disabled={userType === 'user'}/>
                  </Form.Item>
                </Col>
              </Row>
              <div className="input-form-label">Enter Email</div>
              <Form.Item
                name={"email"}
                rules={[
                  { required: true, message: "email is required" },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input placeholder="Enter email" size="large" disabled={userType === 'user'}/>
              </Form.Item>
              <div className="input-form-label">Enter Phone</div>
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
                  disabled={userType === 'user'}
                />
              </Form.Item>
              <div className="input-form-label">Enter password</div>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "password is required", min: 6 },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Enter password" size="large" disabled={userType === 'user'}/>
              </Form.Item>
              <div className="input-form-label">Confirm password</div>
              <Form.Item
                name="confirm_password"
                rules={[
                  { required: true, message: "Confirm password" },
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
                <Input.Password placeholder="Confirm password" size="large" disabled={userType === 'user'}/>
              </Form.Item>
              <Row>
                <Col md="12">
                  <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large">
                      Continue
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col md={8}>
            <div className="sellerRegister-box2">
              <h4 className="sellerRegister-subHeading">Why sell on NextMe?</h4>
              <div className="sellerRegister-text1">
                Customers love having a trusted destination where they can
                purchase a wide variety of goods - which is what makes sellers
                like you so important. As a Nextme seller, you take part in
                offering those shoppers better selection, better prices, and a
                top-notch customer experience.
              </div>
              <Row className="mt-3 text-start gy-3">
                <Col md="4">
                  <FcInTransit size={35} />
                  <div className="sellerRegister-text2 mt-3">
                    Sell Across Dubai
                  </div>
                  <div className="sellerRegister-text1">
                    Reach over 50 crore+ customers across 27000+ pincodes
                  </div>
                </Col>
                <Col md="4">
                  <FcBullish size={35} />
                  <div className="sellerRegister-text2 mt-3">
                    Higher Profits
                  </div>
                  <div className="sellerRegister-text1">
                    With 0% commission* , you take 100% profits with you
                  </div>
                </Col>
                <Col md="4">
                  <FcCustomerSupport size={35} />
                  <div className="sellerRegister-text2 mt-3">
                    24x7 Seller Support
                  </div>
                  <div className="sellerRegister-text1">
                    All your queries and issues are answered by our dedicated
                    Seller Support Team
                  </div>
                </Col>
                <Col md="4">
                  <FcSalesPerformance size={35} />
                  <div className="sellerRegister-text2 mt-3">
                    Fast & Regular Payments
                  </div>
                  <div className="sellerRegister-text1">
                    Get payments as fast as 7-10 days from the date of dispatch
                  </div>
                </Col>
                <Col md="4">
                  <FcIphone size={35} />
                  <div className="sellerRegister-text2 mt-3">
                    Business on the go
                  </div>
                  <div className="sellerRegister-text1">
                    Download our Nextme Seller App to manage your business
                    anywhere, anytime
                  </div>
                </Col>
                <Col md="4">
                  <TbTruckReturn color="orange" size={35} />
                  <div className="sellerRegister-text2 mt-3">
                    Lower Return Charges
                  </div>
                  <div className="sellerRegister-text1">
                    With our flat and low return charges, ship your products
                    stress-free
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Step1;
