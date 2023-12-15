import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../config/API";
import { GET } from "../../../utils/apiCalls";
import { Col, Row } from "react-bootstrap";
import AdminLoading from "../../components/AdminLoading";
import NoData from "../../../components/noData";


function Payments() {
    const [paymentDetails, setPaymentDetails] = useState<any>();
    const [loading, setLoading] = useState(true);
    const params = useParams();
  
    const getPaymentDetails = async () => {
      setLoading(true);
      const url = API.PAYMENT_GET + params?._id;
      try {
        const response: any = await GET(url, null);
        console.log(response, "API RESPONSE");
        //   if (response?.status) {
        //     setUserDetails(response?.data);
        //   }
        setPaymentDetails(response?.data || []);
      } catch (err: any) {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getPaymentDetails();
    }, []);
    return (
        <>
      {loading ? (
        <AdminLoading />
      ) : paymentDetails.length ? (
        paymentDetails.map((payment: any, index: number) => (
          <div key={index}>
            <div className="payment-block">
              <div className="payment-block"></div>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Order ID"}</div>
                </Col>
                <Col md="8">: {payment.id}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"User ID"}</div>
                </Col>
                <Col md="8">: {payment.userId}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Payment Mode"}</div>
                </Col>
                <Col md="8">: {payment.paymentType}</Col>
              </Row>
            </div>
            {index !== paymentDetails.length - 1 && (
              <hr className="payment-divider" />
            )}
          </div>
        ))
      ) : (
        <NoData />
      )}
    </>
    );
}
export default Payments;