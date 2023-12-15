import React, { useState } from "react";
import "./styles.scss"; // Import your CSS file for styling
import { Button, Input, Popover, Form, message } from "antd";
import { AiOutlineMessage, AiOutlineWhatsApp } from "react-icons/ai";
import { PiPhoneCall } from "react-icons/pi";
import { IoMailOutline } from "react-icons/io5";
import { POST } from "../../utils/apiCalls";
import API from "../../config/API";
import { useSelector } from "react-redux";

const FloatingButton = () => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const Settings = useSelector((state: any) => state.Settings.Settings);
  // console.log(Settings?.contactNumber, Settings?.contactEmail);

  const handlePopoverVisibleChange = (visible: any) => {
    setPopoverVisible(visible);
  };

  const OnFinsh = async (values: any) => {
    console.log(values, "values");

    try {
      let url = API.ENQUIRY_CREATE;
      let Obj = {
        email: values?.email,
        message: values?.message,
      };
      let response: any = await POST(url, Obj);
      console.log("response", response);
      if (response.status) {
        message.success("succesfully added");
        setPopoverVisible(false);
      }
    } catch (error) {
      console.error("error");
    }
  };
  const content = (
    <div className="popoverInnerContainer">
      <a className="socialMediaContainer" href="#">
        <a href={`https://wa.me/${Settings?.contactNumber}`} target="_blank">
          <AiOutlineWhatsApp size={32} color="green" />
        </a>
        <span>Sent Us on Whatsapp</span>
      </a>
      <a className="socialMediaContainer" href="#">
        <a href={`tel:${Settings?.contactNumber}`}>
          <PiPhoneCall size={32} color="#3c4b9e" />
        </a>
        <span>custommer Support</span>
      </a>
      <a className="socialMediaContainer" href="#">
        <a href={`mailto:${Settings?.contactEmail}`}>
          <IoMailOutline size={32} color="#000" />
        </a>
        <span>Draft an Email</span>
      </a>
      <Form className="customMsg" onFinish={OnFinsh}>
        <Form.Item name="email">
          <Input
            size="large"
            placeholder="Enter Email"
            className="mb-3"
            required
          />
        </Form.Item>
        <Form.Item name="message">
          <Input.TextArea
            required
            size="large"
            rows={4}
            placeholder="Type your message..."
            className="message-input mb-3"
          />
        </Form.Item>
        <div className="FloatingButton-Btn1">
          <Button
            type="primary"
            className="send-button"
            htmlType="submit"
            size="large"
            style={{ width: "60%" }}
          >
            Send
          </Button>
        </div>
      </Form>
    </div>
  );
  return (
    <div className="floating-button-container">
      <Popover
        title={<span className="floating-txt1">Connect With Us</span>}
        className="popover-main"
        placement="topRight"
        content={content}
        trigger="click"
        open={popoverVisible}
        onOpenChange={handlePopoverVisibleChange}
      >
        <button className="floating-button">
          <AiOutlineMessage size={25} />
        </button>
      </Popover>
    </div>
  );
};

export default FloatingButton;
