import { useContext, useEffect, useRef, useState } from "react";
import ProductItem from "../../../components/Product_Item";
import { MdArrowBack, MdOutlineArrowForward } from "react-icons/md";
import React from "react";
import { SingleProductContext } from "../singleProductContext";
import API from "../../../config/API";
import useFetch from "../../../shared/hook/fetchData";
import Loading from "../../../components/loading";
function RelatedItems() {
  const data = useContext(SingleProductContext);
  const product = data?.data;
  const [Recent, setRecent] = useState([]);
  const [hasScrollBar, setHasScrollBar] = useState(false);

  const ref: any = useRef(null);
  const scroll = (ratio: any) => {
    ref.current.scrollLeft += ratio;
  };
  const {
    data: Relatedproducts,
    isLoading: loading,
    error,
  } = useFetch(
    API.PRODUCT_SEARCH +
      `bysubcategory?id=${
        product?.subCategory ? product?.subCategory : 0
      }&order=DESC&price=RAND&page=1&take=10`,
    false
  );
  useEffect(() => {
    function updateState() {
      const el = ref.current;
      el && setHasScrollBar(el.scrollWidth > el.getBoundingClientRect().width);
    }
    updateState();
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, [Recent]);

  return (
    <>
      {!loading && Relatedproducts?.length ? (
        <div className="Horizontal-Pscroll">
          <div className="Horizontal-row">
            <div className="Horizontal-Heading1">{"You might also like.."}</div>
            <div className="Horizontal-row" style={{ marginBottom: 10 }}></div>
          </div>
          <div style={{ margin: 5 }} />
          <div className="Horizontal-Pscroll position-relative">
            <div className="Horizontal-PscrollBox" ref={ref}>
              {Relatedproducts?.length
                ? Relatedproducts?.map((prod: any, i: number) => {
                    return (
                      <div key={i} className={`Horizontal-item py-3`}>
                        <ProductItem item={prod} />
                      </div>
                    );
                  })
                : null}
            </div>
            <button
              className="Horizontal-btn1 position-absolute slider-btn-left"
              onClick={() => scroll(-800)}
            >
              <MdArrowBack />
            </button>
            <button
              className="Horizontal-btn2 slider-btn-right position-absolute"
              onClick={() => scroll(800)}
            >
              <MdOutlineArrowForward />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default RelatedItems;
