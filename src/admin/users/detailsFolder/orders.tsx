import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../config/API";
import { GET } from "../../../utils/apiCalls";
import { Col, Row } from "react-bootstrap";
import AdminLoading from "../../components/AdminLoading";
import NoData from "../../../components/noData";

function Orders() {
  const [orderDetails, setOrderDetails] = useState<any>();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const getOrderDetails = async () => {
    setLoading(true);
    const url = API.ORDER_GET + params?._id;
    try {
      const response: any = await GET(url, null);
      console.log(response, "API RESPONSE");
      //   if (response?.status) {
      //     setUserDetails(response?.data);
      //   }
      setOrderDetails(response?.data || []);
    } catch (err: any) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);
  return (
    <>
      {loading ? (
        <AdminLoading />
      ) : orderDetails.length ? (
        orderDetails.map((order: any, index: number) => (
          <div key={index}>
            <div className="order-block">
              <div className="order-block"></div>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Order ID"}</div>
                </Col>
                <Col md="8">: {order.id}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"User ID"}</div>
                </Col>
                <Col md="8">: {order.userId}</Col>
              </Row>
              {/* <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Total Price"}</div>
                </Col>
                <Col md="8">: {order.totalPrice}</Col>
              </Row> */}
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Address"}</div>
                </Col>
                <Col md="8">: {order.address}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Status"}</div>
                </Col>
                <Col md="8">: {order.status}</Col>
              </Row>
            </div>
            {index !== orderDetails.length - 1 && (
              <hr className="order-divider" />
            )}
          </div>
        ))
      ) : (
        <NoData />
      )}
    </>
  );
}
export default Orders;
