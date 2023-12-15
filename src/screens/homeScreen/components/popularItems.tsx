import { useEffect, useRef, useState } from "react";
import ProductItem from "../../../components/Product_Item";
import { MdArrowBack, MdOutlineArrowForward } from "react-icons/md";
import useFetch from "../../../shared/hook/fetchData";
import React from "react";
function PopularItems(props: any) {
  const [Recent, setRecent] = useState([]);
  const [hasScrollBar, setHasScrollBar] = useState(false);

  const ref: any = useRef(null);
  const scroll = (ratio: any) => {
    ref.current.scrollLeft += ratio;
  };

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
    <div className="Horizontal-Pscroll">
      <div className="Horizontal-row">
        <div className="Horizontal-Heading1">{props?.title}</div>
        <div className="Horizontal-row" style={{ marginBottom: 10 }}>
          <div className="Horizontal-viewButton">See More</div>
        </div>
      </div>
      <div style={{ margin: 5 }} />
      <div className="Horizontal-Pscroll position-relative">
        <div className="Horizontal-PscrollBox" ref={ref}>
          {props?.data?.length
            ? props?.data?.map((prod: any) => {
                return (
                  <div key={prod.id} className="Horizontal-item">
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
  );
}
export default PopularItems;
