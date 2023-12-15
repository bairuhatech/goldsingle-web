import React, { useEffect, useState } from "react";
import { DatePicker, InputNumber, Modal } from "antd";
import { Button, Form, Input, notification } from "antd";
import { POST, PUT } from "../../utils/apiCalls";
import API from "../../config/API";

import ImagePicker from "../components/ImagePicker";
import { useSelector } from "react-redux";
import moment from "moment";

const update = "update";
const OffersModal = (props: any) => {
  const [form] = Form.useForm();
  const [Notifications, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const type = props?.type;
  const [image, setImage] = useState<any>({});
  const User = useSelector((state: any) => state.User.user);
  useEffect(() => {
    const date = new Date(props?.data?.startDate).toLocaleDateString();
    if (type == update) {
      form.setFieldsValue({
        title: props?.data?.title,
        percentage: props?.data?.percentage,
        amount: props?.data?.amount,
        startDate: moment(props?.data?.startDate),
        endDate: moment(props?.data?.endDate),
        image: props?.data?.image,
      });
    } else {
      form.resetFields();
    }
  }, [props.data, type]);

  const formSubmitHandler = async (values: any) => {
    const url = type == update ? API.OFFERS + props?.data?.id : API.OFFERS;
    console.log(values);
    setIsLoading(true);
    try {
      const imageUrl = image.file ? props?.data?.image : props?.data?.image;
      const obj = {
        ...values,
        image: imageUrl,
      };
      const response: any =
        type == update ? await PUT(url, obj) : await POST(url, obj);
      if (response?.status) {
        Notifications["success"]({
          message: "Success",
          description: `Successfully ${
            type == update ? "updated" : "Added"
          } the item`,
        });
        form.resetFields();
        props?.modalClose();
        props?.getOffers(props?.page);
        setImage({});
      } else {
        Notifications["error"]({
          message: `Failed to ${type == update ? "Update" : "Add New Item"}`,
          description: response.message,
        });
      }
    } catch (err: any) {
      Notifications["error"]({
        message: `Failed to ${type == update ? "Update" : "Add New Item"}`,
        description: err.message,
      });
    }
    setIsLoading(false);
  };

  return (
    <Modal
      title={`${type == update ? "Update" : "Add New"} Offer`}
      open={props?.open}
      onOk={form.submit}
      onCancel={() => {
        props?.modalClose();
        setImage({});
      }}
      okText="Update"
      centered
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      {contextHolder}
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        layout="vertical"
        onFinish={formSubmitHandler}
      >
        <Form.Item
          name={"image"}
          label="Image"
          rules={[
            {
              required: true,
              message: "Please Select Image",
            },
          ]}
        >
          <ImagePicker
            onChange={(file: any) => {
              setImage(file);
            }}
            fileURL={
              image?.url
                ? image.url
                : type == update
                ? props?.data?.image
                : null
            }
          />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please Enter Title",
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Percentage"
          name="percentage"
          rules={[
            {
              required: true,
              message: "Please Enter Percentage",
              type: "number",
            },
          ]}
        >
          <InputNumber className="w-100" />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please Enter Amount",
            },
          ]}
        >
          <InputNumber className="w-100" />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[
            {
              required: true,
              message: "Please Select Start Date",
            },
          ]}
        >
          <DatePicker
            className="w-100"
            placeholder="DD/MM/YYYY"
            allowClear={false}
          />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="endDate"
          rules={[
            {
              required: true,
              message: "Please Select End Date",
            },
          ]}
        >
          <DatePicker
            className="w-100"
            placeholder="DD/MM/YYYY"
            allowClear={false}
          />
        </Form.Item>
        <div className="d-flex gap-2 justify-content-end">
          <Button
            onClick={() => {
              props?.modalClose();
              setImage({});
            }}
          >
            Cancel
          </Button>
          <Button type="primary" loading={isLoading} onClick={form.submit}>
            {type == update ? "Update" : "Add"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default OffersModal;
