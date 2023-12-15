import { Row, Col, Container } from "react-bootstrap";
import SaleMessage from "../../components/saleMessage";
import brandPromise from "../../assets/images/brandpromise.png";
import SubscribeNewsletter from "../../components/subscribeNewsletter";
import { Collapse } from "antd";
import { TiMinusOutline, TiPlusOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import "./styles.scss";
import PageHeader from "../../components/pageHeader";
import React from "react";

const { Panel } = Collapse;
function BrandPromise() {
  const [open, setOpen] = useState(false);

  const toggleTerms = () => {
    setOpen(!open);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Screen-box">
        <div>
          <SaleMessage />
        </div>
      <Row className="mx-2 ftscreen-fnt">
        <PageHeader text="Brand Promise – Any product in 24 hours, or its free" />

        <Col md={12}>
          <img
            className="img-responsive mt-3  w-100"
            src={brandPromise}
            alt="BrandPromise Image"
          />
        </Col>
        
          <Col md={2} />
          <Col md={8}>
            <div className="d-flex p-2 mt-5" style={{ textAlign: "justify" }}>
              For over a decade GOLD BAZAR has been known as the preferred store to
              find whatever you may want in consumer electronics and appliances.
              Our unmatched range and availability is backed up by our bold
              promise – “If we don’t have it, you get it free”.
            </div>
            <div className="d-flex p-2 mt-1" style={{ textAlign: "justify" }}>
              Put it simply – if there’s something you can’t find at GOLD BAZAR,
              we’ll have it for you within 24 hours, else it’s free! We will
              have the product ready at one of our stores or deliver it to your
              home as per your convenience. The Brand Promise covers all
              products which are officially launched and available in the UAE
              and are current ‘running’ models.
            </div>
            <div
              className="d-flex p-2 mt-1 mb-5"
              style={{ textAlign: "justify" }}
            >
              With over 5000 satisfied customers every year who have shopped
              with us using our Brand Promise – this is one promise that we
              deliver on!
            </div>
            <div>
              <Collapse defaultActiveKey={[]} onChange={() => {}}>
                <Panel
                  showArrow={false}
                  header={
                    <h6 className="terms-header" onClick={toggleTerms}>
                      {open ? <TiMinusOutline /> : <TiPlusOutline />} Click here
                      to view the terms & conditions related to the Brand
                      Promise
                    </h6>
                  }
                  key="1"
                >
                  <h5>TERMS & CONDITIONS</h5>
                  <ul>
                    <li>
                      Product/Brand should have an authorized UAE distributor
                      registered with the UAE Government and stocks should be
                      available with the distributor within the territorial
                      limits of UAE.
                    </li>
                    <li>
                      Color of product, language, product feature, and place of
                      manufacture will NOT be taken into consideration for the
                      claim.
                    </li>
                    <li>
                      This scheme does not apply to products listed on the Gold Bazar website, discontinued products, products not officially
                      launched, products not approved by Telecom Regulatory
                      Authority, home delivery products (large TV panels, large
                      home appliances, etc., accessories).
                    </li>
                    <li>
                      This scheme is valid only on consumer electronics and not
                      for commercial/industrial products. Proprietary brands
                      which are only distributed and sold through sole retailer
                      or 1 retail chain are excluded from this scheme.
                    </li>
                    <li>
                      Deadlines will not be applicable on products requested
                      through CRD.
                    </li>
                    <li>
                      24 hours refers to working hours only and is equivalent to
                      2 full working days including the day of request. This
                      does not include public holidays declared by UAE
                      government.
                    </li>
                    <li>
                      A maximum of 2 products per consumer and only 2 units per
                      product desired will be entertained. This scheme does not
                      apply to bundle offers/promotion products.
                    </li>
                    <li>
                      If the product is not available with the authorized
                      distributor, then the official confirmation of
                      non-availability will be presented to the customer, upon
                      request. In this event, there will be no compensation
                      offered.
                    </li>
                    <li>
                      If the desired product is not available in the store, the
                      following procedures will be conducted:
                      <ul>
                        <li>
                          The sales staff will check whether the product is
                          covered under Brand Promise and if covered will
                          invoice the customer the full amount of the product.
                        </li>
                        <li>
                          Customer will need to provide the Customer
                          Name/Contact Details/Physical Address/Brand/Model No.
                          and also specify if he/she wishes home delivery or
                          would come to the store to pick up the product.
                        </li>
                        <li>
                          If the customer is not reachable by delivery agent for
                          home delivery then GOLD BAZAR cannot be held responsible
                          for not delivering item on time as promised, however a
                          second attempt to deliver would be done on the
                          following working day, failing which the product will
                          be kept in the warehouse.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Free delivery in UAE only. For regions beside the
                      “Delivery Covered List”, there will be an extra working
                      day for delivery.
                    </li>
                    <li>
                      In case the product requested, is covered under BP scheme
                      as per the terms and conditions, is NOT made available to
                      the customer within next day 10pm, then the product will
                      be offered to the customer Free of Cost or in its absence
                      GOLD BAZAR’s gift vouchers of equivalent value will be
                      provided.
                    </li>
                    <li>
                      Standard GOLD BAZAR Exchange, Refund, Repair and Warranty
                      terms and conditions will apply.
                    </li>
                    <li>
                      This scheme is valid at all GOLD BAZAR outlets across UAE,
                      all disputes under this scheme will be resolved under the
                      jurisdiction of Dubai Court.
                    </li>
                    <li>
                      By accepting this scheme, the customer agrees to be bound
                      by the terms and conditions mentioned herein. GOLD BAZAR
                      reserves the right to amend the terms and conditions as
                      and when required.
                    </li>
                  </ul>
                </Panel>
              </Collapse>
            </div>
            <div className="text-center mt-2" style={{ fontSize: "13px" }}>
              For enquiries on status of product
            </div>
            <div className="text-center mt-3 fw-bold">Call 9876543210 </div>
          </Col>
          <Col md={2} />
        
      </Row>
      <div className="col-12 mt-5">
        <SubscribeNewsletter />
      </div>
    </div>
  );
}
export default BrandPromise;
