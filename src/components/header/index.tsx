import "./styles.scss";
import DeskTop from "./desktopHeader";
import Mobile from "./mobileHeader";
import CateogreyList from "./cateogreyList";
import React from "react";
function Header() {
  //Header
  return (
    <div className="Header">
      <div className="Header-desktop">
        <DeskTop />
        <CateogreyList />
      </div>
      <div className="Header-mobile">
        <Mobile />
      </div>
    </div>
  );
}
export default Header;
