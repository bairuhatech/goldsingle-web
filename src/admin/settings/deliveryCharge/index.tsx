import React, { useEffect, useState } from "react";
import DeliveryForm from "./deliveryForm";
import WeightForm from "./weightForm";
import DistanceForm from "./distanceForm";
import LbhForm from "./lbhForm";

const DeliveryCharge: React.FC = () => {
  return (
    <>
      {/* Delivery form */}
      <div className="fw-bold mt-3 fs-4">Product Charges</div>
      <DeliveryForm />

      {/* Distance form */}
      <div className="fw-bold mt-3 fs-4">Distance Charges</div>
      <DistanceForm />

      {/* Weight form */}
      <div className="fw-bold mt-3 fs-4">Weight Charges</div>
      <WeightForm />

      {/* LBH form */}
      <div className="fw-bold mt-3 fs-4">LBH Charges</div>
      <LbhForm />
    </>
  );
};

export default DeliveryCharge;
