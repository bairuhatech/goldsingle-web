import { Col, Container, Row } from "react-bootstrap";
import SaleMessage from "../../components/saleMessage";
import SubscribeNewsletter from "../../components/subscribeNewsletter";
import { useEffect } from "react";
import "./styles.scss";
import React from "react";

function ReportFraud() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Screen-box">
      <div>
        <SaleMessage />
        <div className="ftscreen-fnt m-2">
          <Row className="m-0 mt-3">
            <Container>
              <div style={{ backgroundColor: "#5c1e3a" }} className="px-4 px-md-0">
                <Row className="p-0 justify-content-center  d-flex flex-wrap ">
                  <Col
                    md={4}
                    xs={12}
                    className="p-md-5  p-0 m-0 my-5 my-md-0 text-center text-white"
                  >
                    <h1 className="pt-1 display-6 lh-sm my-2">
                      Are you a victim of credit card fraud?
                    </h1>
                    <p className="py-3 fs-5 mb-2">
                      Did you notice your credit/debit card being used at Next
                      ME without your knowledge?
                    </p>
                    <a
                      className="btn btn-light text-capitalize rounded-pill ps-5 pe-5 scrolling-link mb-2"
                      href=" "
                    >
                      <strong>Report It Now</strong>
                    </a>
                  </Col>
                  <Col md={8} className="rightside"></Col>
                </Row>
              </div>
            </Container>
          </Row>

          <div className="text-center pt-5">
            <Col md={8} className="offset-md-2">
              <p className="pb-2 fs-5">
                <a href="">Or report an issue with your online transaction</a>
              </p>
              <p>
                If you think your credit/debit card has been used twice on Next
                ME Website OR if you placed an order but you did not receive an
                acknowledgement from us, use this form to inform the incident to
                Next ME.
              </p>
              <p className="pt-2 fs-5">
                <a href="">Click here</a>
              </p>
            </Col>
          </div>

          {/* <Row style={{ backgroundColor: "#5c1e3a" }}>
            <Col
              md={4}
              xs={12}
              className="p-md-5 p-0 m-0 mt-3 text-center text-white leftside"
              
            >
              <h1 className="pt-1 display-6 lh-sm my-5">
                Are you a victim of credit card fraud?
              </h1>
              <p className="pt-3 fs-5 mb-5">
                Did you notice your credit/debit card being used at Next ME
                without your knowledge?
              </p>
              <a
                className="btn btn-light text-capitalize rounded-pill ps-5 pe-5 scrolling-link mb-5"
                href=" "
              >
                <strong>Report It Now</strong>
              </a>
            </Col>
            <Col md={8} className="rightside mt-3"></Col>
          </Row> */}
        </div>
      </div>
      <div className="mt-5">
        <SubscribeNewsletter />
      </div>
    </div>
  );
}
export default ReportFraud;
