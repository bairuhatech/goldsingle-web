import React, { useEffect, useRef, useState } from "react";
import { Modal, Spin } from "antd";
import { Button, Form, Input, Radio, notification } from "antd";
import { POST, PUT } from "../../../utils/apiCalls";
import API from "../../../config/API";
import TextArea from "antd/es/input/TextArea";
const RequestDocumentModal = (props: any) => {
  const [form] = Form.useForm();
  const [Notifications, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);
  const formSubmitHandler = async (values: any) => {
    const obj = {
      id: props?.data?.id,
      subject: values?.remark,
      to: props?.data?.email,
    };
    try {
      setIsLoading(true);
      const url =
        props?.type == "coorporate"
          ? API.CORPORATE_STORE_REQUEST_DOCUMENT
          : props?.type == "individual"
          ? API.INDIVIDUAL_STORE_REQUEST_DOCUMENT
          : null;
      const response: any = await POST(url, obj);
      if (response.status) {
        Notifications["success"]({
          message: "Requested for More documents.",
          description: "Email send successfully.",
        });
        props?.modalClose();
        form.resetFields();
      }
    } catch (err) {
      Notifications["error"]({
        message: "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={`Request More Documents`}
      open={props?.open}
      okText="Request"
      centered
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      onCancel={() => {
        props?.modalClose();
      }}
    >
      {contextHolder}
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        layout="vertical"
        onFinish={formSubmitHandler}
      >
        <Form.Item
          label="Remark"
          name="remark"
          rules={[
            {
              required: true,
              message: "Please Enter Remark",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Remark" />
        </Form.Item>

        <div className="d-flex gap-2 justify-content-end">
          <Button
            type="primary"
            loading={isLoading}
            onClick={() => {
              form.submit();
            }}
          >
            {"Request Document"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default RequestDocumentModal;
