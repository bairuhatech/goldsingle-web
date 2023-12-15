import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

function AddressCard(props: any) {
  return (
    <Card bordered={false}>
      <Meta
        title="Delivery Address"
        description={
          <div className="text-dark">
            <div className="fw-bold">{props?.data?.userDetails?.name}</div>
            
            <div>City: {props?.data?.addressDetails?.city}</div>
            <div>PinCode: {props?.data?.addressDetails?.pin_code}</div>
            <div>State: {props?.data?.addressDetails?.pin_code}</div>
            <div>Type: {props?.data?.addressDetails?.type}</div>
            <div>
              Address: {props?.data?.addressDetails?.fullAddress},
              {props?.data?.addressDetails?.geo_location}
            </div>
            <div className="fw-bold">Phone Number: {props?.data?.addressDetails?.alt_phone}</div>
          </div>
        }
      />
    </Card>
  );
}

export default AddressCard;
