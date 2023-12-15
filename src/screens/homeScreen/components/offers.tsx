import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BiSolidOffer } from "react-icons/bi";
function Offers(props: any) {
  return (
    <Container fluid>
      <Row>
        <Col sm={6} xs={12}>
          <div
            className="Offers-box"
            style={{ borderColor: "rgb(0, 197, 148)" }}
          >
            <div>
              <BiSolidOffer size={60} color="grey" />
            </div>
            <div>
              <div>
                <div className="Offers-txt1">Premium Roeses</div>
                <div className="Offers-txt2">
                  "Blossom with Beauty: Explore Nature's Elegance at NextMe –
                  Your Premier Destination for Fresh Flowers!"
                </div>
              </div>
            </div>
          </div>
          <br />
        </Col>
        <Col sm={6} xs={12}>
          <div className="Offers-img">
            <img
              src="https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Diwali_Desktop-Banner_26oct.jpg"
              alt="offer"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Offers;
