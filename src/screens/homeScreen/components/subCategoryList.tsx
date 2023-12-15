import React from "react";
import "../styles.scss";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { MdArrowBack, MdOutlineArrowForward } from "react-icons/md";
function SubCategoryList(props: any) {
  const ref: any = useRef();
  const navigation = useNavigate();
  const [hasScrollBar, setHasScrollBar] = useState(false);

    
  useEffect(() => {
    updateState();
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, []);

  function updateState() {
    const el = ref.current;
    el && setHasScrollBar(el.scrollWidth > el.getBoundingClientRect().width);
  }

  return (
    <div className="position-relative">
      <div
        className="my-md-3 d-flex subcategory-card-main-container
        justify-content-start gap-md-4 gap-3 ps-md-0 ps-2"
        ref={ref}
      >
        {props?.data?.map((item: any, index: number) => (
          <div
            className="d-flex flex-column align-items-center px-0 mx-0"
            key={index}
            onClick={() => {
              navigation(
                `/products/category?id=${window.btoa(item._id)}&type=${
                  item.name
                }`
              );
            }}
          >
            <div className="subcategory-card-img-container">
              <img src={item.image} alt="Image" className="" />
            </div>
            <div>{item.name}</div>
          </div>
        ))}
        {hasScrollBar ? (
          <button
            onClick={() => {
              ref.current.scrollLeft += 300;
            }}
            className="subcategory-card-right-arrow-button right-arrow-button"
          >
            <MdOutlineArrowForward />
          </button>
        ) : null}

        {hasScrollBar ? (
          <button
            onClick={() => {
              ref.current.scrollLeft -= 300;
            }}
            className="subcategory-card-right-arrow-button left-arrow-button"
          >
            <MdArrowBack />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default SubCategoryList;
