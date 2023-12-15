import { Button, Form, Input } from "antd";
import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ImagePicker from "../components/ImagePicker";
import { MdEditSquare } from "react-icons/md";
import React from "react";
const VariantFromTable = (props: any) => {
  const [form] = Form.useForm();
  const finish = (value: any) => {
    props.onChange(value);
  };

  const updateImage = (value: any, index: number) => {
    try {
      const values = form.getFieldValue(["variants"]);
      values[index].image = value;
      form.setFieldsValue({ [`variants`]: values });
    } catch (err) {
      console.log("err", err);
    }
  };

  const removeImage = (index: number) => {
    try {
      console.log("index", index);
    } catch (err) {}
  };
  return (
    <Form
      form={form}
      onFinish={finish}
      initialValues={{ variants: props?.data }}
    >
      <div style={{ minHeight: "64vh" }}>
        <Table responsive bordered size="sm">
          <thead>
            <tr>
              <td>Image</td>
              <td>Variant</td>
              <td>Price</td>
              <td>Units</td>
              <td>SKU</td>
              <td>Barcode</td>
              <td></td>
            </tr>
          </thead>
          <Form.List name="variants">
            {(fields, { add, remove }) => (
              <tbody>
                {fields.map(({ key, name, ...restField }, index) => (
                  <tr key={index}>
                    <td style={{ width: 50 }}>
                      <Form.Item
                        noStyle
                        {...restField}
                        name={[name, "image"]}
                        rules={[{ required: true, message: "" }]}
                      >
                        <ImagePicker
                          size={"small"}
                          fileURL={
                            form.getFieldValue(["variants", name]).image?.url
                          }
                          remove={() => removeImage(index)}
                          onChange={(value: any) => updateImage(value, name)}
                        />
                      </Form.Item>
                    </td>
                    <td style={{ width: 300 }}>
                      <Form.Item
                        noStyle
                        {...restField}
                        name={[name, "combination"]}
                        rules={[{ required: true, message: "" }]}
                      >
                        <div className="VariantFromTable-txt1">
                          {props.data[key].combination.map(
                            (fla: any, indexo: number) => {
                              let valo = "";
                              valo =
                                valo +
                                (indexo === 0 ? `${fla?.variant}:${fla?.value}` : " / " + `${fla?.variant}:${fla?.value}`);
                              return valo;
                            }
                          )}
                        </div>
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item
                        noStyle
                        {...restField}
                        name={[name, "price"]}
                        rules={[{ required: true, message: "" }]}
                      >
                        <Input />
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item
                        noStyle
                        {...restField}
                        name={[name, "units"]}
                        rules={[{ required: true, message: "" }]}
                      >
                        <Input />
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item
                        noStyle
                        {...restField}
                        name={[name, "sku"]}
                        rules={[{ required: true, message: "" }]}
                      >
                        <Input />
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item
                        noStyle
                        {...restField}
                        name={[name, "barcode"]}
                        rules={[{ required: true, message: "" }]}
                      >
                        <Input />
                      </Form.Item>
                    </td>
                    <td style={{ width: 10 }}>
                      <Button type="link" onClick={()=>{console.log(props?.data[key])}}>
                        <MdEditSquare />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </Form.List>
        </Table>
      </div>
      <Row>
        <Col sm={2}>
          <Button onClick={() => props.edit()} type="link">
            Edit Variants
          </Button>
        </Col>
        <Col sm={4}></Col>

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
  );
};

export default VariantFromTable;
