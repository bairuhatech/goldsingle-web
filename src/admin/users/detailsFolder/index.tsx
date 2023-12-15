import React from "react";
import { Tabs, TabsProps } from "antd";
import { useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import PageHeader from "../../components/PageHeader";
import Address from "./address";
import Orders from "./orders";
import Payments from "./payments";
import Details from "./details";
import OrderItems from "./orderItems";
import OrderStatus from "./orderStatus";

function UserInfo(props: any) {
  const [searchParams, setSearchParams] = useSearchParams();

  const items: TabsProps["items"] = [
    {
      key: "details",
      label: "Details",
      children: <Details />,
    },
    {
      key: "address",
      label: "Address",
      children: <Address />,
    },
    {
      key: "orders",
      label: "Orders",
      children: <Orders />,
    },
    {
      key: "orderItems",
      label: "OrderItems",
      children: <OrderItems />,
    },
    {
      key: "payments",
      label: "Payments",
      children: <Payments />,
    },
    {
      key: "orderStatus",
      label: "OrderStatus",
      children: <OrderStatus />,
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
    defaultKey === "details" ||
    defaultKey === "address" ||
    defaultKey === "orders" ||
    defaultKey === "orderItems" ||
    defaultKey === "payments" ||
    defaultKey === "orderItems"
      ? defaultKey
      : "details";
  return (
    <div>
      <PageHeader title="User Info"></PageHeader>
      <Container>
        <Tabs defaultActiveKey={key} items={items} onChange={onChange} />
      </Container>
    </div>
  );
}
export default UserInfo;
