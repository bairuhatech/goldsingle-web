import { Space, Tag } from "antd";
import React from "react";
import { useState } from "react";
const { CheckableTag } = Tag;
const PageHeader = (props: any) => {

  return (
    <>
      <div className="ProductByCat-Header py-3">
        <br />
        <div className="d-flex align-items-center">
          <span className="fs-4 me-3">{props?.title} </span>
          <span className="fs-5 fw-normal my-0 me-3">{props?.count}</span>
        </div>
        {props?.children}
      </div>
      <hr className="mt-0"/>
    </>
  );
};

export default PageHeader;
