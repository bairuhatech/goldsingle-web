import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../styles.scss";
import { Button, Form, Input, message } from "antd";
import API from "../../../../config/API";
import { PUT } from "../../../../utils/apiCalls";
import { useDispatch } from "react-redux";
import { update } from "../../../../redux/slices/userSlice";
import userimage from "../../../../assets/images/imageeeeeeeeeeeeeeeeeeeeeeee.png";
const EditName = (props: any) => {
  const dispatch = useDispatch();
  const User = useSelector((state: any) => state.User.user);

  const [loading, setLoading] = useState(false);
  const updateName = async (item: any) => {
    const obj = {
      first_name: item.first_name,
      last_name: item.last_name,
    };

    const url = API.USER_NAME_UPDATE + `/${User.data._id}`;
    setLoading(true);

    try {
      const Response: any = await PUT(url, obj);
      if (Response.status) {
        dispatch(update(Response?.data));
        message.success("Successfully Updated your Name");
        props.close();
      }
    } catch (error) {
      console.error("Error updating name:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editName-Text1">
      <div
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          textAlign: "center",
        }}
      >
        <img style={{ width: "100%", height: "150px" }} src={userimage} />
      </div>
      <br />

      <p className="editName-Text2">Change Your Full Name Here,</p>
      <Form
        onFinish={updateName}
        initialValues={{
          first_name: User?.data?.first_name,
          last_name: User?.data?.last_name,
        }}
      >
        <div>Enter Your First Name</div>
        <Form.Item name="first_name">
          <Input size="large"></Input>
        </Form.Item>
        <div>Enter Your Last Name</div>

        <Form.Item name="last_name">
          <Input size="large"></Input>
        </Form.Item>

        <Button
          block
          type="primary"
          htmlType="submit"
          loading={loading}
          size="large"
        >
          Save
        </Button>
      </Form>
    </div>
  );
};

export default EditName;
