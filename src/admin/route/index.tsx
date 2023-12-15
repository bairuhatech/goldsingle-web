import { Route, Routes } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./component/sideBar";

import OverView from "../overView";
import Dashboard from "../dashboard";
import Banners from "../banners";
import Categories from "../categories";
import SubCategories from "../subCategories";
import MenuConfiguration from "../menuConfig";
import Offers from "../offers";
import Settings from "../settings";

import Products from "../products";
import AddProducts from "../products/addItem";
import Enquiry from "../enquiry";
import React from "react";
import EditProducts from "../products/editItem";
import ManageStore from "../manageStore";
import Users from "../users";
import UserInfo from "../users/detailsFolder";
import Orders from "../orders";

import Sellers from "../sellers";
import SellerDetails from "../sellerDetails/detailPage";

import SellerRequestPage from "../sellerRequest";
import CoorporateSellerDetailsPage from "../sellerRequest/coorporate/detailPage";
import IndividualSellerDetailsPage from "../sellerRequest/individual/detailsPage";
import OrderDetailsPage from "../orders/orderDetailsPage";

function Admin() {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col sm={2} style={{ margin: 0, padding: 0 }}>
            <div className="Screen-sideBox">
              <SideBar />
            </div>
          </Col>
          <Col sm={10} style={{ margin: 0, padding: 0 }}>
            <div className="Admin-box">
              <Routes>
                <Route path="/overview" element={<OverView />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/banners" element={<Banners />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/sub-categories" element={<SubCategories />} />
                <Route path="/menu-config" element={<MenuConfiguration />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/enquiry" element={<Enquiry />} />
                <Route path="/manage_store" element={<ManageStore />} />
                <Route path="/users" element={<Users />} />

                <Route path="/sellers" element={<Sellers />} />
                <Route path="/seller/:id" element={<SellerDetails />} />

                <Route path="/seller_request" element={<SellerRequestPage />} />
                <Route
                  path="/seller/coorporate/:id"
                  element={<CoorporateSellerDetailsPage />}
                />
                <Route
                  path="/seller/individual/:id"
                  element={<IndividualSellerDetailsPage />}
                />

                <Route path="/users/:_id" element={<UserInfo />} />
                <Route path="/products" element={<Products />} />
                <Route path="/add-products" element={<AddProducts />} />
                <Route path="/edit-products/:id" element={<EditProducts />} />
                <Route path="/Orders" element={<Orders />} />
                <Route path="/Orders/:id" element={<OrderDetailsPage />} />
              </Routes>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Admin;
