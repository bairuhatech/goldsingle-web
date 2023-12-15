import React, { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import ProductsOverView from "./components/products";
import NewProductsOverView from "./components/newProducts";
import OverViewGraph from "./components/graph";
import "./styles.scss";
import Piechart from "./components/piechart";
import API from "../../config/API";
import { GET } from "../../utils/apiCalls";
import { useSelector } from "react-redux";
import Loading from "../../components/loading";
function OverView() {
  const [loading, setLoading] = useState(true);
  const Auth = useSelector((state: any) => state.User?.user?.data);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const url = API.ORDER_GET_BYSTORE + Auth?.store_id;
    setLoading(true);
    try {
      const response: any = await GET(url, null);
      if (response?.status) {
        setOrders(response?.data);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <Container>
      <br />
      <Row>
        <Col md={12}>
          <div className="overView-Box1">
            <ProductsOverView />
          </div>
        </Col>
        <Col md={8}>
          {loading ? <Loading /> : <NewProductsOverView data={orders} />}
        </Col>
        <Col md={4}>
          <div className="overView-Box3">
            <OverViewGraph />
          </div>
          <br />
          <br />
          <div className="overView-Box4">
            <Piechart />
          </div>
        </Col>
      </Row>
      <br />
    </Container>
  );
}
export default OverView;
