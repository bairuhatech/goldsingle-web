import { Row, Col, Container } from "react-bootstrap";
import SaleMessage from "../../components/saleMessage";
import SubscribeNewsletter from "../../components/subscribeNewsletter";
import PageHeader from "../../components/pageHeader";
import { useEffect } from "react";
import React from "react";
function BulkOrderEnquires() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Screen-box">
      <div>
        <SaleMessage />
      </div>
      <div className="ftscreen-fnt mx-2">
        <PageHeader text="Bulk Orders & Enquiries" />
        <h5>Bulk Orders & Enquiries</h5>
        <div className="p-2" style={{ textAlign: "justify" }}>
          Choose from a range of brands in the categories of entertainment,
          communication, appliances, gaming etc at the best price. We offer you
          great products at attractive prices, supported by a robust after sales
          service network. So, if you are thinking of innovative corporate gifts
          fill in the details below and give us an opportunity to Help You Buy.
        </div>
        <div className="p-2 " style={{ textAlign: "justify" }}>
          <a href="mailto:support@nextme.com">Just send us an email</a> with
          your company’s contact details and the products that you are
          interested in and we will come back to you as soon as possible.
        </div>
      </div>
      <div className="mt-5">
        <SubscribeNewsletter />
      </div>
    </div>
  );
}
export default BulkOrderEnquires;
