import { Button, Pagination, Popconfirm, Table, notification } from "antd";
import { AiOutlineEye, AiTwotoneDelete } from "react-icons/ai";
import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getOrderStatus } from "../../shared/helpers/getOrderStatus";
function DataTable(props: any) {
  const navigate = useNavigate();
  const Settings = useSelector((state: any) => state.Settings.Settings);
  const columns = [
    {
      title: "OrderId",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User Name",
      dataIndex: "userDetails",
      key: "userId",
      render: (item: any) => <span>{item?.name}</span>,
    },
    {
      title: "OrderDate", //
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item: any) => <span>{moment(item).format("MMM Do YYYY")}</span>,
    },
    {
      title: "Total", //
      dataIndex: "total",
      key: "total",
      render: (item: any) => (
        <span>
          {Settings.currency}
          {item}
        </span>
      ),
    },
    {
      title: "Status", //
      dataIndex: "status",
      key: "status",
      render: (item: string) => <span>{getOrderStatus(item)}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: (_text: any, _record: any) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <AiOutlineEye
            cursor="pointer"
            size={20}
            color="#B95C50"
            onClick={() => {
              navigate(`/auth/Orders/${_record?.id}`);
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        size="small"
        dataSource={props?.data?.length ? props.data : []}
        columns={columns}
        pagination={false}
      />
      {/* <div className="d-flex justify-content-end mt-3">
        <Pagination
          current={props?.page || 1}
          pageSize={props?.pageSize || 10}
          total={props?.meta?.itemCount || 0}
          defaultCurrent={1}
          responsive={true}
          defaultPageSize={props?.pageSize || 10}
          disabled={false}
          hideOnSinglePage={true}
          onChange={(current: any, size: any) => {
            props?.changePage(current, size);
          }}
        />
      </div> */}
    </div>
  );
}

export default DataTable;
