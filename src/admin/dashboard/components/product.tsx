import React from "react";
import { Col, Row } from "react-bootstrap";
import { FcBullish, FcConferenceCall } from "react-icons/fc";
import { FcBearish } from "react-icons/fc";
import { TbTruckDelivery } from "react-icons/tb";
import { PiFlowerLotus } from "react-icons/pi";
import { FaArrowUpLong, FaArrowDownLong, FaCircleUser } from "react-icons/fa6";

const DashboardProduct = () => {
  const cardData = [
    {
      title: "TOTAL USERS",
      amount: "$ ",
      icon: <FaCircleUser size={40} color="#DA9100" />,
      month: (
        <>
          <FaArrowUpLong size={15} color="grey" />
          &nbsp;0% Since last month
        </>
      ),
    },
    {
      title: "TOTAL COSTUMER",
      amount: "$ 0",
      icon: <FcConferenceCall size={50} />,
      month: (
        <>
          <FaArrowUpLong size={15} color="grey" />
          &nbsp;0% Since last month
        </>
      ),
    },
    {
      title: "TOTAL LOSS",
      amount: "$ 0",
      icon: <FcBearish size={42} />,
      month: (
        <>
          <FaArrowDownLong size={15} color="grey" />
          &nbsp;0% Since loss month
        </>
      ),
    },
    {
      title: "TOTAL PROFIT",
      amount: "$ 0",
      icon: <FcBullish size={42} />,
      month: (
        <>
          <FaArrowUpLong size={15} color="grey" />
          &nbsp;0% of profit of these year
        </>
      ),
    },
  ];
  return (
    <div className="dashboardProduct-Box1">
      <Row>
        {cardData.map((item: any) => (
          <Col key={item} md={3} className="mb-2">
            <div className="dashboardProduct-Box2">
              <div>
                <div className="dashboardProduct-Txt1">{item.title}</div>
                <div className="dashboardProduct-Txt2">{item.amount}</div>
                <div className="dashboardProduct-Txt3">{item.month}</div>
              </div>
              <div>{item.icon}</div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashboardProduct;
