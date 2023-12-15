import { useEffect, useRef, useState } from "react";
import ProductItem from "../../components/Product_Item";
import { MdArrowBack, MdOutlineArrowForward } from "react-icons/md";
import React from "react";
import { Col, Row } from "react-bootstrap";
import "./style.scss";
import { useNavigate } from "react-router-dom";
function MultiSearchProductList(props: any) {
  const [hasScrollBar, setHasScrollBar] = useState(false);
  const navigate = useNavigate();
  const ref: any = useRef(null);
  const scroll = (ratio: any) => {
    ref.current.scrollLeft += ratio;
  };

  useEffect(() => {
    updateState();
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, []);

  function updateState() {
    const el = ref.current;
    el &&
      setHasScrollBar(el.scrollWidth > el.getBoundingClientRect().width + 50);
  }
  return (
    <div className="product-Multi-Horizontal-Pscroll">
      <Row className="mx-0">
        <Col md="3">
          <div
            className="d-flex gap-2 product-list-shop-card"
            onClick={() => {
              if (props?.type === "search") {
                navigate(
                  `/store/${props?.data?.id}/search?qs=${props?.search}`
                );
              }
              if (props?.type === "category") {
                navigate(
                  `/store/${props?.data?.id}/categories?cid=${props?.cid}&type=${props?.cname}`
                );
              }
            }}
          >
            <div className="multisearch-card-img align-self-center">
              <img src={props?.data?.logo_upload} alt="" />
            </div>
            <div>
              <h5 className="mb-0 product-search-multi-title">
                {props?.data?.store_name}
              </h5>
              <span className="bg-multisearch-card-sub px-1 product-search-multi-text">
                50k+ recent orders
              </span>
              <br />
              <span className="text-success product-search-multi-text">
                Deliver by 9am
              </span>
            </div>
          </div>
        </Col>
        <Col md="9"></Col>
      </Row>
      <div className="">
        <div className="product-Multi-Horizontal-Heading1"></div>
        <div
          className="d-flex justify-content-end"
          style={{ marginBottom: 10 }}
        >
          <div
            className="product-Multi-Horizontal-viewButton"
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (props?.type === "search") {
                navigate(
                  `/store/${props?.data?.id}/search?qs=${props?.search}`
                );
              }
              if (props?.type === "category") {
                navigate(
                  `/store/${props?.data?.id}/categories?cid=${props?.cid}&type=${props?.cname}`
                );
              }
            }}
          >
            View all {props?.data?.productList?.length} items
          </div>
        </div>
      </div>
      <div style={{ margin: 5 }} />
      <div className="product-Multi-Horizontal-Pscroll position-relative">
        <div className="product-Multi-Horizontal-PscrollBox" ref={ref}>
          {props?.data?.productList
            ? props?.data?.productList?.map((prod: any, index: number) => {
                return (
                  <div key={index} className="product-Multi-Horizontal-item">
                    <ProductItem item={prod} />
                  </div>
                );
              })
            : null}
        </div>
        {hasScrollBar ? (
          <>
            <button
              className="product-Multi-Horizontal-btn1 position-absolute product-Multi-slider-btn-left"
              onClick={() => {
                scroll(-800);
              }}
            >
              <MdArrowBack />
            </button>
            <button
              className="product-Multi-Horizontal-btn1 product-Multi-slider-btn-right position-absolute"
              onClick={() => {
                scroll(800);
              }}
            >
              <MdOutlineArrowForward />
            </button>{" "}
          </>
        ) : null}
      </div>
      <hr />
    </div>
  );
}
export default MultiSearchProductList;
