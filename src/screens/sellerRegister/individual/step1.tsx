import { useState } from "react";
import Country from "../../../config/countryCode.json";
import { Col, Container, Row } from "react-bootstrap";
import { Form, Input, Button, message, Radio, Select, Checkbox } from "antd";
import useToggle from "../../../shared/hook/useToggle";
import { Auth } from "../../../config/firebase";
import languagesList from "../../../config/languages.json";
import hobbiesList from "../../../config/hobbies.json";
import educationLevels from "../../../config/educationlevels.json";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import OtpModal from "../component/otpModal";
import { FaUsersGear } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { IoEarthSharp } from "react-icons/io5";
import React from "react";

function IndividualStep1({ register, loading, states, moveToNextStep, goBack }: any) {
  const [verification, setverification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [autho, setautho] = useState<any>(null);
  const [visible, toggleModal] = useToggle(false);
  const [error, setError] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [otpVerified, setOtpVerify] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const [form] = Form.useForm();
  const { Option } = Select;

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
      setFormData(values);
      setIsLoading(true);
      checkuser();
      let recaptchas = new RecaptchaVerifier(Auth, "recaptcha", {});
      let phone = `${values.code}${values.phone}`;
      let checkPhone: any = await signInWithPhoneNumber(
        Auth,
        phone,
        recaptchas
      );
      if (checkPhone?.verificationId) {
        setautho(checkPhone);
        setverification(true);
        toggleModal(true);
      } else {
        setError(true);
      }
      setIsLoading(false);
    } catch (err) {
      setverification(false);
      toggleModal(false);
      console.log("LoginPhone = = = >", err);
      setIsLoading(false);
      setError(true);
    }
  };

  const verifyOtp = async (otp: string) => {
    try {
      setOtpLoading(true);
      let verify = await autho.confirm(otp);
      if (verify?.user?.phoneNumber) {
        setOtpVerify(true);
        setError(false);
        register(formData);
        moveToNextStep();
      }
    } catch (err) {
      setOtpLoading(false);
      setError(true);
      messageApi.error(`invalid otp plase try again!`);
      setverification(false);
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div>
      {contextHolder}
      <Container>
        <Row>
          <Col md={4}>
            <Form
              form={form}
              onFinish={
                verification
                  ? () => {
                      alert("hello");
                    }
                  : LoginPhone
              }
              initialValues={{ code: "+91" }}
            >
              <div className="input-form-label">Enter Name</div>
              <Form.Item
                name={"name"}
                rules={[{ required: true, message: "name is required" }]}
              >
                <Input placeholder="Enter name" size="large" />
              </Form.Item>
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
                <Input placeholder="Enter email" size="large" />
              </Form.Item>
              <div className="input-form-label">Mobile Number</div>
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
                  size="large"
                  placeholder="Enter Phone Number"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </Form.Item>

              <div className="input-form-label">Gender</div>
              <Form.Item
                name={"gender"}
                rules={[{ required: true, message: "Gender is required" }]}
              >
                <Radio.Group size="large">
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Radio.Group>
              </Form.Item>
              <Row>
                <Col sm={6} xs={12}>
                  <div className="input-form-label">Age</div>
                  <Form.Item
                    name={"age"}
                    rules={[{ required: true, message: "Age is required" }]}
                  >
                    <Input placeholder="Enter Age" type="number" size="large" />
                  </Form.Item>
                </Col>
                <Col sm={6} xs={12}>
                  <div className="input-form-label">Prefered Language</div>
                  <Form.Item
                    name={"language"}
                    rules={[
                      {
                        required: true,
                        message: "Preferred Language is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Language"
                      size="large"
                      showSearch={true}
                    >
                      {languagesList.map((language) => (
                        <Option key={language.code} value={language.code}>
                          {language.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <div className="input-form-label">Education</div>
              <Form.Item name="education">
                <Select placeholder="Educational Qualification" size="large">
                  {educationLevels.map((level) => (
                    <Option key={level.key} value={level.key}>
                      {level.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <div className="input-form-label">Emirates</div>
              <Form.Item
                name={"business_location"}
                rules={[{ required: true, message: "Location is required" }]}
              >
                <Select placeholder="States" size="large">
                  {states?.map((item: any) => {
                    return (
                      <Select.Option key={item.id} value={item.name}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <div className="input-form-label">Visa Status</div>
              <Form.Item
                name={"visa_status"}
                rules={[{ required: true, message: "Visa Status is required" }]}
              >
                <Select placeholder="Select Visa Status" size="large">
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="expired">Expired</Select.Option>
                </Select>
              </Form.Item>

              <div className="input-form-label">Interest</div>
              <Form.Item
                name={"interest"}
                rules={[{ required: true, message: "Interest is required" }]}
              >
                <Select
                  placeholder="Select Interest"
                  size="large"
                  showSearch={true}
                >
                  {hobbiesList.map((interest) => (
                    <Option key={interest.hobby} value={interest.hobby}>
                      {interest.hobby}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Checkbox>
                By continuing, I agree to Gold Bazar’s{" "}
                <a href="/terms-and-conditions" target="_blank">
                  Terms of Use
                </a>{" "}
                &{" "}
                <a href="/disclaimer-policy" target="_blank">
                  Privacy Policy
                </a>
              </Checkbox>
              <Row>
                <Col>
                  <br />
                  <Form.Item>
                    {verification ? null : <div id="recaptcha"></div>}
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isLoading || loading}
                      size="large"
                      block
                    >
                      {error ? "Resend OTP" : "Submit & Continue"}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col md={8}>
            <div className="sellerRegister-box2">
              <p className="sellerRegister-subHeading">
                Grow your business faster by selling on Gold Bazar
              </p>
              <p className="sellerRegister-text1">
                Accelerate your business growth on Gold Bazar, a dynamic marketplace
                connecting sellers with a vast and engaged audience. Leverage
                cutting-edge features, seamless user experience, and data-driven
                insights to elevate your brand and boost sales. Join Gold Bazar now
                and propel your business into the future of online commerce.
              </p>
              <Row>
                {data.map((item, index) => (
                  <Col md={6} key={index}>
                    <div className="IndividualStep1-Box1">
                      <div style={{ marginTop: 10 }}>{item.icon}</div>
                      <div style={{ marginLeft: 10 }}>
                        <div className="sellerRegister-text2 mt-3">
                          {item.count}
                        </div>
                        <div className="sellerRegister-text1">{item.text}</div>
                      </div>
                    </div>
                    <br />
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
        <br />
      </Container>
      <OtpModal
        open={visible}
        closeModal={() => toggleModal()}
        getOtp={verifyOtp}
        loading={otpLoading}
      />
    </div>
  );
}

const data = [
  {
    icon: <FaUsersGear size={20} color="grey" />,
    count: "11 lakh+",
    text: "Suppliers are selling commission-free",
  },
  {
    icon: <FaLocationDot size={20} color="grey" />,
    count: "19000+",
    text: "Pincodes supported for delivery",
  },
  {
    icon: <TbCategoryFilled size={20} color="grey" />,
    count: "700 +",
    text: "Categories to sell",
  },
  {
    icon: <IoEarthSharp size={20} color="grey" />,
    count: "Crore of",
    text: "Customers buy across world",
  },
];
export default IndividualStep1;
