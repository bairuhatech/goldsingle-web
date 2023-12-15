import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Avatar, Button, List, notification } from "antd";
import { Col, Row } from "react-bootstrap";
import API from "../../../config/API";
import { GET } from "../../../utils/apiCalls";
import { CorporateRegisterType } from "../../../shared/types/types";
import AdminLoading from "../../components/AdminLoading";
import NoData from "../../../components/noData";
import { useParams } from "react-router-dom";
import moment from "moment";
import ApproveOrRejectModal from "../modal/approveOrReject";
import useToggle from "../../../shared/hook/useToggle";
import RequestDocumentModal from "../modal/requestDocumentModal";
type sellerDetailsType = CorporateRegisterType & {
  createdAt: Date;
  status: string;
};

function CoorporateSellerDetailsPage() {
  const [sellerDetails, setSellerDetails] = useState<sellerDetailsType>();
  const [Notifications, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [openModal, toggleModal] = useToggle(false);
  const [openDocumentModal, toggleDocumentModal] = useToggle(false);
  const getSellerDetails = async () => {
    setLoading(true);
    const url = API.CORPORATE_STORE_GETBYID + params?.id;
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

  useEffect(() => {
    getSellerDetails();
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
            toggleModal(true);
          }}
          type="primary"
        >
          Approve/Reject
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
          <div className="fw-bold mt-3">Business Details</div>
          {/* <Row className="mt-2">
            <Col md="4">
              <div className="">{"Business Location"}</div>
            </Col>
            <Col md="8">: {sellerDetails.business_location}</Col>
          </Row> */}

          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Business Type"}</div>
            </Col>
            <Col md="8">: {sellerDetails.business_type}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Trn Number"}</div>
            </Col>
            <Col md="8">: {sellerDetails.trn_number}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Trade Liscence Number"}</div>
            </Col>
            <Col md="8">: {sellerDetails.trade_lisc_no}</Col>
          </Row>
          <div className="fw-bold mt-3">Seller Details</div>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Seller Name"}</div>
            </Col>
            <Col md="8">: {sellerDetails.seller_name}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Country"}</div>
            </Col>
            <Col md="8">: {sellerDetails.seller_country}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Birth Country"}</div>
            </Col>
            <Col md="8">: {sellerDetails.birth_country}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Dob"}</div>
            </Col>
            <Col md="8">: {moment(sellerDetails.dob).format("MM/DD/YYYY")}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"ID Proof"}</div>
            </Col>
            <Col md="8">: {sellerDetails.id_proof}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"ID Issue Country"}</div>
            </Col>
            <Col md="8">: {sellerDetails.id_issue_country}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"ID Expiry Date"}</div>
            </Col>
            <Col md="8">
              : {moment(sellerDetails.id_expiry_date).format("MM/DD/YYYY")}
            </Col>
          </Row>
          <div className="fw-bold mt-3">Store Details</div>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Store Name"}</div>
            </Col>
            <Col md="8">: {sellerDetails.store_name}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"UPSCS"}</div>
            </Col>
            <Col md="8">: {sellerDetails.upscs}</Col>
          </Row>
          <Row className="mt-2">
            <Col md="4">
              <div className="">{"Manufacture"}</div>
            </Col>
            <Col md="8">: {sellerDetails.manufacture}</Col>
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
      <ApproveOrRejectModal
        open={openModal}
        modalClose={() => toggleModal(false)}
        data={sellerDetails}
        getSellerDetails={getSellerDetails}
        type="coorporate"
      />
      <RequestDocumentModal
        open={openDocumentModal}
        modalClose={() => toggleDocumentModal(false)}
        data={sellerDetails}
        type="coorporate"
      />
    </>
  );
}

export default CoorporateSellerDetailsPage;
