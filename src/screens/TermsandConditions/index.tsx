import { Row, Col, Container } from "react-bootstrap";
import SaleMessage from "../../components/saleMessage";
import SubscribeNewsletter from "../../components/subscribeNewsletter";
import ExpressIcon from "../../assets/images/EDbadge.png";
import EDfilter from "../../assets/images/EDfilter.png";
import PageHeader from "../../components/pageHeader";
import { useEffect } from "react";
import React from "react";
function TermsandConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Screen-box">
      <div>
        <SaleMessage />
      </div>
      <div className="ftscreen-fnt m-2">
        <PageHeader text="Terms and Conditions" />
        <h5>Terms and conditions</h5>
        <h5 className="mt-4">Introduction</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          Welcome to the goldbazar.com, service provided by Gold Bazar LLC. In using
          the goldbazar.com service of Gold Bazar LLC you are deemed to have accepted
          the terms and conditions listed below.
        </div>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          All products/services and information displayed on goldbazar.com
          constitute an “invitation to offer”. Your order for purchase
          constitutes your “offer” which shall be subject to the terms and
          conditions as listed below. goldbazar.com reserves the right to accept or
          reject your offer. If you have supplied us with your valid email
          address, we will notify you by email as soon as possible to confirm
          receipt of your order and email you again to confirm details and
          therefore process the order. Our acceptance of your order will take
          place upon dispatch of the product(s) ordered. No act or omission of
          goldbazar.com prior to the actual dispatch of the product(s) ordered will
          constitute acceptance of your offer.
        </div>
        <h5 className="mt-4">Membership Eligibility</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          Use of the Site is available only to persons who can form legally
          binding contracts under applicable law. Persons who are “incompetent
          to contract” as per local Contract Acts are not eligible to use the
          Site. If you are a minor i.e. under the age of 18 years but at least
          13 years of age you may use this Site only under the supervision of a
          parent or legal guardian who agrees to be bound by these Terms of Use.
          If your age is below that of 18 years your parents or legal guardians
          can transact on behalf of you if they are registered users/members.
          You are prohibited from purchasing any material which is for adult
          consumption the sale or purchase of which to/by minors are strictly
          prohibited. goldbazar.com reserves the right to terminate your membership
          and refuse to provide you with access to the Site if goldbazar.com
          discovers that you are under the age of 18 years. The Site is not
          available to persons whose membership has been suspended or terminated
          by goldbazar.com for any reason whatsoever. If you are registering as a
          business entity, you represent that you have the authority to bind the
          entity to this User Agreement. Those who choose to access this Site
          from outside Dubai are responsible for compliance with local laws if
          and to the extent local laws are applicable. goldbazar.com will deliver
          the products only within its jurisdiction and will not be liable for
          any claims relating to any products ordered from outside its
          jurisdiction. Except where additional terms and conditions are
          provided which are product specific, these terms and conditions
          supersede all previous representations, understandings, or agreements
          and shall prevail notwithstanding any variance with any other terms of
          any order submitted. By using the services of goldbazar.com you agree to
          be bound by the Terms and Conditions.
        </div>
        <h5 className="mt-4">Account and Registration Obligations</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          “Your Information” is defined as any information you provide to us in
          the registration, buying or listing process, in the feedback area or
          through any email feature. We will protect Your Information in
          accordance with our Privacy Policy. If you use the Site, you are
          responsible for maintaining the confidentiality of Your Account and
          Password and for restricting access to your computer, and you agree to
          accept responsibility for all activities that occur under Your Account
          or Password. goldbazar.com shall not be liable to any person for any loss
          or damage which may arise as a result of any failure by you to protect
          your password or account. If you know or suspect that someone else
          knows your password you should notify us by contacting us immediately
          through the address provided below. If goldbazar.com has reason to
          believe that there is likely to be a breach of security or misuse of
          the goldbazar.com Site, we may require you to change your password or we
          may suspend your account without any liability to goldbazar.com.
        </div>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          You also agree to:
        </div>

        <div style={{ textAlign: "justify" }}>
          1. Provide true, accurate, current and complete information about
          yourself as prompted by GOLD BAZAR’s registration form (such information
          being the “Registration Data”)
        </div>
        <div style={{ textAlign: "justify" }}>
          2. Maintain and promptly update the Registration Data to keep it true,
          accurate,current and complete.
        </div>
        <div style={{ textAlign: "justify" }}>
          If you provide any information that is untrue, inaccurate, incomplete,
          or not current or if goldbazar.com has reasonable grounds to suspect that
          such information is untrue, inaccurate, and not current or not in
          accordance with the User Agreement, goldbazar.com has the right to
          indefinitely suspend or terminate your membership and refuse to
          provide you with access to the Site.
        </div>

        <h5 className="mt-4">Pricing Information</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          While goldbazar.com strives to provide accurate product and pricing
          information, pricing or typographical errors may occur. goldbazar.com
          cannot confirm the price of a product until after you order. In the
          event that a product is listed at an incorrect price or with incorrect
          information due to an error in pricing or product information,
          goldbazar.com shall have the right, at our sole discretion, to refuse or
          cancel any orders placed for that product, unless the product has
          already been dispatched. In the event that an item is wrongly priced,
          goldbazar.com may, at its discretion, either contact you for instructions
          or cancel your order and notify you of such cancellation. Unless the
          product ordered by you has been dispatched, your offer will not be
          deemed accepted and goldbazar.com will have the right to modify the price
          of the product and contact you for further instructions using the
          e-mail address provided by you during the time of registration, or
          cancel the order and notify you of such cancellation. In the event
          that goldbazar.com accepts your order the same shall be debited to your
          credit card account and duly notified to you by email that the payment
          has been processed. The payment may be processed prior to goldbazar.com
          dispatch of the product that you have ordered. If we have to cancel
          the order after we have processed the payment, the said amount will be
          reversed back to your credit card account. No cash disbursement shall
          be made under any condition whatsoever. We strive to provide you with
          the best prices possible on goldbazar.com as well as in all our stores
          under GOLD BAZAR LLC. However, sometimes a price online does not match
          the price in a store. In our effort to be the lowest price provider in
          your particular geographic region, store pricing will sometimes differ
          from online prices. Prices and availability are subject to change
          without prior notice.
        </div>
        <h5 className="mt-4">Delivery</h5>
        <div className=" p-2" style={{ textAlign: "justify" }}>
          It takes 2 – 5 business days to deliver your order within UAE. In case
          of items such as refrigerators, televisions of size 50” and above,
          washing machines and other major appliances, which are delivered by
          the supplier, the delivery happens within 5-7 business days. Delivery
          <a href="/delivery-restricted"> outside City limits</a> are subjected
          to additional charges based on the category of the products. To know
          non-serviceable areas and remote areas,
          <a href="/delivery-restricted"> click here</a>.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          <strong className="fw-bold;">Express Delivery</strong> is a faster
          delivery system for customers who need their orders sooner than
          regular delivery time. Generally, orders placed online takes 2 – 3
          working days to deliver. With Express Delivery customer gets their
          order in less than 24 hrs if ordered within city limits of Dubai &
          Sharjah. Express Delivery is available on select products from top
          categories only. An{" "}
          <img className="w-10" src={ExpressIcon} alt="EDbadge" /> badge will
          appear on the website on all such products for which customers can
          avail this service. Customers can also filter such products from the{" "}
          <img src={EDfilter} alt="ExpressFilter" /> filter available on the
          website. Express Delivery is absolutely free for DG Members.
        </div>
        <h5 className="mt-4">Cancellation by goldbazar.com</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          Please note that there may be certain orders that we are unable to
          accept and must cancel. We reserve the right, at our sole discretion,
          to refuse or cancel any order for any reason. Some situations that may
          result in your order being canceled include limitations on quantities
          available for purchase, inaccuracies or errors in product or pricing
          information, or problems identified by our credit and fraud avoidance
          department, cases where we find that the customer is manipulating the
          account to place multiple orders. We may also require additional
          verifications or information before accepting any order. We will
          contact you if all or any portion of your order is canceled or if
          additional information is required to accept your order. If your order
          is cancelled after your credit card has been charged, the said amount
          will be reversed back in your Card Account. No cash disbursement shall
          be made under any condition whatsoever.
        </div>
        <h6 className="mt-4">Quality check</h6>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          In order to ensure top quality customer experience, we do a quality
          check on orders dispatched at our end. If we find any fault in the
          product(s) in your order, we reserve the rights to cancel the order
          partially or fully. On such cases, we shall notify you about the same.
        </div>
        <h5 className="mt-4">Cancellations by the Customer</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          In case we receive a cancellation notice and the order has not been
          processed/approved by us, we shall cancel the order and refund the
          entire amount. We will not be able to cancel orders that have already
          been processed and shipped out by us. goldbazar.com has the full right to
          decide whether an order has been processed or not. The customer agrees
          not to dispute the decision made by goldbazar.com and accept goldbazar.com’s
          decision regarding the cancellation.
        </div>
        <h5 className="mt-4">Cancellations By Seller</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          In case the seller is unable to fulfil order due to stock
          unavailability, GOLD BAZAR Customer Care will connect with customer &
          assist with alternatives.
        </div>
        <h5 className="mt-4">Credit Card Details</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          You agree, understand and confirm that the credit card details
          provided by you for availing of services on goldbazar.com will be correct
          and accurate and you shall not use the credit card which is not
          lawfully owned by you, i.e. in a credit card transaction, you must use
          your own credit card. You further agree and undertake to provide the
          correct and valid credit card details to goldbazar.com. Further the said
          information will not be utilized and shared by goldbazar.com with any of
          the third parties unless required for fraud verifications or by law,
          regulation or court order. goldbazar.com will not be liable for any
          credit card fraud. The liability for use of a card fraudulently will
          be on you and the onus to ‘prove otherwise’ shall be exclusively on
          you.
        </div>
        <h5 className="mt-4">Fraudulent /Declined Transactions</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          goldbazar.com reserves the right to recover the cost of goods, collection
          charges and lawyers fees from persons using the Site fraudulently.
          goldbazar.com reserves the right to initiate legal proceedings against
          such persons for fraudulent use of the Site and any other unlawful
          acts or acts or omissions in breach of these terms and conditions.
        </div>
        <h5 className="mt-4">Transactional Restrictions</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          The website will not allow orders to get placed if any of the below
          event occur. Customer can claim a refund in such cases where money is
          deducted from their account. However, the order will not be fulfilled
          under any circumstances.
        </div>
        <ul className="bullet-list ps-4">
          <li>Cards issued outside GCC and Egypt are not accepted</li>
          <li>Multiple attempts with in a day (Max 2 allowed)</li>
          <li>Multiple transactions within a day (Max 2 allowed)</li>
          <li>Unauthorized use of any credit/debit card.</li>
        </ul>
        <h5 className="mt-4">Electronic Communications</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          When you visit the Site or send emails to us, you are communicating
          with us electronically. You consent to receive communications from us
          electronically. We will communicate with you by email or by posting
          notices on the Site. You agree that all agreements, notices,
          disclosures and other communications that we provide to you
          electronically satisfy any legal requirement that such communications
          be in writing.
        </div>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          You Agree and Confirm
        </div>
        <ul className="bullet-list ps-4">
          <li>
            That in the event that a non-delivery occurs on account of a mistake
            by you (i.e. wrong name or address or any other wrong information)
            any extra cost incurred by goldbazar.com for redelivery shall be
            claimed from you.
          </li>
          <li>
            That you will use the services provided by goldbazar.com, its
            affiliates, consultants, and contracted companies, for lawful
            purposes only and comply with all applicable laws and regulations
            while using the Site and transacting on the Site.
          </li>
          <li>
            You will provide authentic and true information in all instances
            where such information is requested of you. goldbazar.com reserves the
            right to confirm and validate the information and other details
            provided by you at any point of time. If upon confirmation your
            details are found not to be true (wholly or partly), goldbazar.com has
            the right in its sole discretion to reject the registration and
            debar you from using the Services of goldbazar.com and / or other
            affiliated websites without prior intimation whatsoever.
          </li>
          <li>
            That you are accessing the services available on this Site and
            transacting at your sole risk and are using your best and prudent
            judgment before entering into any transaction through this Site.
          </li>
          <li>
            That the address at which delivery of the product ordered by you is
            to be made will be correct and proper in all respects.
          </li>
          <li>
            That before placing an order you will check the product description
            carefully. By placing an order for a product you agree to be bound
            by the conditions of sale included in the item’s description.
          </li>
        </ul>
        <div className="d-flex p-2 fw-bold mt-4">
          You may not use the Site/ mobile app for any of the following
          purposes:
        </div>
        <ul className="bullet-list ps-4">
          <li>
            Disseminating any unlawful, harassing, libelous, abusive,
            threatening, harmful, vulgar, obscene, or otherwise objectionable
            material.
          </li>
          <li>
            Transmitting material that encourages conduct that constitutes a
            criminal offence results in civil liability or otherwise breaches
            any relevant laws, regulations, or code of practice.
          </li>
          <li>Gaining unauthorized access to other computer systems.</li>
          <li>
            Interfering with any other person’s use or enjoyment of the Site.
          </li>
          <li>Breaching any applicable laws.</li>
          <li>
            Interfering or disrupting networks or websites connected to the
            Site.
          </li>
          <li>
            Making, transmitting, or storing electronic copies of materials
            protected by copyright without the permission of the owner.
          </li>
        </ul>
        <h5 className="mt-4">Colors</h5>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          We have made every effort to display the colors of our products that
          appear on the Site as accurately as possible. However, as the actual
          colors you see will depend on your monitor, we cannot guarantee that
          your monitor’s display of any color will be accurate. Shipping
        </div>
        <div className="d-flex p-2 fw-bold mt-4">
          Shipping costs are based on a combination of the following:
        </div>
        <ul className="bullet-list ps-4">
          <li>Weight and dimensions of package.</li>
          <li>Method of shipment such as Ground, Air, Ship, Rail etc.</li>
          <li>The location you are shipping from (city, state, country)</li>
          <li>
            The location you are shipping to (also called the destination
            country)
          </li>
        </ul>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          Costs can be considerably higher for international destinations.
          Generally, buyers pay additional costs such as duties, taxes, and
          customs clearance fees. For example, international rates may or may
          not include pickup and door-to-door delivery with customs clearance.
          An “extended area surcharge” may apply to buyers depending on their
          international locations.
        </div>
        <h5 className="mt-4">Cash on Delivery</h5>
        <div className="d-flex p-2 fw-bold mt-4">Terms and conditions</div>
        <h5 className="mt-4">General Terms:</h5>
        <ul className="bullet-list ps-4">
          <li>
            Cash on Delivery (COD) is applicable as a payment method for
            products sold by GOLD BAZAR and some selected sellers.
          </li>
          <li>
            In addition to any shipping charges, customers shall be required to
            pay a non-refundable convenience charge of AED 10 for the
            cash-on-delivery payment method.
          </li>
          <li>
            There is a maximum limit of AED 5000 when ordering with the COD
            payment method.
          </li>
          <li>
            After choosing Cash on Delivery as your delivery method, the
            customer will receive an SMS/IVR call to confirm the delivery. The
            order will be on hold for the next 6 hours until the customer
            confirms the order. Thereafter the system will automatically cancel
            the non-confirmed orders and send the communication to the customer.
          </li>
          <li>
            Our designated courier partner shall contact the customer and give a
            scheduled range of time on the delivery day they will be able to
            deliver the order and collect the payment.
          </li>
          <li>
            If the order is undeliverable (where the courier partner has made
            reasonable attempts to deliver, but it is either refused or no
            delivery can be made), the courier will cancel the order & return
            the order to GOLD BAZAR. Customer is only allowed to reschedule once of
            up to a maximum of two (2) business days only.
          </li>
          <li>
            The Customer shall pay the exact order amount when it is delivered.
            The courier will not accept any other mode of payment like
            (non-cash) except cash during the delivery of the product.
          </li>
          <li>
            All eligible refunds will be processed through the online GOLD BAZAR
            gift card to the customer account. The gift card can be used for any
            online purchases.
          </li>
          <li>
            The Customer should check the product condition for any tampering
            before accepting the order. However, customers are not allowed to
            open the order until payment has been handed over to the courier
            partner.
          </li>
          <li>
            After payment has been handed over to the courier and the order has
            been handed over to the customer, the delivery process is completed
            and successful. If you find any issue with your order please contact
            us at 600-502034, email us at support@goldbazar.com or visit the
            nearest GOLD BAZAR store for assistance.
          </li>
        </ul>
        <h5 className="mt-4">Return & Exchange</h5>
        <ul className="bullet-list ps-4">
          <li>
            All returns are in accordance with the GOLD BAZAR Return & Exchange
            Policy Version 2.0.
          </li>
          <li>
            All orders purchased from Online shall be applicable for returns
            only through courier pickup and shall not be accepted at the store.
          </li>
          <li>
            For Exchange or Return, the customer can call GOLD BAZAR Helpline
            Number (600 502034), email us at support@goldbazar.com, or visit the
            GOLD BAZAR store for assistance.
          </li>
          <li>
            Any returned product must be in the same condition as received and
            with the original box and/or packaging intact.
          </li>
          <li>
            It takes 7 to 14 business days for the Credit/Debit card refund.
          </li>
          <li>
            For delivered products, wherever the return condition is met as per
            GOLD BAZAR return policy and post-inspection, GOLD BAZAR will refund the
            product amount (excluding the amount paid for the shipping fees) in
            the mode of an online GOLD BAZAR gift card within 24 hours.
          </li>
          <li>
            In case the product received by the customer is damaged, defective,
            or not as per the product specification, GOLD BAZAR will inspect the
            returned product & only if the product qualifies the return as per
            the return & exchange policy. GOLD BAZAR will refund the product amount
            along with any shipping fees incurred in the mode of GOLD BAZAR’s
            online gift card within 24 hours.
          </li>
          <li>
            For all canceled orders and products that are shipped but not
            delivered, the customer will receive a full refund as GOLD BAZAR online
            gift card within 24 hours.
          </li>
          <li>
            GOLD BAZAR reserves the right to collect a convenience fee for all
            return pickups and disable cash on delivery option for accounts that
            have a high percentage of returns and shipments not accepted, of the
            number of orders placed through such accounts.
          </li>
        </ul>
        <h6 className="mt-2">Check warranty status</h6>

        <div className="d-flex" style={{ textAlign: "justify" }}>
          To check the status of the warranty of products you purchased from
          GOLD BAZAR, visit https://goldbazar.com/warranty/
        </div>
        <div className="d-flex p-2 fw-bold mt-2">Store-pick up</div>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          Orders are available for Store Pickup at the below GOLD BAZAR Store
          Locations at no additional Shipping Charge:
        </div>
        <ul className="bullet-list ps-4">
          <li>Times Square Center</li>
          <li>Deira City Center</li>
          <li>Ibn Battuta China Gate</li>
          <li>Dubai Mall</li>
          <li>Mega Mall Sharjah</li>
          <li>Abu Dhabi Mall</li>
          <li>Al Ain</li>
        </ul>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          Products that are not available for Store Pickup are:
        </div>
        <ul className="bullet-list ps-4">
          <li>Refrigerators</li>
          <li>Televisions of screen size 40” and above</li>
          <li>Washing Machines</li>
          <li>Air Conditioners</li>
          <li>Dishwashers</li>
          <li>Cooking Range</li>
          <li>Other Large Appliances delivered directly by our Supplier</li>
          <li>Marketplace items</li>
          <li>
            Online Exclusive items –{" "}
            <span className="text-danger">
              Products mentioned as Online Exclusive will be home delivered only
            </span>
          </li>
        </ul>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          Your order will be reserved for 7 days after which the order will be
          cancelled and refunded to the original payment method.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">
          To pickup your order, please bring the following documents to the
          store:
        </div>
        <ul className="bullet-list ps-4">
          <li>Order ID</li>
          <li>
            Original Emirates ID or Passport with Visa matching the name
            mentioned on the order.
          </li>
          <li>Credit Card used to place order.</li>
        </ul>
        <div className="d-flex p-2 fw-bold mt-2">NOTE:</div>
        <ul className="bullet-list ps-4">
          <li>The order will not be handed over without these documents.</li>
          <li>
            You will be informed on your registered email ID once your order is
            available at the store pickup location of your choice.
          </li>
          <li>
            This shipping information is provided to you for general information
            purposes and may not be applicable or accurate for shipments
            processed with some carriers or for goods shipped across certain
            international borders. For international shipments, please also
            check with countries whose borders your shipment may cross for any
            additional rules, regulations, duties, or taxes that apply.
          </li>
        </ul>
        <div className="d-flex p-2 fw-bold mt-2">Insurance</div>
        <div className="d-flex" style={{ textAlign: "justify" }}>
          You should always insure international shipments if the carrier does
          not provide automatic coverage. Check with the carrier for insurance
          regulations for each country, they may vary.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">
          {" "}
          Modification of Terms & Conditions of Service
        </div>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          goldbazar.com may at any time modify the Terms & Conditions of Use of the
          site without any prior notification to you. You can access the latest
          version of the User Agreement at any given time on goldbazar.com. You
          should regularly review the Terms & Conditions on goldbazar.com. In the
          event the modified Terms & Conditions is not acceptable to you, you
          should discontinue using the service. However, if you continue to use
          the service you shall be deemed to have agreed to accept and abide by
          the modified Terms & Conditions of Use of this site.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">
          Governing Law and Jurisdiction
        </div>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          This User Agreement shall be construed in accordance with the
          applicable laws of UAE. The Courts at Dubai shall have exclusive
          jurisdiction in any proceedings arising out of this agreement. Any
          dispute or difference either in interpretation or otherwise, of any
          terms of this User Agreement between the parties hereto, the same
          shall be referred to an independent arbitrator who will be appointed
          by Gold Bazar LLC. and his decision shall be final and binding on the
          parties hereto. The arbitration shall be held in Dubai. The laws of
          UAE shall be applicable in such aspects. Reviews, Feedback,
          Submissions All reviews, comments, feedback, postcards, suggestions,
          ideas, and other submissions disclosed, submitted or offered to
          goldbazar.com on or by this Site or otherwise disclosed, submitted or
          offered in connection with your use of this Site (collectively, the
          “Comments”) shall be and remain goldbazar.com property. Such disclosure,
          submission or offer of any Comments shall constitute an assignment to
          goldbazar.com of all worldwide rights, titles and interests in all
          copyrights and other intellectual properties in the Comments. Thus,
          goldbazar.com owns exclusively all such rights, titles and interests and
          shall not be limited in any way in its use, commercial or otherwise,
          of any Comments. goldbazar.com will be entitled to use, reproduce,
          disclose, modify, adapt, create derivative works from, publish,
          display and distribute any Comments you submit for any purpose
          whatsoever, without restriction and without compensating you in any
          way. goldbazar.com is and shall be under no obligation (1) to maintain
          any Comments in confidence; (2) to pay you any compensation for any
          Comments; or (3) to respond to any Comments. You agree that any
          Comments submitted by you to the Site will not violate this policy or
          any right of any third party, including copyright, trademark, privacy
          or other personal or proprietary right(s), and will not cause injury
          to any person or entity. You further agree that no Comments submitted
          by you to the Site will be or contain libelous or otherwise unlawful,
          threatening, abusive or obscene material, or contain software viruses,
          political campaigning, commercial solicitation, chain letters, mass
          mailings or any form of “spam”. goldbazar.com does not regularly review
          posted Comments, but does reserve the right (but not the obligation)
          to monitor and edit or remove any Comments submitted to the Site. You
          grant goldbazar.com the right to use the name that you submit in
          connection with any Comments. You agree not to use a false email
          address, impersonate any person or entity, or otherwise mislead as to
          the origin of any Comments you submit. You are and shall remain solely
          responsible for the content of any Comments you make and you agree to
          indemnify goldbazar.com and its affiliates for all claims resulting from
          any Comments you submit. goldbazar.com and its affiliates take no
          responsibility and assume no liability for any Comments submitted by
          you or any third party.
        </div>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          GOLD BAZAR’s customer touchpoints including website, mobile app, social
          media, are for customers to interact with GOLD BAZAR to enquire about
          products, promotions, availability and to resolve any related issues
          in accordance with the prevailing UAE laws governing such
          interactions. GOLD BAZAR reserves the right to take appropriate action
          including legal recourse incase customers act against any such
          prevailing laws at any of the GOLD BAZAR customer touchpoints.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          For the benefit of customers the Cyber Crimes Law (Federal Law No. 5
          of 2012) is mentioned{" "}
          <strong>
            <a href="http://ejustice.gov.ae/downloads/latest_laws/cybercrimes_5_2012_en.pdf">
              here
            </a>
          </strong>
          .
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          Ref 1 :&nbsp;
          <a
            href="http://www.tamimi.com/en/magazine/law-update/section-5/january-2/new-law-combating-information-technology-crimes.html"
            rel="”nofollow”"
          >
            NEW LAW COMBATING INFORMATION TECHNOLOGY CRIMES
          </a>
          <br />
          Ref 2 :&nbsp;
          <a
            href="https://www.khaleejtimes.com/legalview/legal-risks-for-social-media-users-in-uae"
            rel="”nofollow”"
          >
            6 legal risks social media users in UAE should know
          </a>
        </div>
        <div className="d-flex p-2 fw-bold mt-2">Copyright & Trademark</div>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          goldbazar.com and its suppliers and licensors expressly reserve all
          intellectual property rights in all text, programs, products,
          processes, technology, content and other materials, which appear on
          this Site. Access to this Site does not confer and shall not be
          considered as conferring upon anyone any license under any of
          goldbazar.com or any third party’s intellectual property rights. All
          rights, including copyright, in this website are owned by or licensed
          to goldbazar.com. Any use of this website or its contents, including
          copying or storing it or them in whole or part, other than for your
          own personal, non-commercial use is prohibited without the permission
          of goldbazar.com. You may not modify, distribute or re-post anything on
          this website for any purpose. The goldbazar.com names and logos and all
          related product and service names, design marks and slogans are the
          trademarks or service marks of Gold Bazar LLC. All other marks are the
          property of their respective companies. No trademark or service mark
          license is granted in connection with the materials contained on this
          Site. Access to this Site does not authorize anyone to use any name,
          logo or mark in any manner. References on this Site to any names,
          marks, products or services of third parties or hypertext links to
          third party sites or information are provided solely as a convenience
          to you and do not in any way constitute or imply goldbazar.com
          endorsement, sponsorship or recommendation of the third party,
          information, product or service. goldbazar.com is not responsible for the
          content of any third party sites and does not make any representations
          regarding the content or accuracy of material on such sites. If you
          decide to link to any such third party websites, you do so entirely at
          your own risk. All materials, including images, text, illustrations,
          designs, icons, photographs, programs, music clips or downloads, video
          clips and written and other materials that are part of this Site
          (collectively, the “Contents”) are intended solely for personal,
          non-commercial use. You may download or copy the Contents and other
          downloadable materials displayed on the Site for your personal use
          only. No right, title or interest in any downloaded materials or
          software is transferred to you as a result of any such downloading or
          copying. You may not reproduce (except as noted above), publish,
          transmit, distribute, display, modify, create derivative works from,
          sell or participate in any sale of or exploit in any way, in whole or
          in part, any of the Contents, the Site or any related software. All
          software used on this Site is the property of goldbazar.com or its
          suppliers and protected by international copyright laws. The Contents
          and software on this Site may be used only as a shopping resource. Any
          other use, including the reproduction, modification, distribution,
          transmission, republication, display, or performance, of the Contents
          on this Site is strictly prohibited. Unless otherwise noted, all
          Contents are copyrights, trademarks, trade dress and/or other
          intellectual property owned, controlled or licensed by goldbazar.com, one
          of its affiliates or by third parties who have licensed their
          materials to goldbazar.com and are protected by international copyright
          laws. The compilation (meaning the collection, arrangement, and
          assembly) of all Contents on this Site is the exclusive property of
          goldbazar.com and is also protected by international copyright laws.
          Objectionable Material You understand that by using this Site or any
          services provided on the Site, you may encounter Content that may be
          deemed by some to be offensive, indecent, or objectionable, which
          Content may or may not be identified as such. You agree to use the
          Site and any service at your sole risk and that to the fullest extent
          permitted under applicable law, goldbazar.com and its affiliates shall
          have no liability to you for Content that may be deemed offensive,
          indecent, or objectionable to you.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">Indemnity</div>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          You agree to defend, indemnify and hold harmless goldbazar.com, its
          employees, directors, officers, agents and their successors and
          assigns from and against any and all claims, liabilities, damages,
          losses, costs and expenses, including attorney’s fees, caused by or
          arising out of claims based upon your actions or inactions, which may
          result in any loss or liability to goldbazar.com or any third party
          including but not limited to breach of any warranties, representations
          or undertakings or in relation to the non-fulfillment of any of your
          obligations under this User Agreement or arising out of the your
          violation of any applicable laws, regulations including but not
          limited to Intellectual Property Rights, payment of statutory dues and
          taxes, claim of libel, defamation, violation of rights of privacy or
          publicity, loss of service by other subscribers and infringement of
          intellectual property or other rights. This clause shall survive the
          expiry or termination of this User Agreement.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">Termination</div>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          This User Agreement is effective unless and until terminated by either
          you or goldbazar.com. You may terminate this User Agreement at any time,
          provided that you discontinue any further use of this Site. goldbazar.com
          may terminate this User Agreement at any time and may do so
          immediately without notice, and accordingly deny you access to the
          Site, Such termination will be without any liability to goldbazar.com.
          Upon any termination of the User Agreement by either you or
          goldbazar.com, you must promptly destroy all materials downloaded or
          otherwise obtained from this Site, as well as all copies of such
          materials, whether made under the User Agreement or otherwise.
          goldbazar.com’s right to any Comments shall survive any termination of
          this User Agreement. Any such termination of the User Agreement shall
          not cancel your obligation to pay for the product already ordered from
          the Site or affect any liability that may have arisen under the User
          Agreement.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">Stock Status “On Demand”</div>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          Please note that items marked as “On Demand” will be ordered on your
          demand after payment. This will not guarantee the stock availability
          within our supplier and we will do our best to provide you the item as
          soon as possible.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">Communications</div>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          When you visit the Website or send emails to goldbazar.com, you are
          communicating with us electronically. You consent to receive
          communications from us electronically. We will communicate with you by
          email or by posting notices on the Website. You agree that all
          agreements, notices, disclosures and other communications that we
          provide to you electronically satisfy any legal requirement that such
          communications be in writing.
        </div>
        <div className="d-flex p-2" style={{ textAlign: "justify" }}>
          DISCLAIMER : Gold Bazar holds the rights to cancel any order in any of the
          below cases.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          <strong className="fw-bold;">Fraudulent Transactions : </strong> Gold Bazar holds the rights to cancel orders made with fraudulent email ID,
          payment method and all kinds of bulk purchases. For placing bulk
          orders, customers are requested to route through{" "}
          <a href="/bulk-order">Here.</a>
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          <strong className="fw-bold;">Wrong Image : </strong>Images are meant
          for illustrative purposes only. Customer buys a product where the
          image was wrongly advertised.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          <strong className="fw-bold;">Wrong Price : </strong>Prices are updated
          in bulk. If a wrong price is advertised on the website.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          <strong className="fw-bold;">Wrong Description : </strong>Mistakes may
          occur while capturing information from the internet. Certain products
          may have different features in different region. Customer buys a
          product which may not have a feature which is advertiesed.
        </div>
        <div className="d-flex p-2 fs-5" style={{ textAlign: "justify" }}>
          AED 50 Voucher on registrations (Discontinued)
        </div>
        <ul className="bullet-list ps-4">
          <li>This is an exclusive “online” coupon.</li>
          <li>It can only be used on GOLD BAZAR UAE website (uae.goldbazar.com).</li>
          <li>It can be used only once and is not transferable.</li>
          <li>Coupon expires within one week issue date.</li>
          <li>
            The coupon cannot be used in conjunction with other
            coupons/vouchers.
          </li>
          <li>A minimum spend of AED 1000 is required to use this voucher.</li>
        </ul>
        <div className="d-flex p-2 fw-bold mt-2">
          Product visuals shown are for illustrative purposes only. prices are
          subject to change.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">Entire Agreement</div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          If any part of this agreement is determined to be invalid or
          unenforceable pursuant to applicable law including, but not limited
          to, the warranty disclaimers and liability limitations set forth
          above, then the invalid or unenforceable provision will be deemed to
          be superseded by a valid, enforceable provision that most closely
          matches the intent of the original provision and the remainder of the
          agreement shall continue in effect. Unless otherwise specified herein,
          this agreement constitutes the entire agreement between you and
          goldbazar.com with respect to the goldbazar.com sites/services and it
          supersedes all prior or contemporaneous communications and proposals,
          whether electronic, oral or written, between you and goldbazar.com with
          respect to the goldbazar.com sites/services. goldbazar.com’s failure to act
          with respect to a breach by you or others does not waive its right to
          act with respect to subsequent or similar breaches.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">Privacy Policy</div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          We do not sell or rent your personal information to third parties for
          their marketing purposes without your explicit consent and we only use
          your information as described in the Privacy Policy. We view
          protection of your privacy as a very important community principle. We
          understand clearly that you and Your Information is one of our most
          important assets. We store and process Your Information on computers
          located in Dubai that are protected by physical as well as
          technological security devices. We use third parties to verify and
          certify our privacy principles. If you object to your Information
          being transferred or used in this way please do not use the Site.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">Transaction Currency:</div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          The standard transaction currency on our e-commerce portal is UAE
          Dhirams (AED). If the customer is using a credit card supplied by
          banks other than those in the UAE, the amount on the credit card bill
          may differ due to exchange rate fluctuations and any charges that the
          card issuer/bank may have debited.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          Country of Merchant Domicile: <br /> GOLD BAZAR is a Limited Liability
          Company registered in Dubai, UAE.
        </div>
        <div className="my-4 fs-5 text-center">
          THIRD PARTY PRODUCTS / RE-SELLERS – Products which are “Sold by”
          others on GOLD BAZAR Website.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          <strong className="fw-bold">PLEASE NOTE: </strong>Along with the other
          terms and conditions these additional terms are applicable in case you
          have bought any products not manufactured/traded by GOLD BAZAR.com. In
          other words these additional terms and conditions are applicable in
          case you buy products sold on GOLD BAZAR.com by third party vendors
          and/or re-sellers. You understand and agree that there may be certain
          products, which will be sold on the Site by third party vendors
          (‘Vendors and/or re-sellers’) GOLD BAZAR.com may not be able to control
          the transactions or the acts and omissions of the Vendors/re-sellers
          in such transactions. When you buy such products from
          Vendors/re-sellers on the Site the following additional terms and
          conditions will become applicable:
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          GOLD BAZAR.com is not responsible for any non-performance or breach of
          any contract entered into between you and the Vendor/re-seller. goldbazar.com cannot and does not guarantee that the Vendors/re-sellers will
          perform any transaction concluded on the Site.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          GOLD BAZAR.com does not make any representation or warranty as to the
          attributes (such as quality, worth, marketability etc.) of the items
          or services proposed to be sold on the Site by the Vendor/re-seller.
          In particular, GOLD BAZAR.com does not implicitly or explicitly support
          or endorse the sale of any items or services on the Site. GOLD BAZAR.com
          accepts no liability for any errors or omissions, whether on behalf of
          itself or third parties.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          You release and indemnify GOLD BAZAR.com and/or any of its officers and
          representatives from any cost, damage, liability or other consequence
          of any of the actions of the Vendors/re-sellers on the Site and
          specifically waive any claims that you may have in this behalf under
          any applicable law. Notwithstanding its reasonable efforts in that
          behalf, GOLD BAZAR.com cannot control the information provided by other
          Vendors/re-sellers, which is made available on the Site. You may find
          other Vendor’s/re-sellers information to be offensive, harmful,
          inaccurate, or deceptive. Please use caution, common sense, and
          practice safe trading when using the Site. Please note that there are
          also risks of dealing with foreign nationals, underage persons or
          people acting under false pretense.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          All other terms and conditions of this User Agreement are applicable
          to such transactions.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          Sellers at GOLD BAZAR have to adhere to the same high standards of
          service and authenticity of their advertised merchandise. Basically
          you receive what you have bought according to the advertised item.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          As always, our Customer Service Team is there to help with any issue
          or problem faced, and we aim to get any complaint or concern you may
          have resolved as quickly as possible, and to your satisfaction.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">RETURNS & CANCELLATIONS</div>
        <div className="d-flex p-2 fw-bold mt-2">
          IF THE ITEM ARRIVES DEAD/FAULTY
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          If your item is faulty or not in working condition due to a product
          defect or not functioning as it is supposed to – then you can still
          return it. You may walk-in to any GOLD BAZAR Store along with the invoice
          and hand over the product at the Customer service desk. We will then
          handover the product to the seller. The seller will check the
          complaint and see if it is genuine. Upon their confirmation we will
          process the refund of the money back to your credit card.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">
          WITHIN 7 DAYS OF RECEIVING THE ITEM(S):
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          If you wish to return the item after receiving it, you have up to
          Seven (7) days to do so, so long as the item is in the same condition
          as received and with the original packaging intact.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          We understand that sometimes you might change your mind on a bought
          item, if after making the purchase online and you still have not
          received the item, you could still cancel your order. If you have paid
          through electronic means (Credit or Debit card, other payment cards)
          then the money would be refunded, but due to individual card
          providers, the amount may take time to reflect in your card statement.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          In all circumstances you can contact the Customer Service Team through
          the Contact Us page for a return of an item or refunds.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          The item will be checked for the packing conditions and if it is still
          in sellable condition, the money will be refunded back to you.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">
          AFTER 7 DAYS FROM RECEIVING THE ITEM(S):
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          If there is nothing wrong with the item and you just want to return
          it, please note that some individual sellers do not accept a product
          back after the three (7) days have passed although we can contact the
          seller on your behalf to try and arrange such a return however that is
          dependent on their acceptance and policies.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">REFUND</div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          If a delivery is attempted, shipping fees will be deducted from the
          amount, but you will receive a refund for the balance. This fee will
          be waived if the item was not as advertised, defective or not
          functioning as advertised. So basically if it is a return because you
          have simply changed your mind then the shipping fees will be retained
          by GOLD BAZAR and we just refund you amount paid for the item(s).
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          You will be refunded the shipping fees for returned items not in
          proper working condition or faulty and/or defective.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">
          GUARANTEE AND/OR WARRANTY IS OFFERED ON ITEMS SOLD by other sellers
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          There are different types of sellers on GOLD BAZAR and hence different
          Warranty offers. Based on the product type, warranty may be limited to
          no warranty, limited warranty or default (1) year warranty. GOLD BAZAR is
          not responsible for those items however as a buyer you have several
          recourses for any complaints in regards to individual sellers.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">
          I THINK THE ITEM I BOUGHT MIGHT NOT BE A GENUINE ITEM , WHAT CAN I DO?
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          GOLD BAZAR does not tolerate any fake items to be displayed by any of its
          sellers and strict action will be taken against any seller should this
          happen. Our Customer Service Teams will investigate thoroughly any
          such complaint and the selling of fake or banned items could lead to a
          seller’s blacklisting and closure of his/her store.
        </div>
        <div className="d-flex p-2 fw-bold mt-2">
          CAN I RETURN IT AND GET A REFUND?
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          If within the seven (7) days – “No Questions Asked return period” –
          and you item deemed fake, then absolutely yes, so long it is in its
          original condition and with the original packaging intact, and you can
          do so via the Customer Service Desk at any GOLD BAZAR Store. After 7
          days, it depends on the seller’s approval.
        </div>
        <div className="d-flex p-2 fw-bold mt-2 mb-4">DISCLAIMER</div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          GOLD BAZAR holds the rights to cancel any order in any of the below cases{" "}
          <br />
          <strong className="fw-bold;">Fraudulent Transactions : </strong> Gold Bazar holds the rights to cancel orders made with fraudulent email ID,
          payment method and all kinds of bulk purchases. For placing bulk
          orders, customers are requested to route through{" "}
          <a href="/bulk-order">Here.</a>
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          <strong className="fw-bold;">Wrong Image : </strong>Images are meant
          for illustrative purposes only. Customer buys a product where the
          image was wrongly advertised.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          <strong className="fw-bold;">Wrong Price : </strong>Prices are updated
          in bulk. If a wrong price is advertised on the website.
        </div>
        <div className="p-2" style={{ textAlign: "justify" }}>
          <strong className="fw-bold;">Wrong Description : </strong> Mistakes
          may occur while capturing information from the internet. Certain
          products may have different features in different region. Customer
          buys a product which may not have a feature which is advertiesed.{" "}
          <br /> If the order is dispatched and delivered, GOLD BAZAR will collect
          the item back from the customer <br /> and will do a full refund. If
          the unit is opened based on the condition of the package, a resale
          cost of 25% may be deducted from the selling price.
        </div>
        <div className="mt-5 pb-2 fs-4 border-bottom border-secondary">
          DG Help Repairs & Recovery
        </div>
        {/* <div>
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        </div> */}
        <ul className="bullet-list ps-4 mt-3">
          <li>
            All equipment/s are received, kept, repaired, and operated at
            Owner’s consent.
          </li>
          <li>Warranty covers only Manufacturer’s defect.</li>
          <li>
            Warranty does not cover Misuse / Liquid damage / Physical damage /
            Tampered / Virus Infection etc.
          </li>
          <li>Quotation Rejection charges will be applicable.</li>
          <li>Out of warranty deliveries will be against payment.</li>
          <li>
            Units should be collected within 60 days after notification or Gold Bazar reserves the right to dispose of any unclaimed units.
          </li>
          <li>
            Service, Delivery, installation charges, Quote rejection charges are
            NON-REFUNDABLE once paid by the customer.
          </li>
          <li>Software once sold will not be exchanged or refunded.</li>
          <li>
            Once diagnosed or repaired on a unit, changes cannot be returned to
            the original/initial state.
          </li>
          <li>
            The receipt should be produced at the time of item collection.
          </li>
        </ul>
        <div className="mt-2 fs-5">Disclaimer:</div>
        <ul className="bullet-list ps-4">
          <li>
            Customer authorizes GOLD BAZAR technician/Engineer(S) to work on their
            device.
          </li>
          <li>
            Customer understands that GOLD BAZAR is not responsible for any data
            loss, which occurs as a result of work done on their device.
          </li>
          <li>
            Furthermore, the customer agrees to release, indemnify, and hold
            harmless, GOLD BAZAR from liability for any claims or damages of any
            kind or description that may arise from any system work performed on
            any abandonment of said items.
          </li>
        </ul>
      </div>
      <div className="mt-5">
        <SubscribeNewsletter />
      </div>
    </div>
  );
}
export default TermsandConditions;
