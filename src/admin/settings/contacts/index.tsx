import { Button, Form, Input, Select, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../config/API";
import { storeSettings } from "../../../redux/slices/settingsSlice";
import { PUT } from "../../../utils/apiCalls";

function Contacts() {
  const [form] = Form.useForm();
  const Settings = useSelector((state: any) => state.Settings.Settings);
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const updateContacts = async (values: any) => {
    const url = API.SETTINGS + Settings.id;
    setUpdating(true);
    try {
      const updated: any = await PUT(url, values);
      if (updated.status) {
        dispatch(storeSettings(updated.data));
        messageApi.success(`Contacts updated successfully.`);
      }
    } catch (err) {
      messageApi.success(`Something went wrong!`);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      {contextHolder}
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        layout="vertical"
        onFinish={updateContacts}
        initialValues={{
          adminEmail: Settings.adminEmail,
          supportInfoEmail: Settings.supportInfoEmail,
          contactEmail: Settings.contactEmail,
          contactNumber: Settings.contactNumber,
          address: Settings.address,
        }}
      >
        <Form.Item
          label="Admin Email"
          name="adminEmail"
          rules={[
            {
              type: "email",
              message: "Invalid email format",
            },
            {
              required: true,
              message: "Please Enter Admin Email",
            },
          ]}
        >
          <Input placeholder="Admin Email" />
        </Form.Item>
        <Form.Item
          label="SupportInfo Email"
          name="supportInfoEmail"
          rules={[
            {
              type: "email",
              message: "Invalid email format",
            },
            {
              required: true,
              message: "Please Enter SupportInfo Email",
            },
          ]}
        >
          <Input placeholder="SupportInfo Email" />
        </Form.Item>
        <Form.Item
          label="Contact Email"
          name="contactEmail"
          rules={[
            {
              type: "email",
              message: "Invalid email format",
            },
            {
              required: true,
              message: "Please Enter Contact Email",
            },
          ]}
        >
          <Input placeholder="Contact Email" />
        </Form.Item>
        <Form.Item
          label="Contact Number"
          name="contactNumber"
          rules={[
            {
              required: true,
              message: "Please Enter Contact Number",
            },
          ]}
        >
          <Input placeholder="Contact Number" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please Enter Address",
            },
          ]}
        >
          <Input.TextArea placeholder="Address" />
        </Form.Item>

        <div className="d-flex gap-2 justify-content-end">
          <Button
            type="primary"
            loading={updating}
            onClick={() => {
              form.submit();
            }}
          >
            Update Contacts
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default Contacts;
