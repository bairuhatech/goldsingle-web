import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PiShoppingCartSimple, PiUserCircle } from "react-icons/pi";
import Logo from "../../config/logo.png";
import { useTranslation } from "react-i18next";
import { Badge, Popover } from "antd";
import { MdOutlineLocationOn } from "react-icons/md";

import LanguageSelector from "./components/languageSelector";
import SearchBar from "./searchBar";
import ProfileMenu from "./components/profileMenu";
import ChooseLocationModal from "./components/locationChooseModal";
import useToggle from "../../shared/hook/useToggle";
import React, { useState } from "react";

function DeskTop() {
  const Auth = useSelector((state: any) => state.User);
  const User = useSelector((state: any) => state.User.user);
  const Cart = useSelector((state: any) => state.Cart);
  const [openLocation, toggleLocation] = useToggle(false);
  const Settings = useSelector((state: any) => state.Settings.Settings);
  const navigation = useNavigate();
  const LocationDetails = useSelector((state: any) => state.Location.location);
  const { t } = useTranslation();
  const [issharepopovervisible, setissharepopovervisible] = useState(false);
  const OpenLink = (link: any) => {
    if (Auth.auth) {
      navigation(link);
    } else {
      navigation("/login");
    }
  };
  const handlepopovervisiblechange = () => {
    setissharepopovervisible(!issharepopovervisible);
  };
  return (
    <div className="Header-deskBox">
      <div onClick={() => navigation("/")}>
        <img src={Logo} className="Header-deskLogo" alt="logo" />
      </div>
      <div style={{ margin: 20 }} />
      {Settings?.isLocation == true ? (
        <div className="Header-desk-menu" onClick={() => toggleLocation(true)}>
          <div className="Header-deskTxt1">
            <div className="Header-deskTxt2">Delivery to Dubai</div>
            {t(
              LocationDetails.latitude
                ? LocationDetails.state
                : "Select Location"
            )}
          </div>
          <div></div>
          <div style={{ margin: 4 }} />
          <MdOutlineLocationOn size={20} color="grey" />
        </div>
      ) : null}
      <div style={{ margin: 10 }} />
      <SearchBar />
      <div style={{ margin: 10 }} />
      <div className="Header-desk-menu" onClick={() => OpenLink("/auth/cart")}>
        <div>{t("cart")}</div>
        <div style={{ margin: 4 }} />
        <div className="DesktopHeader">
          <Badge count={Cart.items.length} color="#DA9100">
            <PiShoppingCartSimple size={25} color="grey" />
          </Badge>
        </div>
      </div>
      <Popover
        placement="bottomRight"
        trigger="click"
        content={<ProfileMenu close={handlepopovervisiblechange} />}
        arrow={false}
        visible={issharepopovervisible}
        onVisibleChange={handlepopovervisiblechange}
      >
        <div
          className={
            Auth.auth
              ? "Header-desk-menu Header-deskactive"
              : "Header-desk-menu"
          }
        >
          <div>
            {User?.data?.first_name
              ? User.data?.first_name
              : User.data?.data?.first_name || t("signin")}
          </div>
          <div style={{ margin: 4 }} />
          {User?.data?.image ? (
            <img
              src={User?.data?.image}
              className="Header-ProfileImag"
              alt="profile"
            />
          ) : (
            <PiUserCircle size={25} color="grey" />
          )}
        </div>
      </Popover>

      <LanguageSelector />
      <ChooseLocationModal
        open={openLocation}
        modalClose={() => toggleLocation(false)}
      />
    </div>
  );
}
export default DeskTop;
