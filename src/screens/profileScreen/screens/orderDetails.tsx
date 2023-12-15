import { Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import ProductItems from "./components/productItems";
import AddressCard from "./components/addressCard";
import PaymentCard from "./components/paymentCard";
import OrderStatusCard from "./components/orderStatusCard";
import API from "../../../config/API";
import { useParams } from "react-router-dom";
import { GET } from "../../../utils/apiCalls";
import Loading from "../../../components/loading";
import NoData from "../../../components/noData";

function ProfileOrderDetailsPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>({});
  const getOrderDetails = async () => {
    const url = API.ORDER_GETONE + params.id;
    if (params.id) {
      try {
        const response: any = await GET(url, null);
        console.log(response);
        if (response?.status) {
          setOrder(response?.data);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    getOrderDetails();
  }, []);
  const onChange = (key: string) => {};
  const items: TabsProps["items"] = [
    {
      key: "address",
      label: "Address",
      children: <AddressCard data={order} />,
    },
    {
      key: "products",
      label: "Products",
      children: <ProductItems data={order} />,
    },
    {
      key: "payment",
      label: "Payment Status",
      children: <PaymentCard data={order} />,
    },
    {
      key: "status",
      label: "Order Status",
      children: <OrderStatusCard data={order} />,
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : order.id ? (
        <Tabs
          defaultActiveKey={"products"}
          items={items}
          onChange={onChange}
          className="mb-2"
        />
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default ProfileOrderDetailsPage;
