import { Button } from "antd";
import React, { useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { RiAccountCircleLine, RiListUnordered } from "react-icons/ri";
import { PiAddressBook } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiUser } from "react-icons/fi";
import { clearCart } from "../../../redux/slices/cartSlice";
import { logout } from "../../../redux/slices/userSlice";
import { clearSettings } from "../../../redux/slices/settingsSlice";
import { clearLocation } from "../../../redux/slices/locationSlice";
import { Link } from "react-router-dom";
import { clearStore } from "../../../redux/slices/storeSlice";

const ProfileMenu = (props: any) => {
  const navigation = useNavigate();
  const Auth = useSelector((state: any) => state.User);
  const User = useSelector((state: any) => state.User.user);
  const Cart = useSelector((state: any) => state.Cart);
  const [selected, setSelected] = useState("DASHBOARD");
  const dispatch = useDispatch();

  const OpenLink = (link: any) => {
    if (Auth.auth) {
      navigation(link);
    } else {
      navigation("/login");
    }
  };

  const logotFunction = () => {
    if (Auth.auth) {
      dispatch(logout(null));
      dispatch(clearCart(null));
      dispatch(clearSettings(null));
      dispatch(clearLocation(null));
      dispatch(clearStore(null));
      navigation("/");
      props.close();
    } else {
      navigation("/login");
      props.close();
    }
  };

  return (
    <div className="profileMenu-Box1">
      <div className="profileMenu-Icon">
          {User?.data?.image ? (
            <img
              src={User?.data?.image}
              className="Header-ProfileImag"
              alt="profile"
            />
          ) : (
            <HiOutlineUserCircle size={45} color="#d9d9d9" />
          )}
        <div style={{ marginTop: 5, fontWeight: "900" }}>
          {" "}
          {User?.data?.first_name
            ? User.data?.first_name
            : User.data?.data?.first_name || "Guest User"}
        </div>
      </div>

      {Auth.auth && (
        <>
          <div
            className="profileMenu-Box2"
            onClick={() => {
              OpenLink("/profile/home");
              props.close();
            }}
          >
            <div>
              <FiUser size={20} className="profileMenu-Img1" />
            </div>
            <div className="profileMenu-Txt1">Profile</div>
          </div>
          <div
            className="profileMenu-Box2"
            onClick={() => {
              OpenLink("/profile/orders");
              props.close();
            }}
          >
            <div>
              <RiListUnordered size={20} className="profileMenu-Img1" />
            </div>
            <div className="profileMenu-Txt1">Orders</div>
          </div>
          <div
            className="profileMenu-Box2"
            onClick={() => {
              OpenLink("/profile/favourites");
              props.close();
            }}
          >
            <div>
              <MdFavoriteBorder size={20} className="profileMenu-Img1" />
            </div>
            <div className="profileMenu-Txt1">Favorites</div>
          </div>
          <div
            className="profileMenu-Box2"
            onClick={() => {
              OpenLink("/profile/address");
              props.close();
            }}
          >
            <div>
              <PiAddressBook size={20} className="profileMenu-Img1" />
            </div>
            <div className="profileMenu-Txt1">Address</div>
          </div>
        </>
      )}
      <div style={{ margin: 5 }} />
      <Button type="primary" block onClick={() => logotFunction()}>
        {Auth.auth ? "Logout" : "Login"}
      </Button>
      {Auth.auth ? null : (
        <div style={{ marginTop: "10px" }}>
          New Customer? &nbsp;&nbsp;
          <Link
            to="signup/user"
            onClick={() => {
              if (typeof props.close == "function") {
                props.close();
              }
            }}
          >
            <a href="">Sign Up</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
