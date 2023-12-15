import { Checkbox } from "antd";
import React from "react";
import { IoIosCheckbox } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import "../style.scss";

function AdressCard(props: any) {
  const onChange = (item: any) => {
    props?.selectAddress(props?.data);
  };
  return (
    <div className="d-flex gap-3 ps-3 py-2 address-screen-card">
      <div className="checkboxin">
        {props?.type == true ? (
          <IoIosCheckbox color="green" />
        ) : (
          <Checkbox
            onChange={onChange}
            checked={props?.selected?.id == props?.data?.id}
            className="address"
          ></Checkbox>
        )}
      </div>
      <div className="otherdetails">
        <div className="d-flex gap-2">
          <span className="fw-medium">{props?.data?.userDetails?.name}</span>
          <span className="address-card-type-bg px-1">{props?.data?.type}</span>
          <span className="fw-medium">{props?.data?.alt_phone}</span>
        </div>
        <div className="d-flex">
          <span>{`${props?.data?.flat},${props?.data?.street},${props?.data?.city},${props?.data?.state} `}</span>
        </div>
        <span className="fw-medium">PIN:{props?.data?.pin_code}</span>
      </div>
    </div>
  );
}

export default AdressCard;
