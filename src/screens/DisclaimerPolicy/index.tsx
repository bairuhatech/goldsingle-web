import { Container, Row } from "react-bootstrap";
import SaleMessage from "../../components/saleMessage";
import SubscribeNewsletter from "../../components/subscribeNewsletter";
import PageHeader from "../../components/pageHeader";
import { useEffect } from "react";
import React from "react";

function DisclaimerPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Screen-box">
      <div>
        <SaleMessage />
      </div>
      <div className="ftscreen-fnt mx-2">
        <PageHeader text="Disclaimer Policy"></PageHeader>
        <h4 className="mt-4">Disclaimer Policy</h4>
        <div className="fs-5">LIMITATION OF LIABILITY AND DISCLAIMERS</div>
        <div className="pb-2" style={{ textAlign: "justify" }}>
          The Site is provided without any warranties or guarantees and in an
          “As Is” condition. You must bear the risks associated with the use of
          the Site. The Site provides content from other Internet sites or
          resources and while NextME.com tries to ensure that material included
          on the Site is correct, reputable and of high quality, it cannot
          accept responsibility if this is not the case. NextME.com will not be
          responsible for any errors or omissions or for the results obtained
          from the use of such information or for any technical problems you may
          experience with the Site.
        </div>
        <div className="py-2" style={{ textAlign: "justify" }}>
          This disclaimer does not apply to any product warranty offered by the
          manufacturer of the product as specified in the product
          specifications. This disclaimer constitutes an essential part of this
          User Agreement.
        </div>
        <div className="py-2" style={{ textAlign: "justify" }}>
          The site does not allow use of more than one voucher in a single
          transaction in the form of coupon code unless and until communicated
          to the end user.
        </div>
        <div className="py-2" style={{ textAlign: "justify" }}>
          To the fullest extent permitted under applicable law, NextME.com or
          its suppliers will not be liable for any indirect, incidental,
          special, incidental, consequential or exemplary damages, including but
          not limited to, damages for loss of profits, goodwill, use, data or
          other intangible losses arising out of or in connection with the Site,
          its services or thisUser Agreement.
        </div>
        <div className="fs-5">USER AGREEMENT</div>
        <div className="py-2" style={{ textAlign: "justify" }}>
          Without prejudice to the generality of the section above, the total
          liability of NextME.com to you for all liabilities arising out of this
          User Agreement be it in tort or contract is limited to the value of
          the product ordered by you. NextME.com, its associates and technology
          partners make no representations or warranties about the accuracy,
          reliability, completeness, correctness and/or timeliness of any
          content, information, software, text, graphics, links or
          communications provided on or through the use of the Site or that the
          operation of the Site will be error free and/or uninterrupted.
          Consequently, NextME.com assumes no liability whatsoever for any
          monetary or other damage suffered by you on account of the delay,
          failure, interruption, or corruption of any data or other information
          transmitted in connection with use of the Site; and/or any
          interruption or errors in the operation of the Site
        </div>
        <div className="fs-5">SITE SECURITY</div>
        <div className="py-2" style={{ textAlign: "justify" }}>
          You are prohibited from violating or attempting to violate the
          security of the Site, including, without limitation. Accessing data
          not intended for you or logging onto a server or an account which you
          are not authorized to access. <br />
          Attempting to probe, scan or test the vulnerability of a system or
          network or to breach security or authentication measures without
          proper authorization.
        </div>
        <div className="py-2" style={{ textAlign: "justify" }}>
          Attempting to interfere with service to any other user, host or
          network, including, without limitation, via means of submitting a
          virus to the Site, overloading, “flooding,” “spamming,” “mail bombing”
          or “crashing;”.Sending unsolicited email, including promotions and/or
          advertising of products or services. Forging any TCP/IP packet header
          or any part of the header information in any email or newsgroup
          posting Violations of system or network security may result in civil
          or criminal liability. NextME.com will investigate occurrences that
          may involve such violations and may involve, and cooperate with, law
          enforcement authorities in prosecuting users who are involved in such
          violations. You agree not to use any device, software or routine to
          interfere or attempt to interfere with the proper working of this Site
          or any activity being conducted on this Site. You agree, further, not
          to use or attempt to use any engine, software, tool, agent or other
          device or mechanism (including without limitation browsers, spiders,
          robots, avatars or intelligent agents) to navigate or search this Site
          other than the search engine and search agents available from
          NextME.com on this Site and other than generally available third party
          web browsers (e.g., Netscape Navigator, Microsoft Explorer).Next ME
          and their respective publishers, authors, agents and employees have
          done their best to ensure the accuracy and currency of all the
          information on this website contributed by them; however, they accept
          no responsibility for any loss, injury, or damages sustained by anyone
          as a result of information or advice contained on the site nor for the
          results of any travel arrangement originating from this site. The use
          of information on or derived from this site and any arrangement for
          travel with person’s contacted through the site is made at the user’s
          own risk.
        </div>
        <div className="py-2" style={{ textAlign: "justify" }}>
          We encourage you to verify any critical information with the relevant
          authorities before you travel. This includes information on visa
          requirements, health and safety, customs, and transportation.Next ME
          and their respective publishers, authors, agents and employees make no
          representations about the suitability of the information contained in
          the documents and related graphics published on this website for any
          purpose. All such documents and related graphics are provided ”as is”
          without warranty of any kind, statutory or otherwise.
        </div>
        <div className="py-2" style={{ textAlign: "justify" }}>
          Next ME and their respective publishers, authors, agents and employees
          disclaim all warranties and conditions with regard to this internet
          site and the information contained therein, including, without
          limitation, all implied warranties and conditions of merchantability,
          fitness for a particular purpose, title, and non-infringement. In no
          event shall Next ME and their respective publishers, authors, agents
          and employees, be liable for any special, indirect, or consequential
          damages or any damages whatsoever whether in an action of contract,
          negligence, or other tortuous action, arising out of or in connection
          with the use or performance of this internet site or of the
          information and documents contained therein, provision of or failure
          to provide services, or any other information directly or indirectly
          available from this website.The documents and related graphics
          published on this website could include technical inaccuracies or
          typographical errors.
        </div>
        <div className="py-2" style={{ textAlign: "justify" }}>
          Changes are periodically added to the information herein. Next ME may
          make improvements and/or changes in the product(s) described herein at
          any time. The linked sites are not under the control of Next ME and
          their respective employees are not responsible for the contents of any
          linked site or any link contained in a linked site. Next ME is
          providing these external links to you only as a convenience, and the
          inclusion of any link does not imply endorsement by Next ME of the
          site.
        </div>
        <div className="py-2" style={{ textAlign: "justify" }}>
          All views expressed by individuals on this site are their personal
          opinions and are not necessarily those of or endorsed by Next ME
        </div>
        <div className="py-2">
          <strong className="fw-bold;">Note: </strong>All products sold on
          NextME.com are brand new and 100% genuine.Disclaimer: The website does
          not guarantee 100% accuracy of information. We suggest you to double
          check with the manufacturer/website for data validity. Color of the
          product may vary from the one illustrated.
        </div>
        <div className="fs-5">
          NextME holds the rights to cancel any order in any of the below cases.
        </div>
        <div className="py-2">
          <strong className="fw-bold;">Wrong Image : </strong>Images are meant
          for illustrative purposes only. Customer buys a product where the
          image was wrongly advertised.
        </div>
        <div className="py-2">
          <strong className="fw-bold;">Wrong Price : </strong>Prices are updated
          in bulk. If a wrong price is advertised on the website.
        </div>
        <div className="py-2">
          <strong className="fw-bold;">Wrong Description : </strong> Mistakes
          may occur while capturing information from the internet. Certain
          products may have different features in different region. Customer
          buys a product which may not have a feature which is advertiesed.
        </div>
        <div className="py-2">
          <strong className="fw-bold">Fraudulent Transactions : </strong> Next
          ME holds the rights to cancel orders made with fraudulent email ID,
          payment method and all kinds of bulk purchases. For placing bulk
          orders, customers are requested to route through{" "}
          <a href="/bulk-order">Here.</a>
        </div>
        <div className="py-2 fw-bold ">Entire Agreement</div>
        <div className="py-2" style={{ textAlign: "justify" }}>
          If any part of this agreement is determined to be invalid or
          unenforceable pursuant to applicable law including, but not limited
          to, the warranty disclaimers and liability limitations set forth
          above, then the invalid or unenforceable provision will be deemed to
          be superseded by a valid, enforceable provision that most closely
          matches the intent of the original provision and the remainder of the
          agreement shall continue in effect. Unless otherwise specified herein,
          this agreement constitutes the entire agreement between you and
          NextME.com with respect to the NextME.com sites/services and it
          supersedes all prior or contemporaneous communications and proposals,
          whether electronic, oral or written, between you and NextME.com with
          respect to the NextME.com sites/services. NextME.com’s failure to act
          with respect to a breach by you or others does not waive its right to
          act with respect to subsequent or similar breaches.
        </div>
        <div className="py-2 fw-bold ">Orders held/delayed</div>
        <ul>
          <li>
            Deliveries are subjected to delays if information is
            incomplete/incorrect.
          </li>
          <li>
            Orders may be placed on hold if the bank raises concern for
            authentication of the transaction.
          </li>
        </ul>
        <div className="py-2 fw-bold ">Transaction Currency:</div>
        <div className="py-2" style={{ textAlign: "justify" }}>
          The standard transaction currency on our e-commerce portal is UAE
          Dhirams (AED). If the customer is using a credit card supplied by
          banks other than those in the UAE, the amount on the credit card bill
          may differ due to exchange rate fluctuations and any charges that the
          card issuer/bank may have debited.
        </div>
        <div className="py-2">
          Country of Merchant Domicile: <br />
          Next ME is a Limited Liability Company registered in Dubai, UAE.
        </div>
        <h5 className="mt-4">CUSTOMER SERVICE</h5>
        <div className="py-2">
          Next ME Customer Service <br />
          CALL US: <a href="tel:6238780530">6238780530</a>
          <br />
          E-mail: <a href="mailto:support@netxme.com">
            support@nextme.com
          </a>{" "}
          <br />
          Time: 8:30am to 6:30pm
        </div>
      </div>
      <div className="mt-5">
        <SubscribeNewsletter />
      </div>
    </div>
  );
}
export default DisclaimerPolicy;
