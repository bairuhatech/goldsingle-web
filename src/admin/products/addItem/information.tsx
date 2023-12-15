import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { Row, Col, Container } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextArea from "antd/es/input/TextArea";
import React from "react";
function Information(props: any) {
  const [subCategories, setSubCategories] = useState<any>([]);
  const [specifications, setSpecifications] = useState(props?.data?.description);

  const categoryChangeHandler = (value: any) => {
    const index: any = props?.categories?.findIndex(
      (item: any) => item.id == value
    );
    if (index != -1) {
      let item = props?.categories[index]?.sub_categories;
      setSubCategories(item);
    }
  };

  const submit = async (values: any) => {
    try {
      console.log("value", values);
      let obj = values;
      obj["specifications"] = specifications;
      props.onChange(obj);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Container>
      <Form
        onFinish={submit}
        initialValues={{
          bar_code: props?.data?.bar_code,
          sku: props?.data?.sku,
          brand: props?.data?.brand,
          bulk_order: props?.data?.bulk_order,
          category: props?.data?.category,
          manufacture: props?.data?.manufacture,
          purchase_rate: props?.data?.purchase_rate,
          retail_rate: props?.data?.retail_rate,
          status: props?.data?.status,
          subCategory: props?.data?.subCategory,
          name: props?.data?.name,

          unit: props?.data?.unit,
          units: props?.data?.units,
        }}
      >
        <Row>
          <Col sm={6}>
            <div className="input-form-label">Category *</div>
            <Form.Item
              name={"category"}
              rules={[{ required: true, message: "" }]}
            >
              <Select
                style={{ width: "100%" }}
                className="border rounded"
                allowClear
                onChange={categoryChangeHandler}
                placeholder="Select category"
              >
                {props?.categories?.map((item: any, index: number) => (
                  <Select.Option key={index} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <div className="input-form-label">Sub Category *</div>
            <Form.Item
              name={"subCategory"}
              rules={[{ required: true, message: "" }]}
            >
              <Select
                style={{ width: "100%" }}
                className="border rounded"
                allowClear
                onChange={categoryChangeHandler}
                placeholder="Select category"
              >
                {subCategories?.map((item: any, index: number) => (
                  <Select.Option key={index} value={item._id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <div className="input-form-label">Product Title *</div>
            <Form.Item name={"name"} rules={[{ required: true, message: "" }]}>
              <Input placeholder="Title" />
            </Form.Item>
            <div className="input-form-label">Description *</div>
            <Form.Item
              name={"description"}
              rules={[{ required: true, message: "" }]}
            >
              <TextArea rows={4} placeholder="Description" maxLength={250} />
            </Form.Item>
          </Col>
          <Col sm={6}>
            <div className="input-form-label">Brand</div>
            <Form.Item name={"brand"}>
              <Input placeholder="Brand Name" />
            </Form.Item>
            <div className="input-form-label">Manufactor</div>
            <Form.Item name={"manufacture"}>
              <Input placeholder="Manufactor" />
            </Form.Item>
            <Row>
              <Col sm={6}>
                <div className="input-form-label">Product SKU *</div>
                <Form.Item
                  name={"sku"}
                  rules={[{ required: true, message: "" }]}
                >
                  <Input placeholder="sku" />
                </Form.Item>
              </Col>
              <Col sm={6}>
                <div className="input-form-label">Barcode</div>
                <Form.Item name={"bar_code"}>
                  <Input placeholder="Barcode" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <div className="input-form-label">Purchase Price</div>
                <Form.Item
                  name={"purchase_rate"}
                  rules={[{ required: true, message: "" }]}
                >
                  <Input placeholder="0.00" type="number" />
                </Form.Item>
              </Col>
              <Col sm={6}>
                <div className="input-form-label">Retail Price</div>
                <Form.Item
                  name={"retail_rate"}
                  rules={[{ required: true, message: "" }]}
                >
                  <Input placeholder="0.00" type="number" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <div className="input-form-label">Unit</div>
                <Form.Item name={"unit"}>
                  <Input placeholder="Unit" type="number" />
                </Form.Item>
              </Col>
              <Col sm={6}>
                <div className="input-form-label">Available Unit</div>
                <Form.Item name={"units"}>
                  <Input placeholder="Available" />
                </Form.Item>
              </Col>
              <Col sm={6}>
                <div className="input-form-label">Accept bulk orders</div>
                <Form.Item
                  name={"bulk_order"}
                  rules={[{ required: true, message: "" }]}
                  valuePropName="checked"
                >
                  <Select
                    style={{ width: "100%" }}
                    allowClear
                    placeholder="Accept bulk orders"
                  >
                    <Select.Option value={true}>Accept</Select.Option>
                    <Select.Option value={false}>Not Accept</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col sm={6}>
                <div className="input-form-label">Product Status</div>
                <Form.Item
                  name={"status"}
                  rules={[{ required: true, message: "" }]}
                  valuePropName="checked"
                >
                  <Select
                    style={{ width: "100%" }}
                    allowClear
                    placeholder="Product Status"
                  >
                    <Select.Option value={true}>Available</Select.Option>
                    <Select.Option value={false}>Not Available</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="input-form-label">
          Product Description and specifications
        </div>
        <div style={{ height: "270px" }}>
          <ReactQuill
            theme="snow"
            value={specifications}
            onChange={setSpecifications}
            style={{ height: "220px" }}
          />
        </div>

        <br />
        <Row>
          <Col sm={6}></Col>
          <Col sm={2}>
            <Button size="large" block onClick={() => props?.onBack()}>
              Back
            </Button>
          </Col>
          <Col sm={4}>
            <Form.Item>
              <Button size="large" block type="primary" htmlType="submit">
                Continue
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
export default Information;
