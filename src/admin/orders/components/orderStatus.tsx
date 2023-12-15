import { Button, Card, Form, Input, Modal, Select, Steps, message } from "antd";
import Meta from "antd/es/card/Meta";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import React, { useState } from "react";
import API from "../../../config/API";
import { POST } from "../../../utils/apiCalls";
import OrderStatusData from "../../../config/orderStatus.json";
import { getOrderStatus } from "../../../shared/helpers/getOrderStatus";

const { Step } = Steps;

function OrderStatusCardAuth(props: any) {
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    const url = API.ORDER_STATUS_UPDATE;
    const obj = {
      orderId: props?.data?.id,
      ...values,
    };
    try {
      setLoading(true);
      const response: any = await POST(url, obj);
      if (response.status) {
        messageApi.success(`Order Status updated successfully.`);
        form.resetFields();
        setVisible(false);
        if (typeof props?.getOrderDetails == "function") {
          props?.getOrderDetails();
        }
      } else throw new Error(response.message);
    } catch (err) {
      messageApi.error(`Failed to update order Status`);
    } finally {
      setLoading(false);
    }

    const updatedStatus = {
      status: values.status,
      createdAt: moment().toISOString(),
      remarks: values.remark,
    };
  };
  return (
    <Card bordered={false}>
      {contextHolder}
      <Modal
        title="Update Order Status"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={form.submit}
            loading={loading}
          >
            Update Status
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          initialValues={{
            status: props?.data?.orderStatus[0]?.status,
          }}
        >
          <Form.Item
            rules={[{ required: true, message: "Please Select OrderStatus" }]}
            name={"status"}
          >
            <Select style={{ width: 200 }}>
              {OrderStatusData?.map((item: any, index: number) => {
                return (
                  <Option value={item.value} key={index}>
                    {item.title}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name={"remark"}
            rules={[{ required: true, message: "Please Enter Remarks" }]}
          >
            <TextArea rows={4} placeholder="Enter remark" />
          </Form.Item>
        </Form>
      </Modal>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Order Status: {getOrderStatus(props?.data?.status)}</span>
          <Button onClick={() => setVisible(true)}>Update Status</Button>
        </div>
        <div className="text-dark">
          <div>
            Order Date: {moment(props?.data?.createdAt).format("DD/MM/YYYY")}
          </div>
        </div>
      </div>

      <div className="mt-2">
        <h5>Order Status History</h5>
        {Array.isArray(props?.data?.orderStatus) == true ? (
          <Steps
            direction="vertical"
            current={props?.data?.orderStatus?.length}
          >
            {props?.data?.orderStatus?.map(
              (statusUpdate: any, index: number) => (
                <Step
                  key={index}
                  title={getOrderStatus(statusUpdate.status)}
                  description={
                    <>
                      <div>
                        {moment(statusUpdate.createdAt).format("DD/MM/YYYY")}
                      </div>
                      <div>{statusUpdate.remark}</div>
                    </>
                  }
                />
              )
            )}
          </Steps>
        ) : null}
      </div>
    </Card>
  );
}

export default OrderStatusCardAuth;
