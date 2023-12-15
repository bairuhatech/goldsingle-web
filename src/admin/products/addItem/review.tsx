import { useState } from "react";
import { Button, Collapse } from "antd";

import { Col, Row } from "react-bootstrap";
import React from "react";
function Review(props: any) {
  const [loading, setLoading] = useState(false);

  window.scrollTo(0, 0);

  const submit = async (values: any) => {
    try {
      console.log("submit");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div>
      <div style={{ minHeight: "64vh" }}>
        <Collapse defaultActiveKey={["4"]} bordered={false}>
          <Collapse.Panel header="Product Information" key="1"></Collapse.Panel>
          <Collapse.Panel header="Product Images" key="2"></Collapse.Panel>
          <Collapse.Panel header="Product Variants" key="3"></Collapse.Panel>
          <Collapse.Panel header="Upload Files" key="4"></Collapse.Panel>
        </Collapse>
      </div>
      <br />
      <Row>
        <Col sm={6}></Col>
        <Col sm={2}>
          <Button size="large" block onClick={() => props.onBack()}>
            Back
          </Button>
        </Col>
        <Col sm={4}>
          <Button
            size="large"
            block
            type="primary"
            htmlType="submit"
            loading={props?.loading}
            onClick={() => props.onChange()}
          >
            Send To Review
          </Button>
        </Col>
      </Row>
    </div>
  );
}
export default Review;
