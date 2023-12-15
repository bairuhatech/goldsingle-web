import React from "react";

import { Col, Row } from "react-bootstrap";
import "./styles.scss";
import DashboardProduct from "./components/product";
import DashBoardDataTable from "./components/dataTable";
import DashBoardBarchart from "./components/barchart";
import DashboardPiechart from "./components/piechart";
function Dashboard() {
  return (
    <div>
      <Row>
        <Col md={12}>
          <div className="dashboard-Box1">
            <DashboardProduct />
          </div>
        </Col>
        <Col md={8}>
          <div className="dashboard-Box2">
            <DashBoardDataTable />
          </div>
          <br />
        </Col>
        <Col md={4}>
          <div className="dashboard-Box3">
            <DashBoardBarchart />
          </div>
          <br />
          <br />
          <div className="dashboard-Box4">
            <DashboardPiechart />
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default Dashboard;
