import React, { useEffect, useState } from "react";
import DataTable from "./dataTable";
import { CorporateRegisterType } from "../../shared/types/types";
import { GET } from "../../utils/apiCalls";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import API from "../../config/API";
import AdminLoading from "../components/AdminLoading";
import NoData from "../../components/noData";

function Sellers() {
  const [store, setStore] = useState<CorporateRegisterType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [Notifications, contextHolder] = notification.useNotification();
  const [meta, setMeta] = useState<any>({});
  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const getSellerDetails = async (currentPage: number = page) => {
    setLoading(true);
    try {
      const url =
        API.CORPORATE_STORE_GETALL +
        `/all?order=DESC&page=${currentPage}&take=${pageSize}`;
      const data: any = await GET(url, null);
      if (data?.status) {
        const approvedData = data.data.filter(
          (item: any) => item.status === "approved"
        );
        setStore(approvedData);
        setMeta(data?.meta);
      }
    } catch (err: any) {
      Notifications["error"]({
        message: "Something went wrong",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const viewDetailsPage = (record: any) => {
    navigate(`/auth/seller/${record.id}`);
  };

  const changePage = async (page: number) => {
    await getSellerDetails(page);
    setPage(page);
  };
  useEffect(() => {
    getSellerDetails();
  }, []);

  return (
    <>
      {contextHolder}
      <PageHeader title="Sellers"></PageHeader>
      {isLoading ? (
        <AdminLoading />
      ) : store.length ? (
        <DataTable
          data={store}
          changePage={changePage}
          meta={meta}
          pageSize={pageSize}
          viewDetailsPage={viewDetailsPage}
          page={page}
        />
      ) : (
        <NoData />
      )}
    </>
  );
}

export default Sellers;
