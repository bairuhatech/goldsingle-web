import { Tabs, TabsProps } from "antd";
import { useSearchParams } from "react-router-dom";
import CoorporateSellerRequestPage from "./coorporate";
import IndividualSellerRequestPage from "./individual";
import React from "react";
import PageHeader from "../components/PageHeader";

function SellerRequestPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const items: TabsProps["items"] = [
    {
      key: "coorporate",
      label: "Coorperate Sellers",
      children: <CoorporateSellerRequestPage />,
    },
    {
      key: "individual",
      label: "Individual Sellers",
      children: <IndividualSellerRequestPage />,
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
    defaultKey == "coorporate" || defaultKey == "individual"
      ? defaultKey
      : "coorporate";
  return (
    <>
      <PageHeader title="Seller Requests" />
      <Tabs defaultActiveKey={key} items={items} onChange={onChange} />
    </>
  );
}

export default SellerRequestPage;
