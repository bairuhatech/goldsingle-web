import SaleMessage from "../../components/saleMessage";
import SubscribeNewsletter from "../../components/subscribeNewsletter";
import easypaymentimg from "../../assets/images/EasyPaymentPlan-1600x320-En.webp";
import bankfabimg from "../../assets/images/bankfab.com.png";
import abudabicommercialimg from "../../assets/images/Abu Dhabi Commercial Bank.png";
import dubaiislamicimg from "../../assets/images/dlf.pt-islam-png-5583678.png";
import commercialbankimg from "../../assets/images/pngfind.com-may-png-2277529.png";
import abudhabiislamicimg from "../../assets/images/pngkey.com-booking-com-logo-png-2805484 (1).png";
import ajmanbankimg from "../../assets/images/208396.svg";
import CBIimg from "../../assets/images/Daco_2121546.png";
import Cityimg from "../../assets/images/citibank-png-logo-brands-4776.png";
import dubaifestimg from "../../assets/images/dubaiimage.png";
import EmiratesIslamicimg from "../../assets/images/emiratesimage.png";
import emiresnboimg from "../../assets/images/emiratesnbd.jpg";
import financehouseimg from "../../assets/images/financeimage.png";
import nbfimg from "../../assets/images/nbfimagejpeg.jpeg";
import rakbakimage from "../../assets/images/rakbankimage.jpg";
import standardchrtrimg from "../../assets/images/Standard_Chartered.png";
import hbfcimg from "../../assets/images/hsbcimage.jpg";
import mashreqimg from "../../assets/images/mashrekimage.png";
import najmimg from "../../assets/images/najmimage.jpg";
import { Col, Row } from "react-bootstrap";
import "./styles.scss";
import React from "react";

function EasyPaymentPlan() {
  const data = [
    {
      bankName: "Abu Dhabi Commercial Bank",
      duration: "3 months",
      minPurchase: "Min. Purchase AED 500",
      note: "*Not valid on ADCB Islamic Cards. Processing fee applies",
      imageUrl: abudabicommercialimg,
    },
    {
      bankName: "Abu Dhabi Islamic Bank",
      duration: "3/6 months",
      minPurchase: "Min. Purchase AED 1000",
      imageUrl: abudhabiislamicimg,
    },
    {
      bankName: "FAB",
      duration: "3/6 months",
      minPurchase: "Min. Purchase AED 1000",
      note: "*Charges and terms & conditions apply",
      imageUrl: bankfabimg,
    },
    {
      bankName: "Ajman Bank",
      duration: "3/6 months",
      minPurchase: "Min. Purchase AED 1000",
      imageUrl: ajmanbankimg,
    },
    {
      bankName: "Commercial Bank International",
      duration: "3/6/12 months",
      minPurchase: "Min. Purchase AED 500",
      note: "*Processing fee of 1% on 12 months.",
      imageUrl: CBIimg,
    },
    {
      bankName: "Citibank",
      duration: "3 months",
      minPurchase: "Min. Purchase AED 1000",
      note: "To apply, submit the request at",
      Linktxt: " www.citibank.ae/zeropercent",
      note2: "( In store only )",
      imageUrl: Cityimg,
    },
    {
      bankName: "Commercial Bank of Dubai",
      duration: "3/6/12 months",
      minPurchase: "Min. Purchase AED 500",
      imageUrl: commercialbankimg,
      note3: "Processing fee 1.5% on 3 Months",
      note4: "Processing fee 2.5% on 6 Months",
      note5: "Processing fee 3% on 12 Months",
    },
    {
      bankName: "Dubai First",
      duration: "3/6/9/12 months",
      minPurchase: "Min. Purchase AED 1000",
      note: "*Processing fee of 1% on 3 & 6 months",
      note6: "*Processing fee of 2% on 9 & 12 months",

      imageUrl: dubaifestimg,
    },
    {
      bankName: "Dubai Islamic bank",
      duration: "6 months",
      minPurchase: "Min. Purchase AED 1000",
      note: "*SMS “EPP” to 4224 or contact 046092222 for assistance",
      imageUrl: dubaiislamicimg,
    },
    {
      bankName: "Emirates Islamic",
      duration: "3/6 months",
      minPurchase: "Min. Purchase AED 1000",
      note6: "*Processing fee of 2%",
      imageUrl: EmiratesIslamicimg,
    },
    {
      bankName: "Emirates NBD",
      duration: "6/12 months",
      minPurchase: "Min. Purchase AED 500",
      Linktxt: "Visit bank’s website",
      note6: "* AED 49 processing fee applies",
      imageUrl: emiresnboimg,
    },
    {
      bankName: "Finance House",
      duration: "6 months",
      minPurchase: "Min. Purchase AED 1000",
      imageUrl: financehouseimg,
    },

    {
      bankName: "HSB",
      duration: "6 months",
      minPurchase: "Min. Purchase AED 1000      ",
      note6: "*0 Processing fee. 0 Early Settlement Fees  ",
      imageUrl: hbfcimg,
    },
    {
      bankName: "Mashreq",
      duration: "6/9/12 months      ",
      minPurchase: "Min. Purchase AED 500      ",
      note6:
        "*Processing fee of AED 29 on 6, 9 & 12 months to be converted at point of sales during purchase 6/9/12 months",
      imageUrl: mashreqimg,
    },
    {
      bankName: "Najm",
      duration: "3/6 months      ",
      minPurchase: "Min. Purchase AED 1000      ",
      imageUrl: najmimg,
    },
    {
      bankName: "National Bank of Fujairah",
      duration: "3 months",
      minPurchase: "Min. Purchase AED 500",
      imageUrl: nbfimg,
    },
    {
      bankName: "Rakbank",
      duration: "3/6/9/12 months",
      minPurchase: "Min. Purchase AED 1000",
      imageUrl: rakbakimage,
      note6: "Processing fees of AED 49 on 3/6 months",
    },
    {
      bankName: "Standard Chartered",
      duration: "6 months",
      minPurchase: "Min. Purchase AED 1000",
      imageUrl: standardchrtrimg,
    },
  ];

  return (
    <div className="Screen-box">
      <div>
        <SaleMessage />
      </div>
      <div className="easyPaymentPlan-Box1">
        <img className="easyPaymentPlanimg-1" src={easypaymentimg} />
      </div>
      <div className="easyPaymentPlan-Box2">
        <div className="easyPaymentPlan-Box3">
          <p className="easyPaymentPlan-Txt1">Disclaimer</p>
          <p className="easyPaymentPlan-Txt2">
            Easy Payment Plans are subject to terms are conditions of the
            respective card issuing bank. Please contact your card issuing bank
            to get clarity on any additional fees they may charge you (including
            but not limited to processing fees, foreclosure fees, non-payment
            fees etc.) before you place your order with us.
          </p>
        </div>
      </div>
      <div className="easyPaymentPlan-Box4">
        <Row>
          {data.map((item, index) => (
            <Col key={index} md={4}>
              <div className="easyPaymentPlan-Box5">
                <div className="easyPaymentPlan-Box666">
                  <img className="easyPaymentPlan-img2" src={item.imageUrl} />
                </div>
                <div className="easyPaymentPlan-Box6">
                  <div className="easyPaymentPlan-Txt3">{item.bankName}</div>
                  <div className="easyPaymentPlan-Txt4">{item.duration}</div>
                  <div className="easyPaymentPlan-Txt4">{item.minPurchase}</div>
                  <div className="easyPaymentPlan-Txt5">{item.note}</div>
                  <div className="easyPaymentPlan-Txt5">
                    <a href="">{item.Linktxt}</a>
                  </div>
                  <div className="easyPaymentPlan-Txt6">{item.note2}</div>
                  <div className="easyPaymentPlan-Txt5">{item.note3}</div>
                  <div className="easyPaymentPlan-Txt5">{item.note4}</div>
                  <div className="easyPaymentPlan-Txt5">{item.note5}</div>
                  <div className="easyPaymentPlan-Txt5">{item.note6}</div>
                </div>
              </div>
              <br />
            </Col>
          ))}
        </Row>
      </div>

      <SubscribeNewsletter />
    </div>
  );
}
export default EasyPaymentPlan;
