import { Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Loading from "../../components/loading";
import ProductItem from "../../components/Product_Item";
import { Col } from "react-bootstrap";
import NoData from "../../components/noData";
import { useParams, useSearchParams } from "react-router-dom";
import API from "../../config/API";
import { GET } from "../../utils/apiCalls";
import { Pagination } from "antd";

function StoreSearchPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("qs") || "";
  const params = useParams();
  const storeId = params.store;
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>({});
  const pageSize = 18;
  const getProducts = async (current: number) => {
    setLoading(true);
    const url =
      API.STORE_SEARCH_SEARCH +
      `?storeId=${storeId}&name=${search}&order=DESC&price=ASC&page=${current}&take=${pageSize}`;
    if (storeId && search) {
      try {
        const response: any = await GET(url, null);

        if (response?.status == true) {
          setProducts(response.data);
          setMeta(response?.meta);
        } else {
          setProducts([]);
          throw new Error(response.message);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
  };
  const changePage = async (page: number) => {
    await getProducts(page);
    setPage(page);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    getProducts(1);
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : products.length ? (
        <Row className="gy-3 mx-0">
          <Col md="12">
            <h5>{`${meta.itemCount} Results For "${search}"`}</h5>
          </Col>
          {products.map((item: any, index: number) => (
            <Col
              lg="2"
              sm="4"
              className="ps-md-0"
              style={{ height: "280px" }}
              key={index}
            >
              <ProductItem item={item} />
            </Col>
          ))}
        </Row>
      ) : (
        <NoData text1="No Products available" />
      )}
      <div className="d-flex justify-content-end mt-3">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={meta?.itemCount || 0}
          defaultCurrent={1}
          responsive={true}
          defaultPageSize={pageSize}
          disabled={false}
          hideOnSinglePage={true}
          onChange={(current: any, size: any) => {
            changePage(current);
          }}
        />
      </div>
    </>
  );
}

export default StoreSearchPage;
