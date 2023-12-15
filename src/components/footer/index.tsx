import React from "react";
import FeedBack from "./feedback";
import { Row, Col, Container } from "react-bootstrap";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
} from "react-icons/fa";
import { RiFacebookCircleLine } from "react-icons/ri";
import { BiLogoInstagram } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { LiaWhatsapp } from "react-icons/lia";
import Logo from "../../config/logo.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="footer">
      <FeedBack />
      <Container>
        <main className="footer-container">
          <Row>
            <Col md={2}>
              <div className="list-container">
                <div className="list-heading">{t("company")}</div>
                <ul>
                  <li><Link to="/about-nextme" className="custom-link">{t("about_nextme")}</Link></li>
                  <li><Link to="/best-price" className="custom-link">{t("best_price")}</Link></li>
                  <li><Link to="/service-centers" className="custom-link">{t("service_centers")}</Link></li>
                  <li><Link to="/careers" className="custom-link">{t("careers")}</Link></li>
                  <li><Link to="/solution-bar" className="custom-link">{t("solution_bar")}</Link></li>
                  <li><Link to="/brand-promise" className="custom-link">{t("brand_promise")}</Link></li>
                  <li><Link to="/terms-and-conditions" className="custom-link">{t("terms_and_conditions")}</Link></li>
                </ul>
              </div>
            </Col>
            <Col md={2}>
              <div className="list-container">
                <div className="list-heading">{t("assistance")}</div>
                <ul>
                <li><Link to="/warranty" className="custom-link">{t("check_warrenty_status")}</Link></li>
                <li><Link to="/store-locator" className="custom-link">{t("store_locator")}</Link></li>
                <li><Link to="/easy-payment-plan" className="custom-link">{t("easy_payment_plan")}</Link></li>
                <li><Link to="/disclaimer-policy" className="custom-link">{t("disclaimer_policy")}</Link></li>
                <li><Link to="/return-policy" className="custom-link">{t("return_policy")}</Link></li>
                <li><Link to="/bulk-order" className="custom-link">{t("bulk_order")}</Link></li>
                <li><Link to="/report-fraud" className="custom-link">{t("report_fraud")}</Link></li>
                </ul>
              </div>
            </Col>
            <Col md={2}>
              <div className="list-container">
                <div className="list-heading">{t("publications")}</div>
                <ul>
                  <li><Link to="/catalogue" className="custom-link">{t("catelogue")}</Link></li>
                  <li><Link to="/newsletter" className="custom-link">{t("newsletter")}</Link></li>
                  <li><Link to="/blog" className="custom-link">{t("blog")}</Link></li>
                  <li>{t("whatsapp_us")}</li>
                  <li>6238780530</li>
                  <li><Link to="/tell-more" className="custom-link">{t("tell_more")}</Link></li>
                </ul>
              </div>
            </Col>
            <Col md={3}>
              <div className="list-container ">
                <div className="list-heading">{t("payment_methrd")}</div>
                <div className="Payment-cards">
                  <FaCcVisa size={40} color="#000" />
                  <FaCcMastercard size={40} color="#000" />
                  <FaCcPaypal size={40} color="#000" />
                  <FaCcApplePay size={40} color="#000" />
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="logoContainer">
                <img className="listFooter-logo" src={Logo} />
                <div className="Payment-cards">
                  <RiFacebookCircleLine size={25} color="#000" />
                  <BiLogoInstagram size={25} color="#000" />
                  <FaXTwitter size={22} color="#000" />
                  <PiYoutubeLogoLight size={24} color="#000" />
                  <LiaWhatsapp size={24} color="#000" />
                </div>
              </div>
            </Col>
          </Row>
        </main>
      </Container>
      <div className="final-footer">
        <Container>
          <div className="final-footer-inner">
            <span className="copyright-txt">
              COPYRIGHT © 2023 NEXT ME LLC. ALL RIGHTS RESERVED
            </span>
            <span className="copyright-txt-2">{t("terms_desc")}</span>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
