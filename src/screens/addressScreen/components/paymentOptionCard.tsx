import { Checkbox } from "antd";
import React from "react";

function PaymentOptionCard(props: any) {
  const onChange = (item: any) => {
    props?.selectPayment(props?.data);
  };
  return (
    <div className="d-flex gap-3 ps-3 py-3 address-screen-card">
      <div className="checkboxin">
        <Checkbox
          onChange={onChange}
          checked={props.selectedPayment.name == props?.data?.name}
        ></Checkbox>
      </div>
      <div className="otherdetails">
        <div className="d-flex gap-2">
          <span className="fw-medium">{props?.data?.name}</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentOptionCard;
