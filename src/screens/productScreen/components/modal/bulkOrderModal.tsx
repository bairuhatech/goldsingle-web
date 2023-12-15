import React, { useEffect, useRef, useState } from "react";
import { Modal, Spin } from "antd";
import { Button, Form, Input, Radio, notification } from "antd";
import { PUT } from "../../../../utils/apiCalls";
import API from "../../../../config/API";
import TextArea from "antd/es/input/TextArea";
const OrderBulkModal = (props: any) => {
  const [form] = Form.useForm();
  const [Notifications, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState("");

  useEffect(() => {}, []);
  const formSubmitHandler = async (values: any) => {
    props?.setQuantity(Number(values?.quantity));
    props?.modalClose();
    form.resetFields()
  };

  return (
    <Modal
      title={`Order Bulk`}
      open={props?.open}
      okText="Order"
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
          label="Quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please Input Quantity",
            },
          ]}
        >
          <Input placeholder="Quantity" type="number" />
        </Form.Item>

        <div className="d-flex gap-2 justify-content-end">
          <Button
            type="primary"
            loading={action == "approved" ? isLoading : false}
            onClick={() => {
              form.submit();
            }}
          >
            {"OK"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default OrderBulkModal;
