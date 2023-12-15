import React from "react";
import { Breadcrumb } from "antd";
import "./styles.scss";
const Index = (props: any) => {
  const item = [
    {
      href: props.firstPath,
      title: <span>{props?.first && props.first}</span>,
    },
  ];
  if (props.secondPath && props.second) {
    item.push({
      href: props.secondPath,
      title: <span>{props?.second && props.second}</span>,
    });
    if (props.thirdPath && props.third) {
      item.push({
        href: props.thirdPath,
        title: <span>{props?.third && props.third}</span>,
      });
      if (props.fourthPath && props.fourth) {
        item.push({
          href: props.fourthPath,
          title: <span>{props?.fourth && props.fourth}</span>,
        });
      }
    }
  }
  return (
    <div className="Breadcrumb-container">
      <Breadcrumb separator=">" items={item} />
    </div>
  );
};

export default Index;
