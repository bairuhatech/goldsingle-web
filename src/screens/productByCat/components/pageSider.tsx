import SiderItem from "./siderItem";
import menu from "./siderMenu.json";
import "../styles.scss";
import React from "react";

const PageSider = () => {
  return (
    <div className="ProductByCat-SiderBox mt-3">
      <div className="">
        {menu.map((item) => {
          return <SiderItem item={item} />
        })}
      </div>
    </div>
  );
};
export default PageSider;