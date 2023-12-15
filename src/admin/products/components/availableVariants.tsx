import { Button, Form, Input, Popconfirm } from "antd";
import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ImagePicker from "../components/ImagePicker";
import { MdDeleteOutline, MdEditSquare } from "react-icons/md";
import React, { useEffect, useState } from "react";
const AvailableVariants = (props: any) => {
  const [form2] = Form.useForm();
  const finish = (value: any) => {
    props.onChange({ name: "amal" });
  };
  const updateImage = (value: any, index: number) => {
    try {
      const values = form2.getFieldValue(["variants"]);
      values[index].image = value;
      form2.setFieldsValue({ [`variants`]: values });
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    form2.setFieldsValue({
      variants: props?.data,
    });
  }, [props?.data]);

  const removeImage = (index: number) => {
    try {
      console.log("index", index);
    } catch (err) {}
  };
  console.log(props?.data)
  return (
    <Form form={form2} onFinish={finish} initialValues={{ variants: props?.data }}>
      <div>
        <Table responsive bordered size="sm">
          <thead>
            <tr>
              <td>Image</td>
              <td>Variant</td>
              <td>Price</td>
              <td>Units</td>
              <td>SKU</td>
              <td>Barcode</td>
              {/* <td></td> */}
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
                            form2.getFieldValue(["variants", name]).image
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
                          {props.data[key]?.combination?.map(
                            (fla: any, indexo: number) => {
                              let valo = "";
                              valo =
                                valo +
                                (indexo === 0
                                  ? `${fla?.variant}:${fla?.value}`
                                  : " / " + `${fla?.variant}:${fla?.value}`);
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
                        <Input readOnly={true}/>
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item
                        noStyle
                        {...restField}
                        name={[name, "units"]}
                        rules={[{ required: true, message: "" }]}
                      >
                        <Input readOnly={true}/>
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item
                        noStyle
                        {...restField}
                        name={[name, "sku"]}
                        rules={[{ required: true, message: "" }]}
                      >
                        <Input readOnly={true}/>
                      </Form.Item>
                    </td>
                    <td>
                      <Form.Item
                        noStyle
                        {...restField}
                        name={[name, "barcode"]}
                        rules={[{ required: true, message: "" }]}
                      >
                        <Input readOnly={true}/>
                      </Form.Item>
                    </td>
                    <td style={{ width: 10 }}>
                      <Popconfirm
                        placement="bottomRight"
                        title={"Are you sure to delete Variant?"}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={async () => {
                          await props?.deleteVariant(props?.data[key]);
                        }}
                      >
                        <Button type="link">
                          <MdDeleteOutline color="red" size={18} />
                        </Button>
                      </Popconfirm>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </Form.List>
        </Table>
      </div>
      <Row>
        <Col sm={2}></Col>
        <Col sm={4}></Col>

        <Col sm={3}></Col>
        <Col sm={3}>
          {/* <Form.Item>
            <Button
              size="large"
              block
              type="primary"
              onClick={() => form2.submit()}
            >
              Update Variants
            </Button>
          </Form.Item> */}
        </Col>
      </Row>
    </Form>
  );
};

export default AvailableVariants;
