import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GET } from "../../../utils/apiCalls";
import API from "../../../config/API";
import AdminLoading from "../../components/AdminLoading";
import NoData from "../../../components/noData";

function Address() {
  const [addressDetails, setAddressDetails] = useState<any>();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const getAddressDetails = async () => {
    setLoading(true);
    const url = API.ADDRESS_GET + params?._id;
    try {
      const response: any = await GET(url, null);
      console.log(response, "API RESPONSE");
      if (response?.status) {
        setAddressDetails(response?.data || []);
      }
      // setAddressDetails(response);
    } catch (err: any) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAddressDetails();
  }, []);

  return (
    <>
      {loading ? (
        <AdminLoading />
      ) : addressDetails.length ? (
        addressDetails.map((address: any, index: number) => (
          <div key={index}>
            <div className="address-block">
              <div className="address-block"></div>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Flat"}</div>
                </Col>
                <Col md="8">: {address.flat}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"PIN Code"}</div>
                </Col>
                <Col md="8">: {address.pin_code}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"State"}</div>
                </Col>
                <Col md="8">: {address.state}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"City"}</div>
                </Col>
                <Col md="8">: {address.city}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Street"}</div>
                </Col>
                <Col md="8">: {address.street}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Alt Phone"}</div>
                </Col>
                <Col md="8">: {address.alt_phone}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Geo Location"}</div>
                </Col>
                <Col md="8">: {address.geo_location}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Type"}</div>
                </Col>
                <Col md="8">: {address.type}</Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="">{"Full Address"}</div>
                </Col>
                <Col md="8">: {address.fullAddress}</Col>
              </Row>
            </div>
            {index !== addressDetails.length - 1 && (
              <hr className="address-divider" />
            )}
          </div>
        ))
      ) : (
        <NoData />
      )}
    </>
  );
}
export default Address;
