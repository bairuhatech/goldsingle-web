import { Row, Col, Container } from "react-bootstrap";
import SaleMessage from "../../components/saleMessage";
import bestPrice from "../../assets/images/bestprice.png";
import SubscribeNewsletter from "../../components/subscribeNewsletter";
import PageHeader from "../../components/pageHeader";
import { useEffect } from "react";
import React from "react";

function BestPrice() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Screen-box">
      <div>
        <SaleMessage />
      </div>
      <Row className="ftscreen-fnt mx-2">
        <PageHeader text="Best Price Guarantee (BPG)" />
        <Col md={12}>
          <img
            className="img-responsive w-100 px-md-4"
            src={bestPrice}
            alt="BestPrice Image"
          />
        </Col>
        <h4 className="text-center mt-5">Best Price Guarantee (BPG)</h4>
        <h5 className="mt-4">1. WHAT IS BEST PRICE GUARANTEE (BPG) PROGRAM?</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          BPG is a unique program offered by GOLD BAZAR to help you shop
          confidently while we check the prices on your behalf. If you find a
          lower price at another retailer (excluding web stores) of the power
          retailers, we match the price. And that’s our promise.
        </div>
        <div className="d-flex p-2 mt-1" style={{ textAlign: "justify" }}>
          Purchase of the product from GOLD BAZAR is mandatory to claim difference
          under BPG. The difference can be claimed within three days from date
          of purchase of the product.
        </div>
        <h5 className="mt-4">2. WHICH PRICES DO WE MATCH?</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          We match prices publicly available to all customers based on those
          displayed in the stores (excluding web stores) of power retailers in
          Abu Dhabi, Al Ain, Dubai, Fujairah and Sharjah. The price has to apply
          to an identical individual product in terms of make, model, size and
          color. The power retailer has to have the product actually in stock
          (rather than available only to order). We do not match special prices
          available to certain customers – such as negotiated prices for
          corporates or customers with voucher codes or bulk purchases (more
          than 2 units of identical product).
        </div>
        <h5 className="mt-4">3. WHO ARE THE POWER RETAILERS?</h5>
        <div>
          <ul className="bullet-list">
            <li>Axiom</li>
            <li>Carrefour</li>
            <li>Emax</li>
            <li>Lulu</li>
          </ul>
        </div>

        <h5 className="mt-4">
          4. WHAT IF A COMPETITOR IS OFFERING A BUNDLE OF PRODUCTS AT DISCOUNTED
          PRICE OR WITH A FREE ITEM?
        </h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          If the price of the individual identical product in the bundle is
          available at a lower price, we will match the price of the product as
          per the BPG Terms & Conditions. In case we are able to offer an
          equivalent bundle, BPG will not apply.
        </div>
        <h5 className="mt-4">5. HOW DO I CLAIM THE DIFFERENCE?</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          To claim the difference, you can either email or call us or
          alternatively visit any of our stores and provide the below mandatory
          information. We will revert to you within 24 hours:
        </div>
        <div className="d-flex p-2 mt-1" style={{ textAlign: "justify" }}>
          Invoice copy for the product you purchased from GOLD BAZAR
        </div>
        <div className="d-flex p-2 mt-1" style={{ textAlign: "justify" }}>
          Proof of the lower price at the power retailer (either a quote from
          the power retailer or the photograph of the displayed price for the
          product) along with the date on which the price difference was
          observed.
        </div>
        <div className="d-flex p-2 mt-1" style={{ textAlign: "justify" }}>
          You need not worry if you do not have the proof. We will get the price
          checked on your behalf. Just share the name and location of the power
          retailer where you found the price difference.
        </div>
        <div>
          <ul className="bullet-list">
            <li>
              <strong>OPTION 1:</strong> EMAIL US: SUPPORT@GOLDBAZAR.COM
            </li>
            <li>
              <strong>OPTION 2:</strong> CALL US: 9876543210
            </li>
            <li>
              <strong>OPTION 3:</strong> YOU MAY VISIT ANY OF OUR GOLD BAZAR STORES
              ALONG WITH THE ORIGINAL GOLD BAZAR INVOICE AND PROOF OF THE LOWER
              PRICE AT THE COMPETITOR.
            </li>
          </ul>
        </div>
        <div className="d-flex p-2 mt-1" style={{ textAlign: "justify" }}>
          We will verify the claim and revert within 24 hours. However, the
          claim is not applicable on bulk purchases (more than 2 units of
          identical products).
        </div>
        <h5 className="mt-4">
          6. WHAT IS THE POLICY ON MATCHING NON-ELECTRONIC GIFT VOUCHERS?
        </h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          GOLD BAZAR reserves the right to value the Non-Electronic Gift Vouchers
          issued at the power retailers under Best Price Guarantee policy.
        </div>
        <div className="d-flex p-2 mt-1" style={{ textAlign: "justify" }}>
          GOLD BAZAR reserves the right to modify, restrict, or discontinue the
          Best Price Guarantee program at any time, for any or no reason, and
          without prior notice or liability to you.
        </div>
        <div className="d-flex p-2 mt-1" style={{ textAlign: "justify" }}>
          GOLD BAZAR reserves the right to cancel a previously matched or paid item
          if it is found that a customer has violated or circumvented the Best
          Price Guarantee Terms & Conditions. In the event SDG believes that the
          Best Price Guarantee is being intentionally abused or manipulated, we
          reserve the right to cancel the match and request the difference from
          you and to reject future Best Price Guarantee claims from any persons
          who participated in such actions.
        </div>
      </Row>
      <div className="mt-5">
        <SubscribeNewsletter />
      </div>
    </div>
  );
}
export default BestPrice;
