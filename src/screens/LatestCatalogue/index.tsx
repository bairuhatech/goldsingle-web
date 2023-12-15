import { Col, Container, Row } from "react-bootstrap";
import SaleMessage from "../../components/saleMessage";
import SubscribeNewsletter from "../../components/subscribeNewsletter";
import PageHeader from "../../components/pageHeader";
import "./styles.scss";
import { useEffect } from "react";
import React from "react";

function LatestCatelogue() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Screen-box">
      <div>
        <SaleMessage />
      </div>
      <div className="ftscreen-fnt m-2">
        <div className="d-inline-block text-truncate mw-100">
          <PageHeader text="Next ME Catalogue – Find best offers on Smartphones, Laptops, Tablets, Televisions, Cameras, Gaming, Home Appliances and more in Dubai, UAE"></PageHeader>
        </div>
        <div className="fs-4">Latest Offer Catalogue by Next ME UAE</div>
        <div className="py-2">On products sold by Next ME Only</div>
        <Row className="pt-3 jusify-content-center">
          <Col md={6}>
            <h3 className="text-center">Mega Home Fest</h3>
            <div className="LatestCatalogue-col1 ">
              <iframe
                className=" LatestCatalogue-frame "
                allow="clipboard-write"
                sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
                allowFullScreen={true}
                src="https://e.issuu.com/embed.html?d=mega-home-fest&amp;u=uniqueeyes"
              ></iframe>
            </div>
          </Col>
          <Col md={6}>
            <h3 className="text-center">Apple New Launch</h3>
            <div className="LatestCatalogue-col1 ">
              <iframe
                className="LatestCatalogue-frame"
                allow="clipboard-write"
                sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
                allowFullScreen={true}
                src="https://e.issuu.com/embed.html?d=mega-home-fest&amp;u=uniqueeyes"
              ></iframe>
            </div>
          </Col>
        </Row>
      </div>
      <div className="mt-5">
        <SubscribeNewsletter />
      </div>
    </div>
  );
}
export default LatestCatelogue;
