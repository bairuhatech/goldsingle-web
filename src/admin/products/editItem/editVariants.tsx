import { useState } from "react";
import { Button, Form, Select, Alert } from "antd";
import { Col, Row } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import React from "react";
import AddVariantType from "../components/addVariantType";
import VariantFormUpdate from "../components/variantFormUpdate";
import AvailableVariants from "../components/availableVariants";

function UpdateVariants(props: any) {
  const [loading, setLoading] = useState(false);
  const [generate, setGenerate] = useState(
    props?.variantform?.variants?.length ? true : false
  );

  const [variants, setVariants] = useState(props?.variantform);
  const [combination, setCombination] = useState(props?.data);

  const generatePairs = async (values: any) => {
    try {
      props.variantformChange(values);
      setVariants(values);
      generatePair(values);
    } catch (err) {
      console.log("err", err);
    }
  };

  const generatePair = (values: any) => {
    try {
      setLoading(true);
      let arr = values?.variants;
      console.log(arr);
      const combinations: any = [];
      generateCombinations(arr, 0, [], combinations);
      setCombination(combinations);
      props.saveData(combinations);
      setGenerate(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("err", err);
    }
  };

  function generateCombinations(
    variants: any,
    currentIndex: any = 0,
    currentCombination: any = [],
    combinations: any = []
  ) {
    try {
      if (currentIndex === variants?.length) {
        combinations.push({
          combination: [...currentCombination],
          available: "0",
          barcode: "0",
          price: "0",
          sku: null,
          image: {},
        });
        return;
      }
      const currentVariant = variants[currentIndex];
      for (const valueObj of currentVariant.values) {
        const newCombination = [...currentCombination];
        newCombination.push({
          variant: currentVariant.variant,
          value: valueObj.value,
        });
        generateCombinations(
          variants,
          currentIndex + 1,
          newCombination,
          combinations
        );
      }
    } catch (err) {
      console.log("err = = = >", err);
    }
  }

  const submit = (value: any) => {
    props.onChange(value);
  };

  return (
    <div>
      {props?.product?.productVariant?.length ? (
        <>
          <h5>Available Variants</h5>
          <AvailableVariants
            data={props?.product?.productVariant}
            edit={() => {
              setGenerate(false);
            }}
            onBack={() => props?.onBack()}
            onChange={(value: any) => submit(value)}
            deleteVariant={props?.deleteVariant}
            loadingVariant={props?.loadingVariant}
          />
        </>
      ) : generate == false ? (
        <Alert
          description={
            <div>
              No Variants are available for this product. click the{" "}
              <b>Add New Variant</b> Button below to add New variants.
            </div>
          }
          type="warning"
          closable
        />
      ) : null}
      {generate ? (
        <>
          <h5>New Variants</h5>
          <VariantFormUpdate
            data={combination}
            edit={() => {
              setGenerate(false);
            }}
            onBack={() => props?.onBack()}
            onChange={(value: any) => submit(value)}
            loadingVariant={props?.loadingVariant}
            available={props?.product?.productVariant?.length}
            clearForm={props?.clearForm}
          />
        </>
      ) : (
        <Form
          onFinish={generatePairs}
          initialValues={{ variants: variants?.variants }}
          className="mt-2"
        >
          <Form.List name="variants">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <div className="AddVariantType-box2">
                    <Row style={{ marginBottom: 10 }}>
                      <Col sm={5}>
                        <div className="input-form-label">Option</div>
                        <Form.Item
                          noStyle
                          {...restField}
                          name={[name, "variant"]}
                          rules={[{ required: true, message: "" }]}
                        >
                          <Select style={{ width: "100%" }}>
                            <Select.Option value={"Color"}>Color</Select.Option>
                            <Select.Option value={"Size"}>Size</Select.Option>
                            <Select.Option value={"Material"}>
                              Material
                            </Select.Option>
                            <Select.Option value={"Style"}>Style</Select.Option>
                          </Select>
                        </Form.Item>
                        <div style={{ margin: 5 }} />
                        <div className="input-form-label">Option Value</div>
                        <AddVariantType fieldKey={name} />
                      </Col>
                      <Col sm={6}></Col>
                      <Col sm={1}>
                        <Button type="link" danger onClick={() => remove(name)}>
                          <RiDeleteBin6Line size={18} />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))}
                <br />

                <Row>
                  <Col sm={2}>
                    {fields?.length >= 4 ? null : (
                      <Button type="link" onClick={() => add()}>
                        + Add New Variant
                      </Button>
                    )}
                  </Col>
                  <Col sm={5}></Col>
                  {fields?.length === 0 ? (
                    <>
                      <Col sm={2}></Col>
                      <Col sm={3}></Col>
                    </>
                  ) : (
                    <>
                      <Col sm={1}></Col>
                      <Col sm={1}>
                        <Button htmlType="reset" danger>
                          Clear
                        </Button>
                      </Col>
                      <Col sm={3}>
                        <Form.Item>
                          <Button block type="primary" htmlType="submit">
                            generate Combination
                          </Button>
                        </Form.Item>
                      </Col>
                    </>
                  )}
                </Row>
              </>
            )}
          </Form.List>
        </Form>
      )}
    </div>
  );
}
export default UpdateVariants;
