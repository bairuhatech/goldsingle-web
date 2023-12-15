import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import AdminLoading from "../components/AdminLoading";
import API from "../../config/API";
import DataTable from "./DataTable";
import useToggle from "../../shared/hook/useToggle";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { GET } from "../../utils/apiCalls";

function Products() {
  const navigate = useNavigate();
  type ModalState = "add" | "update";
  const [type, setType] = useState<ModalState>("add");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const User = useSelector((state: any) => state.User.user);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async (currentP: number = page) => {
    setIsLoading(true);
    const url =
      API.PRODUCTS_BYSTORE +
      `?storeId=${User?.data?.store_id}&order=ASC&page=${currentP}&take=${pageSize}`;
    try {
      const response: any = await GET(url, null);
      if (response?.status) {
        setProducts(response?.data);
        setMeta(response?.meta);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const changePage = async (page: number, take: number) => {
    fetchProducts(page);
    setPage(page);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <PageHeader title="Products">
        <Button onClick={() => navigate("/auth/add-products")} type="primary">
          Add Product
        </Button>
      </PageHeader>
      {isLoading ? (
        <AdminLoading />
      ) : (
        <DataTable
          data={products}
          getProducts={fetchProducts}
          changeType={() => setType("update")}
          page={page}
          pageSize={pageSize}
          changePage={changePage}
          meta={meta}
        />
      )}
      {/* <ProductsModal
        open={toggle}
        modalClose={() => toggleModal(false)}
        getProducts={fetchProducts}
        type={type}
        data={selectedItem}
        page={page}
      /> */}
    </div>
  );
}
export default Products;
