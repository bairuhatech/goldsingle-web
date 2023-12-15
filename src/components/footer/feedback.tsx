import { useState } from "react";
import "./styles.scss";
import { Row, Col, Container } from "react-bootstrap";
import { AiOutlineMessage } from "react-icons/ai";
import { IoLocationOutline, IoCallOutline } from "react-icons/io5";
import { Button, Modal, Rate } from "antd";
import { useTranslation } from "react-i18next";
import React from "react";

const FeedBack = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="feedback-container">
      <Container>
        <Row className="pt-3 pb-3">
          <Col md={3} className="mb-1 mt-1">
            <a href="#" className="feedback-links">
              <section>
                <div>{t("need_help")}</div>
                <div>
                  <u>Reach out to us</u> on any of the support channel
                </div>
              </section>
            </a>
          </Col>
          <Col md={3} className="mb-1 mt-1">
            <a href="#" className="feedback-links">
              <IoLocationOutline className="feedback-icons" />
              <section>
                <div>{t("store_locate")}</div>
                <div>{t("store_desc")}</div>
              </section>
            </a>
          </Col>
          <Col md={3} className="mb-1 mt-1">
            <a
              href="#"
              className="feedback-links"
              onClick={() => setIsModalOpen(true)}
            >
              <AiOutlineMessage className="feedback-icons" />
              <section>
                <div>{t("feedback")}</div>
                <div>{t("feedback_desc")}</div>
              </section>
            </a>
          </Col>
          <Col md={3} className="mb-1 mt-1">
            <a href="#" className="feedback-links">
              <IoCallOutline className="feedback-icons" />
              <section>
                <div>{t("chat_now")}</div>
                <div>{t("chat_desc")}</div>
              </section>
            </a>
          </Col>
        </Row>
        <Modal
          footer={false}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          title={"Feedback"}
          centered
        >
          <div className="rating-container">
            <span className="rate-text">
              Your feedback matters! Help us <br /> improve the Walmart website
            </span>
            <Rate
              allowClear={false}
              defaultValue={0}
              style={{ fontSize: 55 }}
            />
            <span className="rate-text-2">
              Y(1 = Very poor, 5 = Excellent!)
            </span>
            <br />
            <Button style={{ width: 150 }} type="primary" size="large">
              Submit
            </Button>
          </div>
        </Modal>
      </Container>
    </main>
  );
};

export default FeedBack;
