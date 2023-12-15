

// export default EditEmail;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles.scss";
import { Button, Form, Input, message } from "antd";
import { PUT } from "../../../../utils/apiCalls";
import API from "../../../../config/API";
import { update } from "../../../../redux/slices/userSlice";
import emailimage from "../../../../assets/images/emailllll.jpg";
const EditEmail = (props: any) => {
  const User = useSelector((state: any) => state.User.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const updateEmail = async (values: any) => {
    const obj = {
      email: values.email,
    };

    const url = API.USER_EMAIL_UPDATE + `/${User.data._id}`;
    try {
      setIsLoading(true);
      const Response: any = await PUT(url, obj);
      message.success("Email Updated Successfully");
      dispatch(update(Response?.data));
      props.close();
    } catch (error) {
      console.error("Error updating email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="editEmail-Text1">
      <div
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          textAlign: "center",
        }}
      >
        <img style={{ width: "200px", height: "150px" }} src={emailimage} />
      </div>

      <div className="editEmail-Text2">Change Your Email Here,</div>
      <br />
      <Form onFinish={updateEmail}>
        <div>Enter Your Email</div>
        <Form.Item name="email">
          <Input
            defaultValue={
              User?.data?.email ? User?.data?.email : User?.data?.data?.email
            }
            id="email"
            size="large"
          />
        </Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          loading={isLoading}
          size="large"
        >
          Save
        </Button>
      </Form>
    </div>
  );
};

export default EditEmail;
