import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/charts";
import "../styles.scss";
const Piechart: React.FC = () => {
  const data = [
    {
      type: "Pending",
      value: 0,
    },
    {
      type: "Accept",
      value: 0,
    },
    {
      type: "Reject",
      value: 0,
    },
    {
      type: "Deliverd",
      value: 0,
    },
  ];
  const config = {
    width: 800,
    height: 400,
    forceFit: true,
    title: {
      visible: true,
      text: "Multi-color pie chart",
    },
    description: {
      visible: true,
      text: "Specify the color mapping field (colorField)\uFF0C The pie chart slice will be displayed in different colors according to the field data\u3002 Specifying the color requires configuring the color as an array\u3002\nWhen the pie chart label type is set to inner The uFF0C label will be displayed inside the slice\u3002Set offset to control the offset value of the label\u3002",
    },
    radius: 0.8,
    data,
    angleField: "value",
    colorField: "type",
    label: {
      visible: true,
      type: "inner",
    },
  };
  return (
    <div style={{ height: 250 }}>
      <div className="OverView-Text">Todays Order</div>
      <Pie {...config} className="Piechart-Box1" />
    </div>
  );
};
export default Piechart;
export {};
