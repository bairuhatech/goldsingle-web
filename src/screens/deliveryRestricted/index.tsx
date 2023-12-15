import { Row, Col, Container } from "react-bootstrap";
import SaleMessage from "../../components/saleMessage";
import SubscribeNewsletter from "../../components/subscribeNewsletter";
import PageHeader from "../../components/pageHeader";
import { useEffect } from "react";
import React from "react";
function DeliveryRestricted() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Screen-box">
      <div>
        <SaleMessage />
      </div>
      <div className="ftscreen-fnt mx-2">
        <PageHeader text="Remote / Non Serviceable Areas – UAE"></PageHeader>
        <div className="d-flex p-2">Dear Valued Customer,</div>
        <div className="d-flex p-2">
          Remote areas are excluded from our normal delivery as advised by the
          supplier. However, we can try delivering using our courier partner.
          Additional charges may incur. Non-serviceable areas are excluded from
          any deliveries.
        </div>
        <Row>
          <Col>
            <div className="d-flex p-2 my-3">Remote Areas</div>
            <ul className="bullet-list">
              <li>Hatta, Madham, Hatta Outer</li>
              <li>Dhaharat Al Teeb</li>
              <li>Al Ain Outer 1</li>
              <li>Al Ain Outer 2</li>
              <li>Al Sweihan</li>
              <li>Al Waqan</li>
              <li>Al Qua</li>
              <li>Nahel</li>
              <li>Al Dahra</li>
              <li>Al Ain outer 3</li>
              <li>Salam City Workers Area</li>
              <li>Hamim</li>
              <li>Madina Zayed, Beda Zayed</li>
              <li>Habshan</li>
              <li>Bu Hasa</li>
              <li>Tarif</li>
              <li>Al Mirfa</li>
              <li>Ruwais</li>
              <li>Ghayathi</li>
              <li>Jebel Dhanna</li>
              <li>Liwa, Mezaira’a, Khannur, Kayyam, Umm Hosn</li>
              <li>Bu Ghar</li>
              <li>Al Kifefah, Umm Hafaf, Al Marfa</li>
              <li>Qareen Al Aish</li>
              <li>Arada, Al Hilew, Mukhayriz, Al Birer</li>
              <li>Gheweifat, Batha</li>
              <li>Sila</li>
              <li>Jananah Island</li>
              <li>Abu Al Abyad Island</li>
              <li>Ras Ghurb Island</li>
              <li>Dalma Island</li>
              <li>Baniyas Island</li>
            </ul>
          </Col>
          <Col>
            <div className="d-flex p-2 my-3">Non Serviceable Areas</div>
            <ul className="bullet-list">
              <li>Al Hudairiyat Island</li>
              <li>Umm Yifenah Island</li>
              <li>Balrmad Island</li>
              <li>Mushayrib Island</li>
              <li>Sas Al Nakhl Island</li>
              <li>Lulu Island</li>
              <li>Nareel Island</li>
              <li>Zeraa Island</li>
              <li>Al Rafiq, Qassabi</li>
              <li>AD Northeast, Twazun, Warsan farms</li>
              <li>Nisab, Sahil</li>
              <li>Al Janai</li>
              <li>Al Taff, Bid Khabbab</li>
              <li>Bin Thilab, Gharab</li>
              <li>Etihad Rail, Umm Al Ashtan</li>
              <li>Moreeb Hills, Zarrarah</li>
            </ul>
          </Col>
        </Row>
      </div>
      <div className="mt-5">
        <SubscribeNewsletter />
      </div>
    </div>
  );
}
export default DeliveryRestricted;
