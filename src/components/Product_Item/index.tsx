import React from "react";
import SEO from "../seo";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearSettings } from "../../redux/slices/settingsSlice";

function ProductItem(props: any) {
  const navigate = useNavigate();
  const Settings = useSelector((state: any) => state.Settings.Settings);

  return (
    <div
      className={`ProductItem`}
      onClick={() => {
        navigate(
          `/product/details?pid=${window.btoa(props?.item?._id)}&name=${
            props?.item?.name
          }`
        );
      }}
    >
      <SEO
        title={props?.datas?.head}
        description={props?.datas?.body?.slice(0, 100)}
        image={props?.datas?.image}
      />
      <div className="ProductItem-Box1">
        <img
          src={props?.item?.image}
          className="ProductItem-img"
          alt="ProductItem-img"
        />
      </div>

      <div className="ProductItem-Box2">
        <div className="ProductItem-txt1">{props?.item?.name}</div>
        <div className="ProductItem-txt2">{props?.item?.description}</div>
        <div className="ProductItem-txt3">
          {props?.item?.price} {Settings.currency} <span></span>
        </div>
      </div>
    </div>
  );
}
export default ProductItem;
