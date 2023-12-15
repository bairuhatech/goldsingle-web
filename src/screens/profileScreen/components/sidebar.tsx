import React, { useState } from "react";
import "../styles.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/userSlice";
import { useTranslation } from "react-i18next";
import { clearCart } from "../../../redux/slices/cartSlice";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { FaRegAddressBook, FaShoppingCart } from "react-icons/fa";
import {
  MdLogout,
  MdOutlineFavoriteBorder,
  MdOutlinePayment,
} from "react-icons/md";
import { clearSettings } from "../../../redux/slices/settingsSlice";
import { clearStore } from "../../../redux/slices/storeSlice";

const Sidebar = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const iconSize = 20;
  const params = useParams();
  const routes = [
    {
      title: "profile",
      icon: <CgProfile size={iconSize} />,
      path: "/profile/home",
      route: "home",
    },
    {
      title: "orders",
      icon: <FaShoppingCart size={iconSize} />,
      path: "/profile/orders",
      route: "orders",
    },
    {
      title: "favourites",
      icon: <MdOutlineFavoriteBorder size={iconSize} />,
      path: "/profile/favourites",
      route: "favourites",
    },
    {
      title: "address",
      icon: <FaRegAddressBook size={iconSize} />,
      path: "/profile/address",
      route: "address",
    },
    {
      title: "payment methods",
      icon: <MdOutlinePayment size={iconSize} />,
      path: "/profile/payment",
      route: "payment",
    },
  ] as const;

  return (
    <div className="profile-sideBar px-md-2">
      {routes.map((item: any, key: number) => {
        return (
          <div
            key={key}
            className={` ${
              params["*"]?.includes(item.route)
                ? "profile-menu-selected"
                : "profile-menu"
            }`}
            onClick={() => {
              navigation(item.path);
            }}
          >
            {item.icon}
            <div className="ms-2 profile-sidebar-txt1 ">{t(item.title)}</div>
          </div>
        );
      })}
      <hr />
      <div
        className={` ${"profile-menu"}`}
        onClick={() => {
          dispatch(logout(null));
          dispatch(clearCart(null));
          dispatch(clearSettings(null));
          dispatch(clearStore(null));
          navigation("/");
        }}
      >
        <CgLogOut size={iconSize} />
        <div className="ms-2 profile-sidebar-txt2">{t("logout")}</div>
      </div>
    </div>
  );
};

export default Sidebar;
