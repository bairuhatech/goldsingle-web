import React, { useState, useEffect } from "react";
import { Table, Pagination } from "antd";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import API from "../../../config/API";
import { CorporateRegisterType } from "../../../shared/types/types";
import { GET } from "../../../utils/apiCalls";
import "../styles.scss";

function DashBoardDataTable() {
  const [store, setStore] = useState<CorporateRegisterType[]>([]);
  const [meta, setMeta] = useState<any>({});
  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const getSellerDetails = async (currentPage: number = page) => {
    try {
      const url =
        API.CORPORATE_STORE_GETALL +
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
      console.log(err);
    }
  };

  const changePage = async (page: number) => {
    await getSellerDetails(page);
    setPage(page);
  };

  const viewDetailsPage = (record: any) => {
    navigate(`/auth/seller/coorporate/${record.id}`);
  };

  useEffect(() => {
    getSellerDetails();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Business Type",
      dataIndex: "business_type",
      key: "business_type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "View",
      key: "actions",
      width: 50,
      render: (_text: any, _record: any) => (
        <div
          style={{ display: "flex", justifyContent: "space-around" }}
          onClick={() => viewDetailsPage(_record)}
        >
          <AiOutlineEye cursor="pointer" size={25} color="#B95C50" />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="dashBoardDataTable-Box1">
        <div className="dashBoardDataTable-Box2">
          <div className="dashboardText"> Todays Users</div>
          <div className="dashboardText1">View More</div>
        </div>
        <Table
          size="small"
          dataSource={store}
          columns={columns}
          style={{ width: "100%" }}
          scroll={{ x: true }}
          pagination={false}
        />
        <div className="d-flex justify-content-end mt-3">
          <Pagination
            current={page || 1}
            pageSize={pageSize || 10}
            total={meta?.itemCount || 0}
            defaultCurrent={1}
            responsive={true}
            defaultPageSize={pageSize || 10}
            disabled={false}
            hideOnSinglePage={true}
            onChange={(current: any, size: any) => {
              changePage(current);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default DashBoardDataTable;
