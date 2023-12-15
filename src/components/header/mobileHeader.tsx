import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PiShoppingCartSimple, PiUserCircle } from "react-icons/pi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Badge, Popover } from "antd";
import Logo from "../../config/logo.png";
import { useState } from "react";
import SideBar from "./sideBar";
import SearchBar from "./searchBar";
import ProfileMenu from "./components/profileMenu";
import LocationMobile from "./locationMobile";
import React from "react";

function Mobile() {
  const User = useSelector((state: any) => state.User);
  const Cart = useSelector((state: any) => state.Cart);
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);

  const OpenLink = (link: any) => {
    if (User.auth) {
      navigation(link);
    } else {
      navigation("/login");
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="Header-mobkBox">
      <div className="Header-mobkBox2">
        <div style={{ margin: 5 }} />
        <div onClick={() => showDrawer()}>
          <HiOutlineMenuAlt2 size={30} />
        </div>
        <div style={{ margin: 10 }} />
        <div onClick={() => navigation("/")}>
          <img src={Logo} className="Header-mobLogo" alt="logo" />
        </div>
        <div style={{ flex: 1 }}></div>
        <div>
          <SearchBar />
        </div>
        <div style={{ margin: 10 }} />
        <div>
          <Badge count={Cart.items.length} color="#a10244">
            <PiShoppingCartSimple
              size={26}
              onClick={() => OpenLink("/auth/cart")}
            />
          </Badge>
        </div>

        <div style={{ margin: 10 }} />
        <Popover arrow={false} content={<ProfileMenu />}>
          <div>
            {User?.user?.data?.image ? (
              <img
                src={User?.user?.data?.image}
                className="Header-ProfileImag"
                alt="profile"
              />
            ) : (
              <PiUserCircle size={28} />
            )}
          </div>
        </Popover>
        <div style={{ margin: 10 }} />
        <SideBar open={open} close={() => onClose} />
      </div>
      <LocationMobile />
      <div style={{ margin: 5 }} />
      {/* <div onClick={() => showDrawer()}>
        <HiOutlineMenuAlt2 size={30} />
      </div> */}
      {/* <div style={{ margin: 10 }} />
      <div onClick={() => navigation("/")}>
        <img src={Logo} className="Header-mobLogo" alt="logo" />
      </div>
      <div style={{ flex: 1 }}></div>
      <div>
        <SearchBar />
      </div>
      <div style={{ margin: 10 }} />
      <div>
        <Badge count={Cart.items.length} color="#a10244">
          <PiShoppingCartSimple
            size={26}
            onClick={() => OpenLink("/auth/cart")}
          />
        </Badge>
      </div>
      <div style={{ margin: 10 }} />
      <Popover arrow={false} content={<ProfileMenu />}>
        <div>
          {User?.user?.data?.image ? (
            <img
              src={User?.user?.data?.image}
              className="Header-ProfileImag"
              alt="profile"
            />
          ) : (
            <PiUserCircle size={28} />
          )}
        </div>
      </Popover> */}

      <div style={{ margin: 10 }} />
      <SideBar open={open} close={() => onClose} />
    </div>
  );
}
export default Mobile;
