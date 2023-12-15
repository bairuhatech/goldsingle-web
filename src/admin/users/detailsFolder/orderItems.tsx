import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../config/API";
import { GET } from "../../../utils/apiCalls";
import { Col, Row } from "react-bootstrap";
import AdminLoading from "../../components/AdminLoading";
import NoData from "../../../components/noData";

function Orders() {
  const [orderItemDetails, setOrderItemDetails] = useState<any>();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const getOrderItemDetails = async () => {
    setLoading(true);
    const url = API.ORDER_ITEMS_GET + params?._id;
    try {
      const response: any = await GET(url, null);
      console.log(response, "API items RESPONSE");
      //   if (response?.status) {
      //     setUserDetails(response?.data);
      //   }
      setOrderItemDetails(response?.data || []);
    } catch (err: any) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderItemDetails();
  }, []);
  return (
    <>
      {loading ? (
        <AdminLoading />
      ) : orderItemDetails.length ? (
        orderItemDetails.map((order: any, index: number) => (
          <div key={index}>
            <div className="order-block">
              <div className="order-block"></div>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Order ID"}</div>
                </Col>
                <Col md="8">: {order.orderId}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"User ID"}</div>
                </Col>
                <Col md="8">: {order.userId}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Product ID"}</div>
                </Col>
                <Col md="8">: {order.productId}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Product Name"}</div>
                </Col>
                <Col md="8">: {order.name}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Product Image"}</div>
                </Col>
                <Col md="8">: {order.image}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Quantity"}</div>
                </Col>
                <Col md="8">: {order.quantity}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Price"}</div>
                </Col>
                <Col md="8">: {order.price}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Buy Price"}</div>
                </Col>
                <Col md="8">: {order.buyPrice}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Total Price"}</div>
                </Col>
                <Col md="8">: {order.totalPrice}</Col>
              </Row>
            </div>
            {index !== orderItemDetails.length - 1 && (
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
