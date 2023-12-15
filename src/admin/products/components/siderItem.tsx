import React from "react";

const SiderItem = (props: any) => {
  return (
    <div
      className={
        props?.step === props?.level
          ? "AddProducts-stepBox active"
          : "AddProducts-stepBox"
      }
      onClick={() => {
        if (typeof(props?.onClick) == "function") {
          props.onClick();
        }
      }}
    >
      <div className="AddProducts-stepBoxIcon">{props?.Icon}</div>
      <div>{props?.name}</div>
    </div>
  );
};

export default SiderItem;
