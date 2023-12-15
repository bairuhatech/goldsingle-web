import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Form, Input, Button, Select, Checkbox, Radio } from "antd";

import LocationPicker from "../component/LocationPicker";

function Step2({ businessType, formData, moveToNextStep, goBack }: any) {
  const [form] = Form.useForm();
  const [OpenPicker, setOpenPicker] = useState(false);
  const onFinish = async (values: any) => {
    moveToNextStep({ step2Data: values });
  };
  return (
    <div className="sellerRegister-stepbox">
      <Container>
        <Row>
          <Col md={4}>
            <Form
              form={form}
              onFinish={onFinish}
              initialValues={{
                store_name: formData?.store_name,
                business_address: formData?.business_address,
                business_location: formData?.business_location,
                business_type: formData?.business_type,
                trn_number: formData?.trn_number,
                trade_licencse_no: formData?.trade_licencse_no,
                upscs: formData?.upscs,
                manufacture: formData?.manufacture,
                agreement: formData?.agreement,
              }}
            >
              <div className="input-form-label">Business Name</div>
              <Form.Item
                name="store_name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Business Name",
                  },
                ]}
              >
                <Input placeholder="Store Name" size="large" />
              </Form.Item>
              <div className="input-form-label">Business Location</div>
              <Form.Item
                name="business_address"
                rules={[
                  {
                    required: true,
                    message: "Please enter Business Location",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Enter your  Business Location"
                  size="large"
                  rows={3}
                />
              </Form.Item>
              <div className="input-form-label">Locate your Business</div>
              <Form.Item
                name="business_location"
                rules={[
                  {
                    required: true,
                    message: "Please Loacte your Business",
                  },
                ]}
              >
                <Input
                  placeholder="Store Location"
                  size="large"
                  onClick={(e) => {
                    setOpenPicker(true);
                  }}
                />
              </Form.Item>

              <div className="input-form-label">Business Type</div>
              <Form.Item name="business_type">
                <Select placeholder="Business Type" size="large">
                  {businessType?.map((item: any) => {
                    return (
                      <Select.Option key={item.id} value={item.name}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <div className="input-form-label">Trn Number</div>
              <Form.Item
                name={"trn_number"}
                rules={[
                  {
                    required: true,
                    message: "Trn number is required",
                  },
                ]}
              >
                <Input placeholder="Enter TRN Number" size="large" />
              </Form.Item>

              <div className="input-form-label">Trade Liscence No</div>
              <Form.Item
                name={"trade_licencse_no"}
                rules={[
                  {
                    required: true,
                    message: "Licencs number is required",
                  },
                ]}
              >
                <Input placeholder="Enter  Trade License No" size="large" />
              </Form.Item>

              <div className="input-form-label">
                Do you have Universal product code (UPSCs) for all your products
                ?
              </div>
              <Form.Item name="upscs">
                <Radio.Group size="large">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>

              <div className="input-form-label">
                Are you Manufacture or brand owner (or agent or representiative
                of the brand) for the products you want to sell on NextME
              </div>
              <Form.Item name="manufacture" className="mb-0">
                <Form.Item name="manufacture">
                  <Radio.Group size="large">
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                    <Radio value="both">Both</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Please accept agreement")),
                  },
                ]}
              >
                <Checkbox>
                  By continuing, I agree to NextMe’s{" "}
                  <a href="/terms-and-conditions" target="_blank">
                    Terms of Use
                  </a>{" "}
                  &{" "}
                  <a href="/disclaimer-policy" target="_blank">
                    Privacy Policy
                  </a>
                </Checkbox>
              </Form.Item>
              <Row>
                <Col md="6" xs={6}>
                  <Button onClick={() => goBack()} block size="large">
                    Back
                  </Button>
                </Col>
                <Col md="6" xs={6}>
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
              <h4 className="sellerRegister-subHeading">
                Getting started with selling
              </h4>
              <div className="sellerRegister-text1">
                Your first sales could be right around the corner, but first it
                can help to understand the essentials. Here are a few useful
                steps and things to know before selling on NextMe.
              </div>
              <br />

              <h4 className="sellerRegister-subHeading">
                2. Select Business Details
              </h4>
              <div className="sellerRegister-text1">
                You must select your businesss location, where you are planning
                to do the business. and select the business type from the
                available options. You can also add your TRN Number and Trade
                Liscence Number if you have. <br />
                <br />
                <b>Business Type:</b> Are you Manufacture or brand owner (or
                agent or representiative of the brand) for the products you want
                to sell on NextME
                <br /> <br />
                <b>TRN Number :</b> You must complete identity verification to
                become successfully registered as a seller on the NextMe
                Australia store. Follow this step-by-step guide and the tips on
                each page to help prevent delays in your registration. <br />
                <br />
                <b>UPSCS :</b> Do you have Universal product code (UPSCs) for
                all your products <br />
                <br />
                <b>Own Products :</b> Are you Manufacture or brand owner (or
                agent or representiative of the brand) for the products you want
                to sell on NextME
                <br />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {OpenPicker ? (
        <LocationPicker
          visible={OpenPicker}
          onCancel={() => setOpenPicker(false)}
          onChange={(value: any) =>
            form.setFieldValue("business_location", value)
          }
        />
      ) : null}
    </div>
  );
}

export default Step2;
