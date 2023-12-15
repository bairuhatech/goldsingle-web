import { FaBeer } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import DynamicIcon from "./dynamicIcons";
import React from "react";

function SideItem({ item }: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const Navigate = (path: any) => {
    navigate(path);
  };
  return (
    <div
      className={
        location.pathname === item.route ? "sideItem-selected" : "sideItem"
      }
      onClick={() => Navigate(item.route)}
    >
      <div>
        <DynamicIcon name={item?.icon} size={15} />
      </div>
      <div className="sideItemTxt1">{item.menu}</div>
    </div>
  );
}
export default SideItem;
