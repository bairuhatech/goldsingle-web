import { Button, Popconfirm, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "../styles.scss";
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import useDidUpdateEffect from "../../../shared/hook/useDidUpdate";
import useDebounce from "../../../shared/hook/useDebounce";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CartItemCard(props: any) {
  const [quantity, setQuantity] = useState(Number(props?.data?.quantity));
  const quantityUpdated = useDebounce(quantity, 300);
  const navigate = useNavigate();
  const Settings = useSelector((state: any) => state.Settings.Settings);
  const { Option } = Select;
  const handleIncrement: any = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement: any = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useDidUpdateEffect(() => {
    //calling the function only when quantity is updated
    props?.updateProduct(quantity, props?.data);
  }, [quantityUpdated]);

  const getVariantInfo = (data: any) => {
    let variantss = "";
    if (Array.isArray(data?.combination) == true) {
      data?.combination.map((item: any) => {
        variantss += `${item.value} `;
      });
    }
    return variantss.length ? `(${variantss})` : variantss;
  };

  return (
    <div className="cart_card_1 border mx-md-0 mx-2 shadow-sm">
      <Row className="px-3 pt-md-2">
        <Col md="11">
          <h4 className="mb-0 fs-5 cart-title d-none d-md-block">
            {props?.data?.name}{" "}
            <span className="fs-6">{`${getVariantInfo(props?.data)}`}</span>
          </h4>
          <Row className="mt-2 pb-2">
            <Col md="3">
              <div className="cart_img_container w-100 h-100 d-flex align-items-md-center justify-content-start gap-2">
                <img
                  src={props?.data?.image}
                  alt=""
                  className="cart-card-image object-fit-cover"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(
                      `/product/details?pid=${window.btoa(
                        props?.data?.productId
                      )}&name=${props?.data?.productDetails?.name}`
                    );
                  }}
                />
                <p className="text-success text-start  cart-subtext-font mt-md-0 my-0 d-none d-md-block">
                  In Stock
                </p>
                <div className="d-md-none w-100">
                  <div className="d-flex justify-content-between align-top">
                    <span className="mb-0 fs-6 fw-medium ">
                      {props?.data?.productDetails?.name}
                    </span>
                    <Popconfirm
                      placement="bottomRight"
                      title={"Are you sure to remove item from cart?"}
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() =>
                        props?.removeItem(props?.data?.id, props?.data)
                      }
                    >
                      <AiOutlineClose size={20} style={{ cursor: "pointer" }} />
                    </Popconfirm>
                  </div>

                  <p className=" cart-text-small cart-subtext-font mt-md-0 my-0 text-secondary">
                    Price:{" "}
                    <span>
                      {Settings.currency}
                      {props?.data?.buyPrice}
                      <span className="cart-text-separator">|</span>{" "}
                    </span>
                    Total: $
                    {props?.data?.productDetails?.price * props?.data?.quantity}
                  </p>

                  <p className="text-success text-start  cart-subtext-font mt-md-0 my-0 ">
                    In Stock
                  </p>
                </div>
              </div>
            </Col>

            <Col md="2" className="d-flex justify-content-center flex-column">
              <div className="h-100 d-grid align-content-center d-md-block d-none">
                <p className="text-center text-dark fw-medium cart-text-small cart-subtext-font">
                  Each
                </p>
                <h4 className={`mb-0 text-center fs-5 cart-text-small`}>
                  {Settings.currency}
                  {props?.data?.buyPrice}
                </h4>
              </div>
            </Col>
            <Col
              md="4"
              className="text-center d-flex justify-content-center flex-column align-items-center "
            >
              <div className="h-100 d-grid align-content-center d-md-grid d-none">
                <div className="cartDetails-counter-button">
                  <Button
                    type="primary"
                    shape="circle"
                    size="middle"
                    icon={<AiOutlineMinus size={"10px"} />}
                    onClick={handleDecrement}
                    className="cartDetails-counter-control"
                    // disabled={quantity === 0}
                  />
                  <span className="productDetails-count">
                    {props?.data?.quantity}
                  </span>
                  <Button
                    type="primary"
                    size="middle"
                    shape="circle"
                    icon={<AiOutlinePlus size={"10px"} color="black" />}
                    onClick={handleIncrement}
                    className="cartDetails-counter-control"
                  />
                </div>
              </div>
            </Col>
            <Col md="2" className="d-flex justify-content-center flex-column">
              <div className=" h-100 d-grid align-content-center d-md-block d-none">
                <p className=" text-center text-dark fw-medium cart-text-small cart-subtext-font">
                  Total
                </p>
                <h4 className="mb-0 fs-5 text-center cart-text-small">
                  {Settings.currency}
                  {Number(props?.data?.buyPrice * props?.data?.quantity)}
                </h4>
              </div>
            </Col>
            <div className="d-block d-md-none">
              <div className="mt-2">
                <span className=" cart-text-small cart-subtext-font mt-md-0 my-0">
                  Quantity:
                </span>
                <div className="d-inline-block ms-2">
                  <div className="cartDetails-counter-button-mobile border">
                    <Button
                      type="primary"
                      shape="circle"
                      size="small"
                      icon={<AiOutlineMinus size={"12px"} />}
                      onClick={handleDecrement}
                      className="cartDetails-counter-control-mobile"
                      // disabled={quantity === 0}
                    />
                    <span className="cartDetails-count-mobile mx-1 text-secondary">
                      {props?.data?.quantity}
                    </span>
                    <Button
                      type="primary"
                      size="small"
                      shape="circle"
                      icon={<AiOutlinePlus size={"12px"} />}
                      onClick={handleIncrement}
                      className="cartDetails-counter-control-mobile"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Col>

        <Col sm="1" className="d-flex align-items-center justify-content-end">
          <Popconfirm
            className="d-none d-md-block"
            placement="bottomRight"
            title={"Are you sure to remove item from cart?"}
            okText="Yes"
            cancelText="No"
            onConfirm={() => props?.removeItem(props?.data?.id, props?.data)}
          >
            <AiOutlineDelete size={25} style={{ cursor: "pointer" }} />
          </Popconfirm>
        </Col>
      </Row>
    </div>
  );
}

export default CartItemCard;
