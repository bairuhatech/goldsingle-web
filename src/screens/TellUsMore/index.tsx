import { useEffect } from "react";
import SaleMessage from "../../components/saleMessage";
import SubscribeNewsletter from "../../components/subscribeNewsletter";
import { Col, Container, Row } from "react-bootstrap";
import TellusMore from "../../assets/images/Tell-us-more.png";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import PageHeader from "../../components/pageHeader";
import countriesList from "../../config/countryCode.json";
import React from "react";

function TellUsMore() {
  const { Option } = Select;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Screen-box">
      <div>
        <SaleMessage />
        <div className="ftscreen-fnt m-2">
          <PageHeader text="Know You" />
          <Container>
            <Row className="mt-5">
              <Col md={4} xs={12}>
                <img src={TellusMore} alt="" className="w-100" />
              </Col>
              
              <Col md={6} xs={12} className="p-5 ">
                <Form>
                  <h3 className="d-flex justify-content-center pb-4">
                    Know You
                  </h3>
                  <Row>
                    <Col md={6}>
                      <Form.Item
                        name="firstName"
                        // label="First Name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your first name",
                          },
                        ]}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        name="lastName"
                        // label="Last Name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your last name",
                          },
                        ]}
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        name="email"
                        // label="Email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "Please enter a valid email",
                          },
                        ]}
                      >
                        <Input placeholder="Email" />
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        name="mobile"
                        // label="Mobile"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your mobile number",
                          },
                        ]}
                      >
                        <Input placeholder="Mobile" />
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        name="gender"
                        // label="Gender"
                        rules={[
                          {
                            required: true,
                            message: "Please select your gender",
                          },
                        ]}
                      >
                        <Select placeholder="Select Gender">
                          <Option value="male">Male</Option>
                          <Option value="female">Female</Option>
                          <Option value="notToSaygender">Prefer not to say</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        name="birthdate"
                        // label="Birthdate"
                        rules={[
                          {
                            required: true,
                            message: "Please select your birthdate",
                          },
                        ]}
                      >
                        <DatePicker
                          style={{ width: "100%" }}
                          placeholder="Select Birthdate"
                        />
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        name="maritalStatus"
                        // label="Marital Status"
                        rules={[
                          {
                            required: true,
                            message: "Please select your marital status",
                          },
                        ]}
                      >
                        <Select placeholder="Select Marital Status">
                          <Option value="single">Single</Option>
                          <Option value="married">Married</Option>
                          <Option value="divorced">Prefer Not to Say</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        name="employment"
                        // label="Employment"
                        rules={[
                          {
                            required: true,
                            message: "Please select your employment status",
                          },
                        ]}
                      >
                        <Select placeholder="Select Employment">
                          <Option value="student">Student</Option>
                          <Option value="professional">
                            Salaried Professional
                          </Option>
                          <Option value="entrepreneur">Entrepreneur</Option>
                          <Option value="notToSay">Prefer not to say</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        name="preferredLanguage"
                        // label="Preferred Language"
                        rules={[
                          {
                            required: true,
                            message: "Please select your preferred language",
                          },
                        ]}
                      >
                        <Select placeholder="Select Preferred Language">
                          <Option value="english">English</Option>
                          <Option value="spanish">Arabic</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        name="country"
                        // label="Country"
                        rules={[
                          {
                            required: true,
                            message: "Please select your country",
                          },
                        ]}
                      >
                        <Select placeholder="Select Country">
                          {countriesList.map((country) => (
                            <Option key={country.code} value={country.code}>
                              {country.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        name="state"
                        // label="State"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your state",
                          },
                        ]}
                      >
                        <Input placeholder="State" />
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        name="accommodation"
                        // label="Accommodation"
                        rules={[
                          {
                            required: true,
                            message:
                              "Please select your accommodation preference",
                          },
                        ]}
                      >
                        <Select placeholder="Select Accommodation">
                          <Option value="villa">Villa</Option>
                          <Option value="apartment">Apartment</Option>
                          <Option value="shared">Shared Accommodation</Option>
                          <Option value="notToSayAccommodation">
                            Prefer not to say
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={6}>
                      <Form.Item
                        name="shoppingPreference"
                        // label="Shopping Preference"
                        rules={[
                          {
                            required: true,
                            message: "Please select your shopping preference",
                          },
                        ]}
                      >
                        <Select placeholder="Select Shopping Preference">
                          <Option value="online">Online</Option>
                          <Option value="offline">Offline</Option>
                          <Option value="notToSayShopping">
                            Prefer not to say
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={6} />
                    <Col md={12}>
                      <Form>
                        <Form.Item
                          name="feedback"
                          rules={[
                            {
                              required: true,
                              message:
                                "Please enter your feedback about Next ME website",
                            },
                          ]}
                        >
                          <Input.TextArea
                            placeholder="Your feedback about Next ME website"
                            rows={4}
                          />
                        </Form.Item>
                        <Form.Item
                          name="agreement"
                          valuePropName="checked"
                          rules={[
                            {
                              validator: (_, value) =>
                                value
                                  ? Promise.resolve()
                                  : Promise.reject(
                                      "Please agree to the terms and conditions"
                                    ),
                            },
                          ]}
                        >
                          <Checkbox>
                            By submitting the form I agree to Next ME’s
                            standard <a href="/terms-and-conditions" target="_blank">terms and conditions.</a> 
                          </Checkbox>
                        </Form.Item>
                        <Form.Item>
                          <Button
                            
                            htmlType="submit"
                            block
                            className="w-100"
                          >
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col md={2} xs={12}></Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="mt-5">
        <SubscribeNewsletter />
      </div>
    </div>
  );
}
export default TellUsMore;
