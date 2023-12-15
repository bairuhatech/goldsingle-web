import React from "react";
import "../styles.scss";
import { useSelector } from "react-redux";
import menu from "./menu.json";
import SideItem from "./sidebarItem";

function SideBar() {
  const Store = useSelector((state: any) => state.Store.Store);
  const User = useSelector((state: any) => state.User.user);
  return (
    <div className="admimSidebarBox">
      <div className="admimSidebar">
        <div className="admimSidebar-storeBox">
          <div>
            <img
              src={Store?.logo_upload}
              className="admimSidebar-logo"
              alt="store"
            />
          </div>
          <div style={{ marginLeft: 10 }}>
            <div className="admimSidebar-txt1">{Store?.store_name}</div>
            <div className="admimSidebar-txt2">{User?.data?.role}</div>
          </div>
        </div>
        {menu.map((item) => {
          return (
            <div key={item.id}>
              {item?.role?.includes(User?.data?.role) ? (
                <SideItem item={item} />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default SideBar;
