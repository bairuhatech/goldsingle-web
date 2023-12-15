import React, { useEffect, useState } from "react";
import "./style.scss";
import ProductItem from "../../components/Product_Item";
import { Col, Row } from "react-bootstrap";
import { useLocation, useSearchParams } from "react-router-dom";
import API from "../../config/API";
import { GET } from "../../utils/apiCalls";
import Loading from "../../components/loading";
import NoData from "../../components/noData";
import PageHeader from "../productByCat/components/pageHeader";
import { Pagination, Space, notification } from "antd";
import CheckableTag from "antd/es/tag/CheckableTag";
import useDidUpdateEffect from "../../shared/hook/useDidUpdate";
import MultiSearchProductList from "../../components/multiSearchCard/productSlider";
import { useSelector } from "react-redux";

function ProductSearch() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Notifications, contextHolder] = notification.useNotification();
  const [searchParams, setSearchParams] = useSearchParams();
  const Settings = useSelector((state: any) => state.Settings.Settings);
  const currentPage =
    Number(searchParams.get("page")) > 0 ? Number(searchParams.get("page")) : 1;
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
  const [page, setPage] = useState(currentPage);
  const pageSize = 12;
  const [meta, setMeta] = useState<any>({});
  const [initial, setInitial] = useState(true);
  const [selectedTags, setSelectedTags] = useState<any>(initialValues);
  const serchInput = searchParams.get("qs");
  const getProducts = async (page: number) => {
    const price =
      selectedTags[1].status == true
        ? "DESC"
        : selectedTags[2].status == true
        ? "ASC"
        : "RAND";
    const order = selectedTags[0].value;
    const searchType =
      Settings?.type === "multi"
        ? API.PRODUCT_SEARCH_MULTI
        : API.PRODUCT_SEARCH_SINGLE;
    const url =
      searchType +
      `name=${serchInput}&order=${order}&price=${price}&page=${page}&take=${pageSize}`;
    setLoading(true);
    try {
      if (serchInput) {
        const response: any = await GET(url, null);
        if (response?.status) {
          setProduct(response?.data);
          setMeta(response?.meta);
        }
      }
    } catch (err: any) {
      Notifications["error"]({
        message: "Failed to Get Categories",
        description: err.message,
      });
    } finally {
      setInitial(false);
      setLoading(false);
    }
  };
  const changePage = async (page: number, take: number) => {
    await getProducts(page);
    setPage(page);
    setSearchParams((searchparams) => {
      searchparams.set("page", String(page));
      return searchparams;
    });
    window.scrollTo(0, 0);
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
    console.log(array);
  };
  useDidUpdateEffect(() => {
    getProducts(1);
    setPage(1);
  }, [serchInput]);
  useEffect(() => {
    getProducts(page);
    window.scrollTo(0, 0);
  }, [selectedTags]);
  return (
    <div className="Screen-box mb-4">
      <PageHeader
        title={`Result for: "${serchInput?.toLowerCase()}"`}
        count={`${
          initial == false
            ? `${`${
                ((page > meta?.pageCount ? 1 : page == 0 ? 1 : page) - 1) *
                  pageSize +
                product?.length
              } of ${meta?.itemCount || 0} ${Settings?.type=='multi'?'Stores':"Items"}`}`
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
      <Row className="mx-0 gy-3">
        {loading ? (
          <Loading />
        ) : product.length && Settings?.type === "multi" ? (
          product.map((item: any) => {
            return <MultiSearchProductList data={item} search={serchInput} type="search"/>;
          })
        ) : product.length && Settings?.type === "single" ? (
          product.map((item: any, index: number) => (
            <Col md="3" key={index}>
              <ProductItem item={item} />
            </Col>
          ))
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
              changePage(current, size);
            }}
          />
        </div>
      </Row>
    </div>
  );
}

export default ProductSearch;
