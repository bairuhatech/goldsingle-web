import React, { useEffect, useState } from "react";
import "./styles.scss";
import PageHeader from "../components/PageHeader";
import DataTable from "./DataTable";
import API from "../../config/API";
import { useSelector, useStore } from "react-redux";
import { GET } from "../../utils/apiCalls";
import Loading from "../../components/loading";
import NoData from "../../components/noData";
function Orders() {
  const [loading, setLoading] = useState(true);
  const Auth = useSelector((state: any) => state.User?.user?.data);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const url = API.ORDER_GET_BYSTORE + Auth?.store_id;
    setLoading(true);
    try {
      const response: any = await GET(url, null);
      console.log(response);
      if (response?.status) {
        setOrders(response?.data);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div>
      <PageHeader title="Orders" second={"All orders"} />
      {loading ? (
        <Loading />
      ) : orders.length ? (
        <DataTable data={orders} />
      ) : (
        <NoData />
      )}
    </div>
  );
}
export default Orders;
