import { Button, Space } from "antd";
import React from "react";
import { FaBoxOpen } from "react-icons/fa";

const EmptyOrders = () => {
  return (
    <div className="emptyOrders">
      <div className="">
        <FaBoxOpen size={70} color="e6e6e6" />
      </div>
      <div className="emptyOrders-txt1">No Orders Found</div>
      <div className="emptyOrders-txt2">
        You have no orders. <br />
        Please start shopping at GOLD BAZAR and place orders
      </div>
      <br />
      <br />
      <Space wrap>
        <Button className="emptyButton" type="primary">
          START SHOPPING NOW
        </Button>
      </Space>
    </div>
  );
};

export default EmptyOrders;
