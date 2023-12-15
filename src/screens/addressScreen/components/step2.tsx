import React from "react";
import "../style.scss";
import Loading from "../../../components/loading";
import AdressCard from "./addressCard";
import NoData from "../../../components/noData";
import { useSelector } from "react-redux";
import { Avatar, Button, Card, List } from "antd";
import { Col, Row } from "react-bootstrap";
import Meta from "antd/es/card/Meta";
function Step2(props: any) {
  const Checkout = useSelector((state: any) => state.Checkout);
  const Settings = useSelector((state: any) => state.Settings.Settings);
  const getVariantData = (data: any) => {
    let variantss = "";
    if (Array.isArray(data?.combination) == true) {
      data?.combination.map((item: any) => {
        variantss += `${item.value} `;
      });
    }
    return variantss;
  };
  return (
    <>
      <h5 className="py-2  text-dark bg-light ps-3 my-0 rounded">
        Delivery Address
      </h5>
      <Row>
        <Col md="8">
          <AdressCard data={props?.selectedAddress} type={true} />
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          {" "}
          <Button className="mt-3 ms-3" onClick={props?.goBack}>
            Change Address
          </Button>
        </Col>
      </Row>
      <div className=" d-flex bg-light justify-content-between align-items-center pe-2 rounded mt-2">
        <h5 className=" text-dark  py-2 ps-3 my-0">Order Summary</h5>
      </div>
      {Array.isArray(Checkout.Checkout) == true ? (
        <List
          itemLayout="horizontal"
          dataSource={Checkout.Checkout}
          renderItem={(item: any, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                avatar={<Avatar src={item.image} size={80} shape="square" />}
                title={
                  <h6 className="fw-medium">{`${item.name} ${getVariantData(
                    item
                  )}`}</h6>
                }
                description={
                  <div className="text-dark">
                    <div>
                      Seller:{" "}
                      {item?.storeName || item?.storeDetails?.store_name}
                    </div>
                    <div>Quantity: {item?.quantity}</div>
                    <h6 className="text-dark fw-medium my-0">
                      Total: {Settings.currency}
                      {item?.totalPrice}{" "}
                    </h6>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      ) : null}
      <div className="mt-3 ms-3 d-flex align-items-center justify-content-between">
        <div>
          {" "}
          Order confirmation will be sent to{" "}
          <span className="fw-medium">{props?.User?.data?.email}</span>
        </div>
        <Button
          className="mt-3 ms-3 px-3 text-primary"
          onClick={() => props?.goBack()}
          type="text"
        >
          Go Back
        </Button>
      </div>
    </>
  );
}

export default Step2;
