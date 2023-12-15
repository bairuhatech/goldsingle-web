import React, { useEffect, useState } from "react";
import Loading from "../../components/loading";
import { Tabs, TabsProps } from "antd";
import NoData from "../../components/noData";
import { useParams } from "react-router-dom";
import AddressCardAuth from "./components/addressCard";
import ProductItemsAuth from "./components/productItems";
import PaymentCardAuth from "./components/paymentStatus";
import OrderStatusCardAuth from "./components/orderStatus";
import API from "../../config/API";
import { GET } from "../../utils/apiCalls";

function OrderDetailsPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>({});
  const getOrderDetails = async () => {
    const url = API.ORDER_GETONE + params.id;
    if (params.id) {
      try {
        const response: any = await GET(url, null);
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
  const items: TabsProps["items"] = [
    {
      key: "address",
      label: "Address",
      children: <AddressCardAuth data={order} />,
    },
    {
      key: "products",
      label: "Products",
      children: <ProductItemsAuth data={order} />,
    },
    {
      key: "payment",
      label: "Payment Status",
      children: <PaymentCardAuth data={order} />,
    },
    {
      key: "status",
      label: "Order Status",
      children: <OrderStatusCardAuth data={order} getOrderDetails={getOrderDetails}/>,
    },
  ];
  const onChange = (key: string) => {};
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

export default OrderDetailsPage;
