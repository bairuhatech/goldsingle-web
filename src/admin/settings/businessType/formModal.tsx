import React, { useEffect } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { POST, PUT } from "../../../utils/apiCalls";
import API from "../../../config/API";

const FormModal = (props: any) => {
  const [form] = Form.useForm();
  const { open, modalClose, getBusinesstype, type, page } = props;

  const [Notifications, contextHolder] = notification.useNotification();
  useEffect(() => {
    if (type === "update") {
      form.setFieldsValue({
        name: props?.data?.name,
        description: props?.data?.description,
      });
    } else {
      form.resetFields();
    }
  }, [props.data, type]);

  const formSubmitHandler = async (values: any) => {
    const url = API.BUSINESS_TYPE + type === "update" ? +props?.data?.id : "";
    try {
      const response: any =
        type === "update" ? await PUT(url, values) : await POST(url, values);
      if (response.status) {
        Notifications["success"]({
          message: "Success",
          description: `Successfully ${
            type === "update" ? "updated" : "added"
          } the business type`,
        });
        form.resetFields();
        modalClose();
        getBusinesstype(page);
      } else {
        Notifications["error"]({
          message: `Failed to ${type === "update" ? "update" : "add"}`,
          description: response.message,
        });
      }
    } catch (err: any) {
      Notifications["error"]({
        message: `Failed to ${type === "update" ? "update" : "add"}`,
        description: err.message,
      });
    }
  };

  return (
    <Modal
      title="Add Business Type"
      visible={open}
      onCancel={() => {
        modalClose();
        form.resetFields();
      }}
      footer={[
        <Button key="cancel" onClick={() => modalClose()}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Add
        </Button>,
      ]}
    >
      {contextHolder}
      <Form form={form} layout="vertical" onFinish={formSubmitHandler}>
        <Form.Item
          label="Title"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter the title",
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter the description",
            },
          ]}
        >
          <Input.TextArea placeholder="Description" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormModal;
