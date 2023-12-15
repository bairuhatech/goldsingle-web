import { useEffect, useRef, useState } from "react";
import ProductItem from "../../components/Product_Item";
import { MdArrowBack, MdOutlineArrowForward } from "react-icons/md";
import React from "react";
import { Col, Row } from "react-bootstrap";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
function StoreAllProducts(props: any) {
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
    el && setHasScrollBar(el.scrollWidth > el.getBoundingClientRect().width);
  }
  const params = useParams();
  return (
    <div className="store-All-Horizontal-Pscroll ">
      <Row className="mx-0">
        <Col md="3">
          <div
            className="d-flex gap-2"
            // onClick={() =>
            //   navigate(
            //     `/store/${props?.data?.id}/search?qs=${props?.search}` //?id=${props?.data?.id}&qs=${props?.search}
            //   )
            // }
          >
            {/* <div className="store-all-card-img align-self-center">
              <img src={props?.data?.image} alt="" />
            </div> */}
            <div className="align-self-center">
              <h4 className="mb-0 product-search-multi-title catamaran-bold">
                {props?.data?.name}
              </h4>
            </div>
          </div>
        </Col>
        <Col md="9"></Col>
      </Row>
      <div className="">
        <div className="store-All-Horizontal-Heading1"></div>
        <div
          className="d-flex justify-content-end"
          style={{ marginBottom: 10 }}
        >
          <div
            className="store-All-Horizontal-viewButton"
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(
                `/store/${params.store}/categories?cid=${props?.data?._id}&type=${props?.data?.name}`
              )
            }
          >
            View all {props?.data?.products?.length} items
          </div>
        </div>
      </div>
      <div style={{ margin: 5 }} />
      <div className="store-All-Horizontal-Pscroll position-relative">
        <div className="store-All-Horizontal-PscrollBox" ref={ref}>
          {props?.data?.products
            ? props?.data?.products?.map((prod: any, index: number) => {
                return (
                  <div key={index} className="store-All-Horizontal-item">
                    <ProductItem item={prod} />
                  </div>
                );
              })
            : null}
        </div>
        {hasScrollBar ? (
          <>
            <button
              className="store-All-Horizontal-btn1 position-absolute store-All-slider-btn-left"
              onClick={() => {
                scroll(-800);
              }}
            >
              <MdArrowBack />
            </button>
            <button
              className="store-All-Horizontal-btn1 store-All-slider-btn-right position-absolute"
              onClick={() => {
                scroll(800);
              }}
            >
              <MdOutlineArrowForward />
            </button>{" "}
          </>
        ) : null}
      </div>
    </div>
  );
}
export default StoreAllProducts;
