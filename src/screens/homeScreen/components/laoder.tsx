import { Skeleton } from "antd";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
function Loader() {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col sm={12} xs="12" style={{ margin: 0, padding: 0 }}>
            <Skeleton.Button
              active={true}
              size={"large"}
              shape={"square"}
              block={true}
              style={{ height: 300, marginBottom: 16 }}
            />
          </Col>
        </Row>
        <div className="homeScreen-loaderBox">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => {
            return (
              <Skeleton.Button
                key={item}
                active={true}
                size={"large"}
                shape={"square"}
                block={true}
                style={{ height: 220, width: 280, marginRight: 10 }}
              />
            );
          })}
        </div>
        <br />
        <div className="homeScreen-loaderBox">
          {[1, 2, 3, 4, 5, 6].map((item) => {
            return (
              <Skeleton.Button
                key={item}
                active={true}
                size={"large"}
                shape={"square"}
                block={true}
                style={{ height: 220, width: 480, margin: 5 }}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Loader;
