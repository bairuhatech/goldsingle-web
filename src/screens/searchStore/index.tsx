import React, { useEffect, useState } from "react";
import PageHeader from "../productByCat/components/pageHeader";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import API from "../../config/API";
import { GET } from "../../utils/apiCalls";
import { Col, Row } from "react-bootstrap";
import { Avatar, Card, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import "./style.scss";
import StoreMainArea from "./storemain";

function SearchProductsByStore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("qs") || "";
  const storeId = searchParams.get("id") || "";
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingStore, setLoadingStore] = useState(true);
  const [store, setStore] = useState<any>({});
  const [category, setCategory] = useState<any>("");
  const params = useParams();
  const navigate = useNavigate();
  const selectedCategory = searchParams.get("cid");
  const getStoreDetails = async () => {
    const url = API.STORE_SEARCH_GETINFO + params.store;
    try {
      const response: any = await GET(url, null);
      if (response.status) {
        setStore(response.data?.store);
        setCategories(response.data?.category);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
    } finally {
      setLoadingStore(false);
    }
  };

  useEffect(() => {
    getStoreDetails();
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (selectedCategory != null) {
      setCategory(selectedCategory);
    } else if (params["*"] == "main") {
      setCategory("all");
    } else if (params["*"] == "search") {
      setCategory("");
    } else {
      setCategory("");
    }
  }, [selectedCategory]);
  return (
    <div className="Screen-box mb-4">
      {/* <PageHeader
        title={`${!loading ? meta?.itemCount : "0"} Results for: "${search}"`}
      ></PageHeader> */}

      <Card bordered={false} className="mt-3">
        {loadingStore ? (
          <Skeleton avatar paragraph={{ rows: 1 }} />
        ) : (
          <Row className="mx-0">
            <Col md="3">
              <Meta
                className="mb-md-0 mb-1"
                avatar={<Avatar src={store?.logo_upload} size={50} />}
                title={store?.store_name}
                description="Everyday Store prices"
              />
            </Col>
            <Col md="9" className="px-0">
              <div className="d-flex gap-2 h-100 search-store-subcategories">
                <div
                  className={`search-store-tags px-3 align-self-center text-bold catamaran-regular ${
                    category == "all" ? "active" : ""
                  }`}
                  onClick={() => {
                    setCategory("all");
                    navigate(`main`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  All
                </div>
                {categories?.map((item: any, index: number) => (
                  <div
                    style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                    className={`search-store-tags px-3 align-self-center text-bold catamaran-regular ${
                      item._id == category ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      navigate(
                        `categories?cid=${item?._id}&type=${item?.name}`
                      );
                    }}
                  >
                    {item?.name}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        )}
      </Card>
      <StoreMainArea />
    </div>
  );
}

export default SearchProductsByStore;
