import React from "react";
import { Col, Row } from "react-bootstrap";
import { FcBullish, FcInTransit } from "react-icons/fc";
import { FcBearish } from "react-icons/fc";
import { MdTrolley } from "react-icons/md";
const productsOverView = () => {
  const cardData = [
    {
      title: "ORDERS",
      amount: "0",
      icon: <FcInTransit size={50} />,
    },
    {
      title: "PRODUCTS",
      amount: "0",
      icon: <MdTrolley size={45} color="#a10244" />,
    },
    {
      title: "PENDING AMOUNT",
      amount: "0",
      icon: <FcBearish size={42} />,
    },
    {
      title: "TOTAL AMOUNT",
      amount: "0",
      icon: <FcBullish size={42} />,
    },
  ];
  return (
    <Row>
      {cardData.map((item: any) => (
        <Col key={item} md={3}>
          <div className="productsOverView-Box2">
            <div>
              <div className="productsOverView-Txt1">{item.title}</div>
              <div style={{ height: 30 }} />
              <div className="productsOverView-Txt2">{item.amount}</div>
            </div>
            <div>{item.icon}</div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default productsOverView;
