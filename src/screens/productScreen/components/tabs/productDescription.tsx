import { Button, Col, Divider, Row } from "antd";
import React, { useContext } from "react";
import CartCard from "../cartCard";
import VariantTypes from "../variants";
import { RiFlag2Fill } from "react-icons/ri";
import { SingleProductContext } from "../../singleProductContext";
const ProductDescription = (data: any) => {
    const context = useContext(SingleProductContext);
    const productInfo = context?.data;
   
  return (
    <>
      <p className="">{productInfo?.description}</p>
      <div className="productDetails-flex productDetails-flex-row">
        <h3 className="productDetails-text2 productDetails-secondary-text">
          Category:
        </h3>
        <h1 className="productDetails-text2 productDetails-margin-h-6 productDetails-txt-bold">
          {data?.data?.categoryName?.name}/{data?.data?.subCategoryName?.name}
        </h1>
      </div>

      <Row>
        <Col md="6">
          <CartCard />
          <VariantTypes />
        </Col>
        <Col md="6">
          <div className="productDetails-flex productDetails-flex-end">
            <h6 className="productDetails-secondary-text productDetails-text3 productDetails-margin-h-6">
              Any Problem with Product?
            </h6>
            <Button
              type="text"
              icon={<RiFlag2Fill />}
              className="productDetails-text-btn1"
            >
              Report
            </Button>
          </div>
        </Col>
      </Row>
      <Divider />
      <div className="productDetails-margin-v-8">
        <h6 className="productDetails-txt-bold">Description</h6>
        <h6
          className="productDetails-secondary-text productDetails-text3"
          dangerouslySetInnerHTML={{
            __html: productInfo?.specifications,
          }}
        ></h6>
      </div>
    </>
  );
};
export default ProductDescription;
