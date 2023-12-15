import React, { useEffect, useRef, useState } from "react";
import { Modal, Spin } from "antd";
import { Button, Form, Input, Radio, notification } from "antd";
import { PUT } from "../../../utils/apiCalls";
import API from "../../../config/API";
import TextArea from "antd/es/input/TextArea";
const ApproveOrRejectModal = (props: any) => {
  const [form] = Form.useForm();
  const [Notifications, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState("");

  const isCorporateType = props.type === "coorporate";

  useEffect(() => {}, []);
  const formSubmitHandler = async (values: any) => {
    const obj = {
      ...values,
      status_remark: values?.remark,
      status: action,
    };
    try {
      setIsLoading(true);

      const url =
        props?.type === "coorporate"
          ? API.CORPORATE_STORE_UPDATE_STATUS + props?.data?.id
          : props?.type === "individual"
          ? API.INDIVIDUAL_STORE_UPDATE_STATUS + props?.data?.id
          : null;

      const response: any = await PUT(url, obj);
      if (response.status) {
        Notifications["success"]({
          message: "Status updated successfully",
        });
        props?.getSellerDetails();
        props?.modalClose();
        form.resetFields();
      }
    } catch (err) {
      Notifications["error"]({
        message: "Failed to update Status",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={
        isCorporateType
          ? "Approve or Reject Seller Request"
          : "Reject Seller Request"
      }
      open={props?.open}
      okText="Update"
      centered
      footer={false}
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
        initialValues={{ status: "rejected" }}
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
          {isCorporateType && (
            <Button
              loading={action === "approved" ? isLoading : false}
              type="primary"
              onClick={() => {
                setAction("approved");
                form.submit();
              }}
            >
              Approve
            </Button>
          )}
          <Button
            loading={action === "rejected" ? isLoading : false}
            type="primary"
            onClick={() => {
              setAction("rejected");
              form.submit();
            }}
          >
            Reject
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ApproveOrRejectModal;
