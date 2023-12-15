import React from "react";
import "../styles.scss";
import { BsBag, BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import { useTranslation } from "react-i18next";

const EmptyCart = (props: any) => {
  const navigation = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="emptyCart-spaceStyle">
      <br />
      <BsBag size={70} color="e6e6e6" />
      <div className="emptyCart-emptyText">{t("empty_cart")}</div>
      <br />
      <Space wrap>
        <Button
          className="emptyButton"
          type="primary"
          onClick={() => navigation("/")}
        >
          {t("start_shopping_now")}
        </Button>
      </Space>
    </div>
  );
};

export default EmptyCart;
