import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { MdOutlineLocationOn } from "react-icons/md";
import ChooseLocationModal from "./components/locationChooseModal";
import useToggle from "../../shared/hook/useToggle";
import { LiaGreaterThanSolid } from "react-icons/lia";
import "./styles.scss";
import React from "react";

const LocationMobile = () => {
  const LocationDetails = useSelector((state: any) => state.Location.location);
  const [openLocation, toggleLocation] = useToggle(false);
  const { t } = useTranslation();
  return (
    <div className="LocationMobile-Box1">
      <div className="LocationMobile-Txt1" onClick={() => toggleLocation(true)}>
        <div style={{ color: "#a10244" }}>
          Delivery to Dubai &nbsp;
          <LiaGreaterThanSolid size={12} color="grey" />
        </div>
        <div>
          &nbsp;
          {t(
            LocationDetails.latitude ? LocationDetails.state : "Select Location"
          )}
        </div>
        &nbsp;
        <MdOutlineLocationOn size={15} color="grey" />
      </div>

      <ChooseLocationModal
        open={openLocation}
        modalClose={() => toggleLocation(false)}
      />
    </div>
  );
};

export default LocationMobile;
