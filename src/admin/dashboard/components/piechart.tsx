import React from "react";
import { Pie } from "@ant-design/charts";
import "../styles.scss";

const DashboardPiechart: React.FC = () => {
  const data = [
    {
      type: "Category 1",
      value: 27,
    },
    {
      type: "Category 2",
      value: 25,
    },
    {
      type: "Category three",
      value: 18,
    },
    {
      type: "Category Four",
      value: 15,
    },
    {
      type: "Category five",
      value: 10,
    },
    {
      type: "other",
      value: 5,
    },
  ];
  const config = {
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
    <>
      <div className="dashboardText">Todays Users</div>
      <Pie {...config} className="dashboardPiechart-Box1" />
    </>
  );
};
export default DashboardPiechart;
export {};
