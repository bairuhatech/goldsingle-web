import { BsShopWindow } from "react-icons/bs";
import { Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import React from "react";

function CateogreyList() {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const Auth = useSelector((state: any) => state.User);
  const User = useSelector((state: any) => state.User.user);
  const Category = useSelector((state: any) => state.Category.categries);
  const Settings = useSelector((state: any) => state.Settings.Settings);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const OpenLink = () => {
    if (Auth?.auth) {
      switch (User?.data?.type) {
        case "user":
          navigation("/seller");
          break;
        case "seller":
          navigation(`/auth/check_store?id=${Auth?.user?.data?.store_id}`);
          break;
        case "admin":
          navigation(`/auth/check_store?id=${Auth?.user?.data?.store_id}`);
          break;
      }
    } else {
      navigation("/seller");
    }
  };

  return (
    <div className={`Header-deskCateogrey ${!show ? "d-none" : ""}`}>
      {Auth.auth ? (
        (User?.data?.type === "seller" && Settings.type == "multi") ||
        User?.data?.type === "admin" ? (
          <div className="Header-deskCatItem2" onClick={() => OpenLink()}>
            <div style={{ marginRight: 5, marginBottom: 5 }}>
              <BsShopWindow />
            </div>
            Manage Store
          </div>
        ) : (
          User?.data?.type === "user" && (
            <div className="Header-deskCatItem2" onClick={() => OpenLink()}>
              <div style={{ marginRight: 5, marginBottom: 5 }}>
                <BsShopWindow />
              </div>
              Become a seller
            </div>
          )
        )
      ) : (
        <div className="Header-deskCatItem2" onClick={() => OpenLink()}>
          <div style={{ marginRight: 5, marginBottom: 5 }}>
            <BsShopWindow />
          </div>
          {"Become a seller"}
        </div>
      )}

      <div style={{ flex: 1 }}></div>
      {Category && Category.length
        ? Category.map((item: any,index:number) => {
            return (
              <Popover
                key={index}
                arrow={false}
                placement="bottom"
                content={
                  <Row>
                    {item?.sub_categories?.length
                      ? item.sub_categories.map((sub: any,key:number) => {
                          return (
                            <Col key={key} sm={6}>
                              <div
                                className="Header-deskCatItem3"
                                onClick={() =>
                                  navigation(
                                    `/products/category?id=${window.btoa(
                                      sub._id
                                    )}&type=${sub.name}`
                                  )
                                }
                              >
                                {sub.name}
                              </div>
                            </Col>
                          );
                        })
                      : null}
                  </Row>
                }
              >
                <div className="Header-deskCatItem">{item && item.name}</div>
              </Popover>
            );
          })
        : null}
    </div>
  );
}
export default CateogreyList;
