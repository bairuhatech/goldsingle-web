import { Row, Col, Container } from "react-bootstrap";
import SaleMessage from "../../components/saleMessage";
import SubscribeNewsletter from "../../components/subscribeNewsletter";
import { useEffect } from "react";
import React from "react";
// import SolutionSidebar from "./components/sidebar";
// import SolutionBarProducts from "./components/products";
function SolutionBar() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <Row>
        <div>
          <SaleMessage />
        </div>
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col md={2} style={{ backgroundColor: "aquamarine" }}>
            <div>
              {/* <SolutionSidebar /> */}
            </div>
          </Col>
          <Col md={10}>
            <div>
              {/* <SolutionBarProducts /> */}
            </div>
          </Col>
        </Row>
        <div className="mt-5">
          <SubscribeNewsletter />
        </div>
      </Row>
    </Container>
  );
}
export default SolutionBar;
