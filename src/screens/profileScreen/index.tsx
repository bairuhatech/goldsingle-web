import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./components/sidebar";
import MainArea from "./components/mainArea";
import React from "react";
import "./styles.scss";

function ProfileScreen() {
  return (
    <Container fluid>
      <Row>
        <Col sm={2} style={{ margin: 0, padding: 0 }}>
          <div className="profile-sideBar">
            <Sidebar />
          </div>
        </Col>
        <Col md="10">
          <div className="ProfileScreen-box">
            <MainArea />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default ProfileScreen;
