import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

function PaymentCard(props: any) {
    const Settings = useSelector((state: any) => state.Settings.Settings);
  return (
    <Card bordered={false}>
      <Meta
        title={`PaymentType: ${props?.data?.orderPayment?.paymentType}`}
        description={
          <div className="text-dark">
            <div className="fw-bold">Payment status: {props?.data?.orderPayment?.status}</div>
            <div>Total amount: {Settings.currency}{props?.data?.total}</div>
            <div>orderDate: {moment(props?.data?.orderPayment?.createdAt).format("DD/MM/YYYY")}</div>
            
          </div>
        }
      />
    </Card>
  );
}

export default PaymentCard;
