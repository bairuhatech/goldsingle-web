import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import moment from "moment";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

function ProductItems(props: any) {
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
    <div>
      {Array.isArray(props?.data?.orderItems) == true
        ? props?.data?.orderItems.map((item: any) => (
            <Card bordered={false} className="mt-2">
              <Row>
                <Col md="6">
                  <Meta
                    avatar={
                      <Avatar src={item.image} size={80} shape="square" />
                    }
                    title={`${item.name} ${getVariantData(
                      item?.variantDetails
                    )}`}
                    description={
                      <div className="text-dark">
                        <div>
                          Seller: {props?.data?.storeDetails?.store_name}
                        </div>
                        

                        <div>
                          Ordered on:{" "}
                          {moment(item.createdAt).format("DD/MM/YYYY")}
                        </div>
                      </div>
                    }
                  />
                </Col>
                <Col md="6">
                <div>Quantity: {item?.quantity}</div>
                  {/* <div>
                    Price: {Settings.currency}
                    {item?.price}
                  </div> */}
                  <h6 className="text-dark fw-medium my-0">
                    Total: {Settings.currency}
                    {item?.totalPrice}
                  </h6>
                </Col>
              </Row>
            </Card>
          ))
        : null}
    </div>
  );
}

export default ProductItems;
