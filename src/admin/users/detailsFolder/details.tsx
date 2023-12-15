import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../config/API";
import { GET } from "../../../utils/apiCalls";
import AdminLoading from "../../components/AdminLoading";
import NoData from "../../../components/noData";
import { Col, Row } from "react-bootstrap";

function Details() {
  const [userDetails, setUserDetails] = useState<any>();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const getUserDetails = async () => {
    setLoading(true);
    const url = API.USER_CONFIG_USERS +"/"+ params?._id;
    try {
      const response: any = await GET(url, null);
      console.log(response);
    //   if (response?.status) {
    //     setUserDetails(response?.data);
    //   }
      setUserDetails(response);
    } catch (err: any) {
      console.log("error")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

    return(
        <>
        {loading ? (
        <AdminLoading />
      ) : userDetails?.name ? (
        <>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Name"}</div>
            </Col>
            <Col md="8">: {userDetails.name}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Email"}</div>
            </Col>
            <Col md="8">: {userDetails.email}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Phone"}</div>
            </Col>
            <Col md="8">: {userDetails.countrycode} {userDetails.phone}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Username"}</div>
            </Col>
            <Col md="8">: {userDetails.username}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Type"}</div>
            </Col>
            <Col md="8">: {userDetails.type}</Col>
          </Row>
        </>
      ) : (
        <NoData />
      )}
        </>
    );
}
export default Details;