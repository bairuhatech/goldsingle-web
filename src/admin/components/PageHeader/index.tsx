import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import Breadcrumb from "../BreadCrump";

function PageHeader(props: any) {
  const navigate = useNavigate();
  return (
    <div className={"PageHeader-container"}>
      <div className="PageHeader-IconBox">
        <IoArrowBackSharp
          size={25}
          color="dark"
          onClick={() => navigate(-1)}
          className={`arrow-button`}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div className="PageHeader-txt1">{props?.title}</div>
        <Breadcrumb
          first={props.first ?? "Home"}
          firstPath={props.firstPath ?? "Home"}
          second={props.second ?? "first"}
          secondPath={props.secondPath ?? "null"}
          third={props.third ?? ""}
          thirdPath={props.thirdPath ?? "/"}
        />
      </div>
      <div className="PageHeader-txt2 d-flex gap-2">{props.children}</div>
    </div>
  );
}

export default PageHeader;
