import { Col, Row } from "react-bootstrap";
import PageSider from "./components/pageSider";
import PageHeader from "./components/pageHeader";
import ProductItem from "../../components/Product_Item";
import "./styles.scss";
import API from "../../config/API";
import { GET } from "../../utils/apiCalls";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import NoData from "../../components/noData";
import { Pagination, Space, notification } from "antd";
import CheckableTag from "antd/es/tag/CheckableTag";
import { useSearchParams } from "react-router-dom";
import useDidUpdateEffect from "../../shared/hook/useDidUpdate";
import React from "react";
import { useSelector } from "react-redux";
import MultiSearchProductList from "../../components/multiSearchCard/productSlider";
const getCategoryId = (cid: any): string => {
  try {
    return window.atob(String(cid));
  } catch (err) {
    return "0";
  }
};
const ProductByCategory = (props: any) => {
  const pageSize = 12;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Notifications, contextHolder] = notification.useNotification();
  const [searchParams, setSearchParams] = useSearchParams();
  const [meta, setMeta] = useState<any>({});
  const Settings = useSelector((state: any) => state.Settings.Settings);
  const [page, setPage] = useState(
    Number(searchParams?.get("page")) > 0 ? Number(searchParams.get("page")) : 1
  );
  const categoryId = getCategoryId(searchParams.get("id"));
  const [initial, setInitial] = useState(true);
  const initialValues = [
    {
      status: searchParams.get("order") === "DESC" ? true : false,
      value:
        searchParams.get("order") === "ASC" ||
        searchParams.get("order") === "DESC"
          ? searchParams.get("order")
          : "ASC",
      title: "New",
    },
    {
      status:
        searchParams.get("price") === "DESC" &&
        searchParams.get("order") === "ASC"
          ? true
          : false,
      value: "ASC",
      title: "Price: High to Low",
    },
    {
      status:
        searchParams.get("price") === "ASC" &&
        searchParams.get("order") === "ASC"
          ? true
          : false,
      value: "ASC",
      title: "Price: Low to High",
    },
  ];
  const [selectedTags, setSelectedTags] = useState<any>(initialValues);
  const getProductsBySubCategory = async (page: number) => {
    const price =
      selectedTags[1].status == true
        ? "DESC"
        : selectedTags[2].status == true
        ? "ASC"
        : "RAND";
    const order = selectedTags[0].value;
    const url =
      Settings?.type === "multi"
        ? API.STORE_SEARCH_BYSUBCATEGORY +
          `?category=${categoryId}&order=${order}&price=${price}&page=1&take=10`
        : API.PRODUCT_SEARCH +
          `bysubcategory?id=${categoryId}&order=${order}&page=${page}&take=${pageSize}&price=${price}`;
    if (categoryId) {
      try {
        setLoading(true);
        const response: any = await GET(url, null);
        if (response?.status) {
          setProducts(response?.data);
          setMeta(response?.meta);
          // if (page > response?.meta?.pageCount) {
          //   await getProductsBySubCategory(response?.meta?.pageCount);
          //   setPage(response?.meta?.pageCount);
          //   searchParams.set("page", String(response?.meta?.pageCount));
          //   setSearchParams(searchParams);
          // }
        } else {
          setProducts([]);
          setMeta({});
        }
      } catch (err: any) {
        Notifications["error"]({
          message: "Something went wrong",
          description: err.message,
        });
        setProducts([]);
      } finally {
        setLoading(false);
        setInitial(false);
      }
    } else {
      Notifications["error"]({
        message: "Something went wrong",
      });
    }
  };

  const handleChange = (tag: any, checked: boolean, index: number) => {
    const array = [...selectedTags];
    const findex = array.findIndex((item: any) => item.status == true);
    if (findex != -1 && findex != index) {
      array[findex].status = false;
      array[findex].value = "ASC";
    }
    array[index].status = !array[index].status;
    array[index].value = array[index].status ? "DESC" : "ASC";
    setSelectedTags(array);
    const price =
      array[1].status == true
        ? "DESC"
        : array[2].status == true
        ? "ASC"
        : "RAND";
    setSearchParams((searchParams) => {
      searchParams.set("order", array[0].value);
      searchParams.set("price", price);
      return searchParams;
    });
  };
  const changePage = async (page: number, take: number) => {
    await getProductsBySubCategory(page);
    setPage(page);
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };
  useDidUpdateEffect(() => {
    getProductsBySubCategory(page);
    window.scrollTo(0, 0);
  }, [selectedTags]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductsBySubCategory(1);
    setPage(1);
  }, [categoryId]);
  return (
    <div className="Screen-box mb-4">
      <Row>
        <Col sm={2}>
          <PageSider />
        </Col>
        <Col sm={10}>
          <PageHeader
            title={searchParams.get("type")}
            count={`${
              initial == false
                ? `${`${
                    ((page > meta?.pageCount ? 1 : page == 0 ? 1 : page) - 1) *
                      pageSize +
                    products?.length
                  } of ${meta?.itemCount || 0} Items`}`
                : ""
            }`}
          >
            <Space size={[0, 8]} wrap>
              {selectedTags.map((tag: any, i: number) => (
                <CheckableTag
                  className=""
                  key={i}
                  checked={selectedTags[i].status}
                  onChange={(checked) => handleChange(tag, checked, i)}
                >
                  {tag.title}
                </CheckableTag>
              ))}
            </Space>
          </PageHeader>
          {contextHolder}
          {loading ? (
            <Loading />
          ) : products?.length ? (
            <Row className="gy-3">
              {Settings.type === "multi"
                ? products.map((item: any) => {
                    return (
                      <MultiSearchProductList
                        data={item}
                        type="category"
                        cid={categoryId}
                        cname={searchParams.get("type")}
                      />
                    );
                  })
                : products?.map((item: any, i: number) => (
                    <Col sm="12" md="3" key={i}>
                      <ProductItem item={item} />
                    </Col>
                  ))}
            </Row>
          ) : (
            <NoData text1="No products available" />
          )}
        </Col>
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
              changePage(current, size);
            }}
          />
        </div>
      </Row>
    </div>
  );
};

export default ProductByCategory;
