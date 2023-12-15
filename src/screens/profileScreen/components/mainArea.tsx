import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ProfileDashboard from "../screens/profileDashboard";
import ProfileAccount from "../screens/profileAccount";
import ProfileDetails from "../screens/profileDetails";
import ProfileFavourites from "../screens/profileFavourites";
import ProfileOrders from "../screens/profileOrders";
import ProfilePayments from "../screens/profilePayments";
import ProfileAddress from "../screens/profileAddress";
import ProfileOrderDetailsPage from "../screens/orderDetails";

const ProfileMainArea = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/home" element={<ProfileDashboard />} />;
        <Route path="/dashboard" element={<ProfileDashboard />} />;
        <Route path="/account" element={<ProfileAccount />} />;
        <Route path="/details" element={<ProfileDetails />} />;
        <Route path="/favourites" element={<ProfileFavourites />} />;
        <Route path="/orders" element={<ProfileOrders />} />;
        <Route path="/orders/:id" element={<ProfileOrderDetailsPage />} />;
        <Route path="/payment" element={<ProfilePayments />} />;
        <Route path="/address" element={<ProfileAddress />} />;
      </Routes>
    </div>
  );
};

export default ProfileMainArea;
