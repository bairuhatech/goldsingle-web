import React, { useEffect, useState } from "react";
import { Row, Container, Col } from "react-bootstrap";
import { Collapse } from "antd";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const { Panel } = Collapse;

function Faq() {
  const [activeKey, setActiveKey] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleTerms = (key: string | string[]) => {
    if (Array.isArray(key)) {
      setActiveKey(key);
    } else {
      setActiveKey(activeKey.includes(key) ? [] : [key]);
    }
  };

  const faqData = [
    {
      question:
        "Can I check the warranty details of my products online via the Warranty Application?",
      answer: [
        <>
          <li key={0}>
            <p>
              Yes, you can log on to{" "}
              <a
                href="https://warranty.goldbazar.com/"
                target="_self"
                rel="noopener noreferrer"
              >
                {" "}
                https://warranty.goldbazar.com/{" "}
              </a>{" "}
              and check the warranty of the products that you purchased from
              www.goldbazar.com except marketplace products.
            </p>
          </li>
          <li key={1}>
            <p>
              You can only view the warranty of the products sold by GOLD BAZAR; in
              case the purchased product is sold by a Marketplace seller, the
              warranty will not show in this application.
            </p>
          </li>
        </>,
      ],
    },
    {
      question:
        "Can I check the warranty details of products I bought from GOLD BAZAR Retail stores?",
      answer: [
        <p key={0}>
          Yes, you can log on to{" "}
          <a
            href="https://warranty.goldbazar.com"
            target="_self"
            rel="noopener noreferrer"
          >
            https://warranty.goldbazar.com
          </a>{" "}
          and check the warranty details of products you bought from GOLD BAZAR
          Retail stores as well.
        </p>,
      ],
    },
    {
      question:
        "Which mobile number do I need to put for checking the warranty of my products?",
      answer: [
        "The mobile number given at the time of purchasing the products is required to be entered to check the warranty of the products you purchased.",
      ],
    },
    {
      question:
        "I do not have the invoice details with me right now, can I still check the details of the products I purchased?",
      answer: [
        "Yes, if the products were purchased using your mobile number, you do not need invoice details to see purchased products.",
        "If the mobile number was not captured or incorrectly captured on the invoice, then the warranty details of the products will not show on the application.",
      ],
    },
    {
      question:
        "What information can I check from this Warranty Application portal?",
      answer: [
        "You can see all the purchased products on the Warranty Application portal, you can also find out how many days of warranty are remaining. Not just that, you could also find out if you bought an additional warranty as well along with your products.",
      ],
    },
    {
      question:
        "What do I need to do if the warranty of the product is incorrect on the warranty application?",
      answer: [
        <>
          <li key={0}>
            <p>
              You don't need to worry if the warranty for the products you
              purchased is incorrect or not shown on the warranty application.
              For any warranty-related issues for carry-in products e.g.
              (Laptop, tablets, Telecom, Small Domestic appliances, etc.) you
              can always contact the GOLD BAZAR store Customer Care and for Major
              Domestic Appliances or big screen TVs, you can call the GOLD BAZAR
              support center at 600502034.
            </p>
          </li>
          <li key={1}>
            <p>
              You can always refer to the{" "}
              <a href="/return-policy">
                Return, Exchange and Warranty – GOLD BAZAR UAE
              </a>{" "}
              policy for the warranty terms even if the product is not reflected
              on the application.
            </p>
          </li>
        </>,
      ],
    },

    {
      question:
        "Do I need to contact the store customer care or GOLD BAZAR contact center incase the warranty of the purchased product is incorrect or not reflected? ",
      answer: [
        "You don’t need to contact the store customer care or contact center incase the product you purchased is not reflected or is incorrect on the application. The warranty details will be automatically updated with the application update. Incase it still doesn’t reflect then you can call our call center at 600502034. ",
      ],
    },
    {
      question:
        "Can I log a warranty claim request for any of my products via this application?",
      answer: [
        "Yes, for the products like Home Appliances or big-screen TVs you can log an onsite support ticket explaining the issue. For smaller-sized products like Mobiles, tablets, laptops, etc. while you can book a ticket for support however you need to bring the device to the customer care center or service center located in the GOLD BAZAR stores.",
      ],
    },
    {
      question:
        "Can I see the status of the warranty ticket that I raised via the Warranty Application?",
      answer: [
        "Yes, you can log in to the portal with your registered mobile number and check the status of the warranty ticket against the product. Additionally, you could also check the Repair History of the product and the number of times the product has been repaired in the past.",
      ],
    },
    {
      question:
        "Can I purchase an additional warranty for any of my products via the Warranty Application?",
      answer: [
        "Not at the moment but this feature will be added soon. But by checking the dates of your warranty, You can contact the store or our call center in order to purchase an additional warranty on your products. ",
      ],
    },
    {
      question:
        "I am unable to log in using the mobile number, it says user not found, what shall I do?",
      answer: [
        "It is possible that the mobile number you are entering was not used at the time of purchasing the product. Please contact our customer care team with the invoice details for them to help you with the product warranty. ",
      ],
    },
    {
      question: "Is the Warranty Application available in other languages?",
      answer: [
        "Yes, the Warranty Application is available in English as well as Arabic.",
      ],
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="Screen-box">
      <Row className="mx-2 my-4 ftscreen-fnt ">
        <div className="d-flex align-items-center pb-3 ml-3">
          <IoArrowBackSharp
            size={25}
            color="dark"
            onClick={() => navigate(-1)}
            cursor="pointer"
          />
          <h4 className="ps-3 pt-2">Frequently asked Questions</h4>
        </div>

        <Col md={12}>
          <Collapse
            accordion
            activeKey={activeKey}
            onChange={(key) => toggleTerms(key)}
          >
            {faqData.map((faq, index) => (
              <Panel
                key={index.toString()}
                showArrow={true}
                header={
                  <p
                    className={`fs-6 ${
                      activeKey[0] === index.toString() ? "fw-bold" : ""
                    }`}
                    onClick={() => toggleTerms(index.toString())}
                  >
                    {faq.question}
                  </p>
                }
              >
                <ul>
                  {faq.answer.map((item, i) => (
                    <li key={i}>
                      {Array.isArray(item)
                        ? item.map((subItem, subIndex) => (
                            <React.Fragment key={subIndex}>
                              {subItem}
                            </React.Fragment>
                          ))
                        : item}
                    </li>
                  ))}
                </ul>
              </Panel>
            ))}
          </Collapse>
        </Col>
      </Row>
    </div>
  );
}

export default Faq;
