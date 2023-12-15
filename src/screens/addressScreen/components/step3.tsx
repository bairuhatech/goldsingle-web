import React, { useState } from "react";
import Loading from "../../../components/loading";
import { Col, Row } from "react-bootstrap";
import NoData from "../../../components/noData";
import "../style.scss";
import PaymentOptionCard from "./paymentOptionCard";
import { Avatar, Button, Card, List } from "antd";
import ProceedToNextStep from "./proceedCard";
import AdressCard from "./addressCard";
import { TiTick } from "react-icons/ti";
import Meta from "antd/es/card/Meta";
import { useSelector } from "react-redux";

function Step3(props: any) {
  const [loading, setLoading] = useState(false);
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
      <h5 className="py-2 bg-light text-dark ps-3 my-0 rounded">
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
      <h5 className="py-2  text-dark bg-light ps-3 my-0 rounded mt-2">
        Order Summary
      </h5>
      {Array.isArray(Checkout.Checkout) == true ? (
        <List
          itemLayout="horizontal"
          dataSource={Checkout.Checkout}
          renderItem={(item: any, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                avatar={<Avatar src={item.image} size={80} shape="square" />}
                title={<h6>{`${item.name} ${getVariantData(item)}`}</h6>}
                description={
                  <div className="text-dark">
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
      <h5 className="py-2 bg-light text-dark ps-3 rounded my-0 mt-2">
        Payment Options
      </h5>
      {props?.paymentOptions.map((item: any) => (
        <PaymentOptionCard
          data={item}
          selectPayment={props?.selectPayment}
          selectedPayment={props?.selectedPayment}
        />
      ))}

      <div className="mt-3 ms-3 d-flex align-items-center justify-content-between ">
        <div>
          {" "}
          Order confirmation will be sent to{" "}
          <span className="fw-medium">{props?.User?.data?.email}</span>
        </div>
        <Button
          className="mt-3 ms-3 px-3 text-primary"
          onClick={() => props?.previous()}
          type="text"
        >
          Go Back
        </Button>
      </div>
    </>
  );
}

export default Step3;
