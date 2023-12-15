import { Popover } from "antd";
import React, { useState } from "react";
import { HiMiniLanguage } from "react-icons/hi2";
import Languages from "../helpers/languages.json";
import "../styles.scss";
import i18next from "i18next";
import { setDirection } from "../../../redux/slices/languageSlice";
import { useDispatch } from "react-redux";

const LanguageSelector = (props: any) => {
  const [selected, setselected] = useState("EN");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleChangeLanguage = (value: any) => {
    console.log(value);
    if (value === "ar") {
      dispatch(setDirection("RTL"));
    } else {
      dispatch(setDirection("LTR"));
    }

    setselected(value.toUpperCase());
    const language = value;
    i18next.changeLanguage(language);
  };

  const languages = (
    <div className="">
      {Languages?.map((val: any) => (
        <div
          className="language-txt1"
          onClick={() => {
            hide();
            handleChangeLanguage(val.value);
          }}
        >
          {val.title}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Popover
        open={open}
        placement="bottomRight"
        content={languages}
        trigger="click"
        onOpenChange={handleOpenChange}
        arrow={false}
      >
        <div className="hideMob">
          <div className="Header-desk-menu">
            <div>{selected}</div>
            <div style={{ margin: 4 }} />
            <HiMiniLanguage size={25} color="grey" />
          </div>
        </div>
        <div className="hidedesk">
          <div className="Sidebar-itemBox">
            <HiMiniLanguage size={27} color="#757575" />
            <span>Language - {selected}</span>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default LanguageSelector;
