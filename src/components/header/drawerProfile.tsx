import "./styles.scss";
import Logo from "../../config/logo.png";
import React from "react";
function DrawerProfile() {
  return (
    <>
      <div className="DrawerProfile-box">
        <img
          // src="https://images.pexels.com/photos/1493111/pexels-photo-1493111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          src={Logo}
          alt="profile"
        />
      </div>
    </>
  );
}

export default DrawerProfile;
