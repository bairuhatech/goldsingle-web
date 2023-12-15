import { Tabs } from "antd";
import type { TabsProps } from "antd";
import "./styles.scss";
import PageHeader from "../components/PageHeader";
import MenuConfig from "./menuConfig";
import UserConfig from "./userConfig";
import React from "react";

const MenuConfiguration = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "User Configuration",
      children: <UserConfig />,
    },
    {
      key: "3",
      label: "Menu Configuration",
      children: <MenuConfig />,
    },
  ];
  return (
    <div>
      <PageHeader title="Menu Configuration" />
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        indicatorSize={(origin) => origin - 16}
      />
    </div>
  );
};

export default MenuConfiguration;
