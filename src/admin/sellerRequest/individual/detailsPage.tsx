import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Avatar, Button, List, notification } from "antd";
import { Col, Row } from "react-bootstrap";
import API from "../../../config/API";
import { GET } from "../../../utils/apiCalls";
import { IndividualSellerDetailsType } from "../../../shared/types/types";
import AdminLoading from "../../components/AdminLoading";
import NoData from "../../../components/noData";
import { useParams } from "react-router-dom";
import moment from "moment";
import RejectModal from "../modal/approveOrReject";
import useToggle from "../../../shared/hook/useToggle";
import RequestDocumentModal from "../modal/requestDocumentModal";
import ApproveModal from "../modal/approveModal";
type sellerDetailsType = IndividualSellerDetailsType & { createdAt: Date };

function IndividualSellerDetailsPage() {
  const [sellerDetails, setSellerDetails] = useState<sellerDetailsType>();
  const [Notifications, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [openApproveModal, approveModal] = useToggle(false);
  const [openRejectModal, rejectModal] = useToggle(false);
  const [openDocumentModal, toggleDocumentModal] = useToggle(false);
  const [businessType, SetBusinessType] = useState([]);

  const getSellerDetails = async () => {
    setLoading(true);
    const url = API.INDIVIDUAL_STORE_GETBYID + params?.id;
    try {
      const response: any = await GET(url, null);
      if (response?.status) {
        setSellerDetails(response?.data);
      }
    } catch (err: any) {
      Notifications["error"]({
        message: "Something went wrong",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadbusinessType = async () => {
    try {
      let url = API.BUSINESS_TYPE;
      let response: any = await GET(url, null);
      if (response.status) {
        SetBusinessType(response.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getSellerDetails();
    loadbusinessType();
  }, []);
  return (
    <>
      {contextHolder}
      <PageHeader title="Seller Info">
        <Button
          onClick={() => {
            toggleDocumentModal(true);
          }}
          type="primary"
        >
          Request Document
        </Button>
        <Button
          onClick={() => {
            approveModal(true);
          }}
          type="primary"
        >
          Approve
        </Button>
        <Button
          onClick={() => {
            rejectModal(true);
          }}
          type="primary"
        >
          Reject
        </Button>
      </PageHeader>
      {loading ? (
        <AdminLoading />
      ) : sellerDetails?.name ? (
        <>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Name"}</div>
            </Col>
            <Col md="8">: {sellerDetails.name}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Email"}</div>
            </Col>
            <Col md="8">: {sellerDetails.email}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Phone"}</div>
            </Col>
            <Col md="8">: {sellerDetails.phone}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Visa Status"}</div>
            </Col>
            <Col md="8">: {sellerDetails.visa_status}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Age"}</div>
            </Col>
            <Col md="8">: {sellerDetails.age}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Gender"}</div>
            </Col>
            <Col md="8">: {sellerDetails.gender}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Language"}</div>
            </Col>
            <Col md="8">: {sellerDetails.language}</Col>
          </Row>
          {/* <Row className="mt-2">
            <Col md="4">
              <div className="">{"Business Location"}</div>
            </Col>
            <Col md="8">: {sellerDetails.business_location}</Col>
          </Row> */}

          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Interest"}</div>
            </Col>
            <Col md="8">: {sellerDetails.interest}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Status"}</div>
            </Col>
            <Col md="8">: {sellerDetails.status}</Col>
          </Row>
          <Row className="mt-4">
            <Col md="4">
              <div className="">{"Submitted Date"}</div>
            </Col>
            <Col md="8">
              : {moment(sellerDetails.createdAt).format("MM/DD/YYYY")}
            </Col>
          </Row>
        </>
      ) : (
        <NoData />
      )}
      <RejectModal
        open={openRejectModal}
        modalClose={() => rejectModal(false)}
        data={sellerDetails}
        getSellerDetails={getSellerDetails}
        type="individual"
      />
      <ApproveModal
        open={openApproveModal}
        modalClose={() => approveModal(false)}
        data={sellerDetails}
        businessType={businessType}
        getSellerDetails={getSellerDetails}
        type="individual"
      />
      <RequestDocumentModal
        open={openDocumentModal}
        modalClose={() => toggleDocumentModal(false)}
        data={sellerDetails}
        type="individual"
      />
    </>
  );
}

export default IndividualSellerDetailsPage;
