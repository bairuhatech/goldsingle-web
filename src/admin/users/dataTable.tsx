import { Button, Pagination, Table, Tag } from "antd";
import moment from "moment";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { TiTick } from "react-icons/ti";

function UserDataTable(props: any) {
  console.log("Received Data:", props.data);
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
      render: (item: string, all: any) => (
        <span>
          {`${all.countrycode ? all.countrycode : ""} ${
            all.phone ? all.phone : ""
          }`}{" "}
          {all.phone_verify ? <TiTick color="#008000" size={20} /> : null}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (item: string, all: any) => (
        <span>
          {item}
          {all.mail_verify ? <TiTick color="#008000" size={18} /> : null}
        </span>
      ),
    },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item: string) => <span>{`${moment(item).format("DD/MM/YYYY")}`}</span>,
    },
    {
      title: "View",
      key: "actions",
      width: 50,
      render: (_text: any, _record: any) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <AiOutlineEye
            cursor="pointer"
            size={25}
            color="#a10244"
            onClick={() => props?.viewDetailsPage(_record)}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        size="small"
        dataSource={props.data}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {},
          };
        }}
        pagination={false}
      />
      <div className="d-flex justify-content-end mt-3">
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
            props?.changePage(current);
          }}
        />
      </div>
    </div>
  );
}

export default UserDataTable;
