import React, { useEffect, useState } from "react";
import { Modal, Select, Spin } from "antd";
import { Button, Form, Input, Radio, notification } from "antd";
import { POST, PUT } from "../../utils/apiCalls";
import API from "../../config/API";
import useFetch from "../../shared/hook/fetchData";
const update = "update";
const ProductsModal = (props: any) => {
  const [form] = Form.useForm();
  const [Notifications, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const type = props?.type;
  const { Option } = Select;
  const { data: category, isLoading: loading1 } = useFetch(API.CATEGORY, false);
  const [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
    if (type == update) {
      form.setFieldsValue({
        image: props?.data?.image,
        name: props?.data?.name,
        category: props?.data?.category,
        subCategory: props?.data?.subCategory,
        price: props?.data?.price,
        description: props?.data?.description,
      });
    } else {
      form.resetFields();
    }
  }, [props.data, type]);
  const formSubmitHandler = async (values: any) => {
    const url =
      type == update ? API.PRODUCTS_CREATE + props?.data?._id : API.PRODUCTS_CREATE;
    setIsLoading(true);
    try {
      const response: any =
        type == update ? await PUT(url, values) : await POST(url, values);
      if (response?.status) {
        Notifications["success"]({
          message: "Success",
          description: `Successfully ${
            type == update ? "updated" : "Added"
          } the item`,
        });
        form.resetFields();
        props?.modalClose();
        props?.getProducts(props?.page);
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
  const categoryChangeHandler = (item2: any) => {
    const index = category.findIndex((item: any) => item.id == item2);
    if (index != -1) {
      setSubCategories(category[index]?.sub_categories);
    }
  };
  return (
    <Modal
      title={`${type == update ? "Update" : "Add New"} Product`}
      open={props?.open}
      onOk={form.submit}
      onCancel={() => {
        props?.modalClose();
        form.resetFields();
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
          label="Name"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Please Enter Name",
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[
            {
              required: true,
              message: "Please Enter ImageURL",
            },
          ]}
        >
          <Input placeholder="Image" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please Enter Category",
            },
          ]}
        >
          <Select
            bordered={false}
            style={{ width: "100%" }}
            className="border rounded"
            allowClear
            defaultValue={"Select Category"}
            onChange={categoryChangeHandler}
          >
            {category?.map((item: any, index: number) => (
              <Option key={index} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Sub Category"
          name="subCategory"
          rules={[
            {
              required: true,
              message: "Please Enter SubCategory",
            },
          ]}
        >
          <Select
            bordered={false}
            style={{ width: "100%" }}
            className="border rounded"
            allowClear
            defaultValue={"Select SubCategory"}
            onChange={categoryChangeHandler}
          >
            {subCategories?.map((item: any, index: number) => (
              <Option key={index} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please Enter Price",
            },
          ]}
        >
          <Input placeholder="Price" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please Enter Description",
            },
          ]}
        >
          <Input placeholder="Description" />
        </Form.Item>
        <div className="d-flex gap-2 justify-content-end">
          <Button onClick={props?.modalClose}>Cancel</Button>
          <Button type="primary" loading={isLoading} onClick={form.submit}>
            {type == update ? "Update" : "Add"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProductsModal;
