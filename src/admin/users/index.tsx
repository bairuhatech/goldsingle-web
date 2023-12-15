import React, { useEffect, useState } from "react";
import API from "../../config/API";
import { GET } from "../../utils/apiCalls";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import NoData from "../../components/noData";
import AdminLoading from "../components/AdminLoading";
import UserDataTable from "./dataTable";

function Users() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>({});
  const pageSize = 10;
  const navigate = useNavigate();

  const getUsersData = async (currentPage: number = page) => {
    try {
      let url =
        API.USER_CONFIG_USERS +
        `?order=DESC&page=${currentPage}&take=${pageSize}`;
      let data: any = await GET(url, null);
      console.log(data);
      setUserData(data);
      setMeta(data?.meta || {});
    } catch (err) {
      console.log("error occurred while fetching data:", err);
    } finally {
      setLoading(false);
    }
  };
  const viewDetailsPage = (record: any) => {
    navigate(`/auth/users/${record._id}`);
  };

  const changePage = async (page: number) => {
    await getUsersData(page);
    setPage(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <>
      <PageHeader title="Users"></PageHeader>
      {loading && loading ? (
        <AdminLoading />
      ) : userData.length ? (
        <UserDataTable
          data={userData}
          changePage={changePage}
          meta={meta}
          pageSize={pageSize}
          viewDetailsPage={viewDetailsPage}
          getUsers={getUsersData}
          page={page}
        />
      ) : (
        <NoData />
      )}
    </>
  );
}
export default Users;
