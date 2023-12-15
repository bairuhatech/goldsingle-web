import React from "react";
import { useContext } from "react";
import { SingleProductContext } from "../singleProductContext";
import { Col, Row } from "react-bootstrap";
import "../style.scss";
import RelatedItems from "./RelatedItems";
import { Button, Divider, Image, Tabs, TabsProps } from "antd";
import { Rate } from "antd";
import Slider from "react-slick";
import { Imagesettings } from "./imageSliderSettings";
import ReviewTab from "./tabs/reviewTab";
import ProductDescription from "./tabs/productDescription";

function ProductCard() {
  const data = useContext(SingleProductContext);
  const productInfo = data?.data;
  const activeVariant = data?.activeVariant;
  const reviewMeta = data?.reviewMeta;
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "About the product",
      children: <ProductDescription data={productInfo} />,
    },
    {
      key: "2",
      label: "Reviews",
      children: <ReviewTab />,
    },
  ];
  const onChange = (key: string) => {};
  return (
    <div className="product-landing">
      <Row className="mx-0">
        <Col md={4}>
          <div className="productDetails-product-images">
            <div className="productDetails-image1">
              <Image
                width={"100%"}
                src={
                  activeVariant?.status == true && activeVariant?.variant?.image
                    ? activeVariant?.variant?.image
                    : productInfo?.image
                }
                className="productDetails-ProductDetailScreen-image1"
                alt="image1"
              />
            </div>
            <div
              style={{
                width: "100%",
                overflow: "hidden",
                height: 133,
                marginTop: 10,
              }}
            >
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) =>
                    console.log(
                      `current index: ${current}, prev index: ${prev}`
                    ),
                }}
              >
                <Slider {...Imagesettings}>
                  {productInfo?.productImages?.map(
                    (item: any, index: number) => (
                      <Image src={item?.url} key={index} />
                    )
                  )}
                </Slider>
              </Image.PreviewGroup>
            </div>
          </div>
        </Col>
        <Col md={8}>
          <div className="product-details">
            <h1 className="productDetails-text1 productDetails-txt-bold">
              {productInfo?.name}
            </h1>
            <div className="productDetails-details-row productDetails-margin-b-32">
              <Rate
                allowHalf
                defaultValue={4.5}
                className="productDetails-text3"
              />
              <h6 className="productDetails-secondary-text productDetails-text4 productDetails-margin-h-6">
                {reviewMeta?.itemCount} Reviews
              </h6>
            </div>

            {/* <DetailsTab /> */}
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </div>
        </Col>
        <div className="productDetails-margin-b-32" />
        <Divider />
        <RelatedItems />
      </Row>
    </div>
  );
}

export default ProductCard;
