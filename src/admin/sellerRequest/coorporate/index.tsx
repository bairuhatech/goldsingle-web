import React, { useEffect, useState } from "react";
import DataTable from "./dataTable";
import API from "../../../config/API";
import { DELETE, GET } from "../../../utils/apiCalls";
import { CorporateRegisterType } from "../../../shared/types/types";
import AdminLoading from "../../components/AdminLoading";
import NoData from "../../../components/noData";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

function CoorporateSellerRequestPage() {
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
        `/approved?order=DESC&page=${currentPage}&take=${pageSize}`; //will take only not approved request
      const data: any = await GET(url, null);
      if (data?.status) {
        setStore(data?.data);
        setMeta(data?.meta);
      } else {
        throw new Error(data.message);
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
    navigate(`/auth/seller/coorporate/${record.id}`);
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
        <NoData text1="No seller request found!"/>
      )}
    </>
  );
}

export default CoorporateSellerRequestPage;
