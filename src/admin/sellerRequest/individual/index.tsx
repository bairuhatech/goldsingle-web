import React, { useEffect, useState } from "react";
import DataTable from "./dataTable";
import API from "../../../config/API";
import { DELETE, GET } from "../../../utils/apiCalls";
import { CorporateRegisterType } from "../../../shared/types/types";
import AdminLoading from "../../components/AdminLoading";
import NoData from "../../../components/noData";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

function IndividualSellerRequestPage() {
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
        API.INDIVIDUAL_STORE_GETALL +
        `?order=DESC&page=${currentPage}&take=${pageSize}`;
      const data: any = await GET(url, null);
      if (data?.status) {
        const nonApprovedData = data.data.filter(
          (item: any) => item.status !== "approved"
        );
        setStore(nonApprovedData);
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
    navigate(`/auth/seller/individual/${record.id}`);
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

export default IndividualSellerRequestPage;
