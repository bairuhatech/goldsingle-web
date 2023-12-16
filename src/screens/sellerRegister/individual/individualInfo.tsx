import { Col, Container, Row } from "react-bootstrap";
import IndividualSellerImg from "../../../assets/images/profitimage.png";
import "../styles.scss";
import { FaLongArrowAltRight } from "react-icons/fa";
import React from "react";

const IndividualInfo = () => {
  const items = [
    {
      text: "Elevate your waitlisting experience with Gold Bazar, designed for individuals seeking seamless and efficient service.",
      color: "#B95C50",
    },
    {
      text: "Elevate your waitlisting experience with Gold Bazar, designed for individuals seeking seamless and efficient service.",
      color: "#B95C50",
    },
    {
      text: "Gold Bazar simplifies the waitlist process for coffee shops, restaurants, and services, ensuring a stress-free, organized approach to your daily schedule.",
      color: "#B95C50",
    },
    {
      text: "Join the Gold Bazar community and embrace a lifestyle enhancement tool that puts you in control, turning your wait times into opportunities for productivity and relaxation.",
      color: "#B95C50",
    },
  ];

  return (
    <div className="Screen-box">
      <br />
      <Container>
        <Row>
          <Col md={6}>
            <div>
              <h4 className="sellerRegister-subHeading">
                Why choosing individual seller?
              </h4>
              <br />
              <div>
                {items.map((item, index) => (
                  <div key={index} className="sellerRegister-row">
                    <div>
                      <FaLongArrowAltRight color={item.color} size={20} />
                    </div>
                    &nbsp; &nbsp;
                    <div className="sellerRegister-text1">
                      {item.text} <br />
                      <br />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div>
              <img
                src={IndividualSellerImg}
                className="individualSellerPage-Box5"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default IndividualInfo;
