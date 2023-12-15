import { Row, Col, Container } from "react-bootstrap";
import SaleMessage from "../../components/saleMessage";
import SubscribeNewsletter from "../../components/subscribeNewsletter";
import PageHeader from "../../components/pageHeader";
import { useEffect } from "react";
import React from "react";

function AboutNextme() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Screen-box">
      <div>
        <SaleMessage />
      </div>
      <div className="ftscreen-fnt mx-2">
        <PageHeader text="About GOLD BAZAR – UAE’s Leading Electronics Retailer" />
        <h3 className="border-bottom border-secondary pb-3">
          GOLD BAZAR – Yes, Your Electronics Destination!
        </h3>
        <h5>TURNING A CONCEPT INTO A REALITY</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          Since its inception in 2005, GOLD BAZAR has come a long way and achieved
          many milestones to become one of the leading powerhouse retailers in
          the region. UAE’s first ever Big-Box concept started its journey as a
          15,000 sq ft electronics store in Dubai. The brand’s perseverance and
          hard work has paid off with 33 stores in United Arab Emirates,
          Bahrain, Egypt & Oman today and more in the offing.
        </div>
        <h5>WIDEST CHOICE, BEST VALUE, TRUSTED SERVICE</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          With over 25,000 electronic products and accessories to choose from
          reputed international brands, GOLD BAZAR’s distinctive style of enhancing
          customer lifestyle has left an indelible mark on the consumers mind,
          making us a household name to be reckoned with. We pride ourselves on
          our exemplary service and product knowledge at the store level,
          coupled with the widest range of electronics available at the best
          value on display at one location.f
        </div>
        <h5>KEY DIFFERENTIATORS</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          Our 24 hour ‘Product not available, claim free’ brand promise is a
          GOLD BAZAR assurance to customers which ensures that all product
          availability concerns are met with satisfactorily. GOLD BAZAR ensures
          that the products are authorized to avoid any post purchase difficulty
          faced by customers. The GOLD BAZAR ‘best price guarantee’ to customers is
          another highlight which ensures that customers get the best value for
          any product across all GOLD BAZAR stores. In case of customer finding a
          product cheaper elsewhere, GOLD BAZAR ensures that the price is matched.
          It strengthens customers’ trust in GOLD BAZAR in delivering the best
          price in the market.
        </div>
        <h5>POSITIVE REINFORCEMENT </h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          Every month over 1 million customers visit our stores to make their
          purchases and enjoy the exceptional service and ambience that Gold Bazar has become famous for. This is further reinforced by our customers’
          and vendors’ endorsement towards GOLD BAZAR as their premier electronics
          destination through awards and accolades that we have collected over
          the years:
        </div>
        <ul className="bullet-list ps-4">
          <li>Superbrand 2017, 2016, 2015, 2014, 2013, 2012, 2011</li>
          <li>
            Retail ME 2011: Most admired Retailer of the year: consumer
            electronics
          </li>
          <li>
            LG retailer awards 2011: Best support and best in-store display
            across select categories
          </li>
          <li>
            Reseller Awards 2011: Best Retailer of the year by Vendors &
            Resellers’ choice of channel awards
          </li>
          <li>MAF Awards 2011: Anchor Store of the Year</li>
          <li>MAF Awards 2011: Retailer of the year</li>
          <li>Dubai Shopping Festival 2010: Innovation Award</li>
          <li>
            Middle East Retail Academy Awards 2009: Best Retailer for
            Marketing/Promotion
          </li>
          <li>
            Middle East Retail Academy Awards 2009: Store Concept of the Year
          </li>
          <li>Channel Middle East Award 2009: Retail Company of the year</li>
          <li>
            VAR Magazine 2009: Vendor’s Choice Preferred Retailer of the Year
          </li>
          <li>ACER Awards 2009: Power Retailer of the Year</li>
        </ul>
      </div>
      <div className="mt-5">
        <SubscribeNewsletter />
      </div>
    </div>
  );
}
export default AboutNextme;
