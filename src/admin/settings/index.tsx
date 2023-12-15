import React from "react";
import { Tabs, TabsProps } from "antd";
import { useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import PageHeader from "../components/PageHeader";

import Settings from "./appSettings";
import BusinessType from "./businessType";
import States from "./states";
import Contacts from "./contacts";
import DeliveryCharge from "./deliveryCharge";

function AppSettings(props: any) {
  const [searchParams, setSearchParams] = useSearchParams();

  const items: TabsProps["items"] = [
    {
      key: "settings",
      label: "Settings",
      children: <Settings />,
    },
    {
      key: "businesstype",
      label: "Business Type",
      children: <BusinessType />,
    },
    {
      key: "states",
      label: "States",
      children: <States />,
    },
    {
      key: "contacts",
      label: "Contacts",
      children: <Contacts />,
    },
    {
      key: "deliverycharge",
      label: "Delivery Charges",
      children: <DeliveryCharge />,
    },
  ];
  const onChange = (key: string) => {
    setSearchParams((searchParams) => {
      searchParams.set("type", key);
      return searchParams;
    });
  };
  const defaultKey = searchParams.get("type");
  const key =
    defaultKey === "settings" ||
    defaultKey === "businesstype" ||
    defaultKey === "states" ||
    defaultKey === "contacts" ||
    defaultKey === "deliverycharge"
      ? defaultKey
      : "settings";
  return (
    <div>
      <PageHeader title="Settings" />
      <Container>
        <Tabs defaultActiveKey={key} items={items} onChange={onChange} />
      </Container>
    </div>
  );
}
export default AppSettings;
