import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { Card, Col, Row } from "react-bootstrap";
import moment from "moment";
import { useParams } from "react-router";
import NoData from "../../components/noData";
import API from "../../config/API";
import { CorporateRegisterType } from "../../shared/types/types";
import { GET } from "../../utils/apiCalls";
import AdminLoading from "../components/AdminLoading";
import PageHeader from "../components/PageHeader";
import "./styles.scss";
type sellerDetailsType = CorporateRegisterType & {
  createdAt: Date;
  status: string;
};

function SellerDetails() {
  const [sellerDetails, setSellerDetails] = useState<sellerDetailsType>();
  const [Notifications, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(true);
  const params = useParams();
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
  const totalsData = [
    {
      title: "Total Sell 1",
      value: "0000",
    },
    {
      title: "Total Sell 2",
      value: "0000",
    },
    {
      title: "Total Sell 3",
      value: "0000",
    },
    {
      title: "Total Sell 4",
      value: "0000",
    },
  ];
  const seller = [
    {
      heading: "Business Details",
      details: {
        "Business Location": sellerDetails?.business_location,
        "Business Address": sellerDetails?.business_address,
        "Business Type": sellerDetails?.business_address,
        "Trn Number": sellerDetails?.trn_number,
        "Trade Liscence Number": sellerDetails?.trade_lisc_no,
        "Trn Documnet": sellerDetails?.trn_upload,
      },
    },
    {
      heading: "Seller Details",
      details: {
        "Seller Name": sellerDetails?.seller_name,
        Country: sellerDetails?.seller_country,
        "Birth Country": sellerDetails?.birth_country,
        Dob: moment(sellerDetails?.dob).format("MM/DD/YYYY"),
        "ID Type": sellerDetails?.id_type,
        "ID Proof": sellerDetails?.id_proof,
        "ID Issue Country": sellerDetails?.id_issue_country,
        "ID Expiry Date": moment(sellerDetails?.id_expiry_date).format(
          "MM/DD/YYYY"
        ),
      },
    },
    {
      heading: "Store Details",
      details: {
        "Store Name": sellerDetails?.store_name,
        UPSCS: sellerDetails?.upscs,
        Manufacture: sellerDetails?.manufacture,
        Status: sellerDetails?.status,
      },
    },
    {
      heading: "Date",
      details: {
        "Submited Date": moment(sellerDetails?.createdAt).format("MM/DD/YYYY"),
      },
    },
  ];
  const handleDownload = (imageUrl: any) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([blob]));
        link.download = "downloaded_file.jpg";
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
      });
  };
  return (
    <>
      {contextHolder}
      <PageHeader title="Seller Info"></PageHeader>
      {loading ? (
        <AdminLoading />
      ) : sellerDetails?.name ? (
        <div className="detail-container">
          <Row className="mt-2">
            <Col md="6">
              <div className="seller-info">
                <div className="seller-avatar">
                  <img
                    src={
                      "https://media.licdn.com/dms/image/C5103AQHCezF3ThvPxA/profile-displayphoto-shrink_400_400/0/1517603383320?e=2147483647&v=beta&t=RAUYnJgZHoe1odJG8ZyddqWaDENgKZEZVJdzkR3o7Jg"
                    }
                    alt="Admin Avatar"
                  />
                </div>
                <div className="seller-details">
                  <p className="seller-name">{sellerDetails?.name}</p>
                  <p className="seller-email">{sellerDetails?.email}</p>
                  <p className="seller-email">
                    {sellerDetails.code} {sellerDetails.phone}
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="call-btn">
                <a className="call-btn">Call</a>
              </div>
            </Col>
          </Row>
          <Row className="TotalscardContainer g-3">
            {totalsData.map((data, index) => (
              <Col md={3} key={index}>
                <div className="Totalscard">
                  <div className="title">
                    <p className="title-text">{data.title}</p>
                  </div>
                  <div className="data">
                    <p>{data.value}</p>
                    <div className="range">
                      <div className="fill"></div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <Row className="g-3 mt-5">
            {seller.map((item, index) => (
              <Col md={6} key={index}>
                <Card className="datail-card">
                  <Card.Body>
                    <Card.Title className="card-heading">
                      {item.heading}
                    </Card.Title>
                    <hr />
                    <ul className="card-items">
                      {Object.entries(item.details).map(([key, value]) => (
                        <li key={key}>
                          <div className="key">{key}:</div>
                          {key === "ID Proof" || key === "Trn Documnet" ? (
                            <button
                              className="download-btn"
                              onClick={() => handleDownload(value)}
                            >
                              Download
                            </button>
                          ) : (
                            <div className="value">{value}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}

export default SellerDetails;
