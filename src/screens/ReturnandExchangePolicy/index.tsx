import { Row, Col, Container } from "react-bootstrap";
import SaleMessage from "../../components/saleMessage";
import SubscribeNewsletter from "../../components/subscribeNewsletter";
import PageHeader from "../../components/pageHeader";
import { useEffect } from "react";
import React from "react";
function ReturnandExchangePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Screen-box">
      <div>
        <SaleMessage />
      </div>
      <div className="ftscreen-fnt mx-2">
        <PageHeader text=" Return, Exchange and Warranty" />
        <h5 className="my-4">RETURN AND EXCHANGE POLICY (Store and Online)</h5>
        <div className="py-2">
          At Next ME your satisfaction is a guarantee. If you are not satisfied
          with your purchase, we will take back sold product/s within seven (7)
          days from the date of collection or Home Delivery of the product/s.
          The return & exchange is subject to the following terms and
          conditions.
        </div>
        <div className="py-2">
          For Return & Exchange of product/s, Customer to visit any nearest Next
          ME Store in UAE, call Next ME Helpline Number{" "}
          <strong>(6238780530)</strong> or e-mail us on{" "}
          <strong>support@nextmiddleeast.com </strong> for assistance. For
          Market Place product/s, please refer to the section – Return and
          Exchange Policy – Market Place.
        </div>
        <div className="py-2 fs-5">
          Return – Process for iPhone 14 series phone:
        </div>
        <div className="py-2 pt-0">
          -All returns/replacements are to happen at Time Square Center,
          Abudhabi Mall, and Al Ain Mall stores only.
        </div>
        <ul>
          <li>
            The product/s should be accompanied by the original Sales Invoice
            for Return and Exchange.
          </li>
          <li>
            The product/s must be in unused and unopened condition, with all the
            original packaging material, accessories, manuals, registration
            cards, free of cost (FOC)/bundled product/s and promotional
            vouchers.
          </li>
          <li>The Return and Exchange are not applicable:</li>
          <ul>
            <li>
              If the packaging is incomplete or product damaged or scratched.
            </li>
            <li>
              Customized/special order product/s cut cable/wire, apparels,
              personal care, and hygiene product/s.
            </li>
            <li>Online Activation Code is scratched or redeemed.</li>
            <li>
              The device is having an activation/password lock, Find My iPhone
              (FMIP) Find My Mobile (FMM) or Find my Device (FMD) is activated.
            </li>
            <li>If the VAT is refunded against the Invoice.</li>
            <li>
              If the packaging has minor soiling or is opened and the product is
              not defective, unused, with no visible scratches or marks observed
              on the product or the packaging; the product will be taken back
              with a Restocking Fee of a minimum of 15% or as applicable while
              making return or exchange. For Major/Medium Home Appliance/s and
              Large panel/s, the restocking fees will apply after the review of
              the authorized service partner.
            </li>
          </ul>
          <li>
            Return or Exchange on Major/Medium Home Appliance, Large panel
            Audio/Video product/s will be done based on the manufacturer’s
            authorized service center’s investigation report and approval.
          </li>
          <li>
            For Dead on arrival (DOA)/not functioning as per operational
            manual/falling short of declared product specifications will be
            exchanged, or returned:
          </li>
          <ul>
            <li>
              After it has been verified by our personnel or manufacturer’s
              authorized service center technician, as applicable.
            </li>
            <li>
              The process can take up to four business days. Return/Exchange
              will be done only after the investigation/technical report.
            </li>
          </ul>
          <li>
            If the product returned, has any data or information stored in the
            memory or storage device, Next ME will not be responsible for the
            transfer of such data or information to another product given to the
            customer as an exchange, or for the loss of any data or information
            still residing on the returned product.
          </li>
          <li>
            Product/s purchased through credit/debit card will be refunded ONLY
            to the same credit/debit card used for the transaction. A refund for
            product/s purchased through any kind of Gift Cards, Points, etc.
            will be refunded through Next ME Gift Card.
          </li>
          <li>
            Service, delivery, and installation charges are non-refundable once
            performed and acknowledged by the Customer.
          </li>
          <li>
            Customer to inspect product/s PRIOR to signing the Proof of Delivery
            (POD) document and before the delivery agent’s departure. Any
            product/s delivered, signed and/or accepted and subsequently
            reported damaged or broken such claims will not qualify for return &
            exchange or Warranty Terms and conditions.
          </li>
          <li>
            Extended warranty/Damage Protection Plans are subject to return if
            the product/s is/are returned during the manufacture warranty
            period.
          </li>
          <li>
            Store Management will act as per the above policies and Store
            Management’s decision will be treated as a final decision.
          </li>
        </ul>
        <h5 className="my-4">RETURN AND EXCHANGE POLICY (Marketplace)</h5>
        <div className="py-2">
          For Exchange or Return, of Marketplace Product/s Customer to call Next
          ME Helpline Number <strong>(6238780530)</strong> or e-mail us on{" "}
          <strong>support@nextmiddleeast.com </strong> for assistance.
          Marketplace product/s will not be exchanged or returned at the Next ME
          Stores. The return and exchange are subject to the following terms and
          conditions:
        </div>
        <ul>
          <li>The product/s must be in unopened/sealed condition.</li>
          <li>
            Fragrance, Perfume, Cosmetic, Apparel, Linen, Stationary, Personal
            Care, Hygiene product/s, Online activation card, Customized/special
            order product/s (e.g. assembled/tailormade furniture), cut
            cable/wire are not applicable for return or exchange if packaging if
            opened or used. Anomalies if any can be reported through Next ME
            compliant channels mentioned above.
          </li>
          <li>
            For Dead on arrival (DOA)/not functioning as per operational
            manual/falling short of declared product/s specifications will be
            exchanged, or returned:
            <ul>
              <li>After it has been verified by the Seller.</li>
              <li>
                The process can take up to seven business days from the date of
                collection. Return/Exchange will be done only after the
                investigation/technical report.
              </li>
            </ul>
          </li>
          <li>
            Return or Exchange on Major/Medium Home Appliances, Large panels,
            Furniture, Home Decor, linen, Fitness equipment, Travel, Sunglasses,
            Watch and Audio/Video product will be done based on the Seller’s
            investigation report and approval.
          </li>
          <li>
            Customer to inspect product/s PRIOR to signing the Proof of Delivery
            (POD) document and before the delivery agent’s departure. Any
            product/s delivered, signed and/or accepted and subsequently
            reported damaged or broken such claims will not qualify for return &
            exchange or Warranty Terms and conditions.
          </li>
          <li>
            All refunds will be processed to the Customer post the quality check
            is carried out after the return of the product/s.
          </li>
        </ul>
        <h5 className="my-4">WARRANTY TERMS & CONDITIONS</h5>
        <ul>
          <li>
            The warranty tendered hereunder, on the product/s sold under this
            invoice has been provided exclusively by their respective Authorized
            Agents/Distributors/Seller and is limited to the UAE region only or
            otherwise mentioned as per the warranty conditions as carried along
            with the product/s or mentioned on the Invoice/Website. In instances
            where products are bought through a seller (Marketplace), the terms
            of the respective seller’s warranty will apply.
          </li>
          <li>
            Customers to ensure data and information on the devices are backed
            up and device locks, find my iPhone (FMI), Find My Mobile (FMM) or
            Find My Device (FMD) are de-activated before handing over for
            service.
          </li>
          <li>
            Primary responsibility for warranty service rests with the brand
            owner/supplier or Marketplace Seller and nextmiddleeast.com is a
            facilitator only.
          </li>
          <li>
            Accessory, Battery, Printhead, Perfume, Toy, Stationary, Furniture,
            Home Decor, Linen, Apparel, Cosmetics, Grocery, and any Consumable
            product/s are not covered under warranty.
          </li>
          <li>
            Warranty becomes invalid if the product/s has been opened or
            tampered by an unauthorized service center, Liquid, or Physical
            Damages.
          </li>
        </ul>
        <h5 className="mt-5">CHECK WARRANTY STATUS</h5>
        <div className="py-2 pt-0">
          To check the status of the warranty of products you purchased from
          Next ME, visit{" "}
          <a href="https://uae.nextmiddleeast.com/warranty/">
            https://uae.nextmiddleeast.com/warranty/
          </a>
        </div>
      </div>
      <div className="mt-5">
        <SubscribeNewsletter />
      </div>
    </div>
  );
}
export default ReturnandExchangePolicy;
