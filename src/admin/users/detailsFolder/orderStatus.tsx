import { Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NoData from "../../../components/noData";
import API from "../../../config/API";
import { GET } from "../../../utils/apiCalls";
import AdminLoading from "../../components/AdminLoading";

function OrderStatus() {
  const [orderStatusDetails, setOrderStatusDetails] = useState<any>();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const getOrderStatusDetails = async () => {
    setLoading(true);
    const url = API.ORDER_STATUS_GET + params?._id;
    try {
      const response: any = await GET(url, null);
      console.log(response, "API items RESPONSE");
      setOrderStatusDetails(response?.data || []);
    } catch (err: any) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderStatusDetails();
  }, []);

  return (
    <>
      {loading ? (
        <AdminLoading />
      ) : orderStatusDetails.length ? (
        orderStatusDetails.map((order: any, index: number) => (
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
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Status"}</div>
                </Col>
                <Col md="8">: {order.status}</Col>
              </Row>
            </div>
            {index !== orderStatusDetails.length - 1 && (
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
export default OrderStatus;
