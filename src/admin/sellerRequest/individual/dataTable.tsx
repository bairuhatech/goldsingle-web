import { Pagination, Table } from "antd";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";

function DataTable(props: any) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
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
      render: (item: string) => item,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item: string) => item,
    },
    {
      title: "View",
      key: "actions",
      width: 50,
      render: (_text: any, _record: any) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div onClick={() => props?.viewDetailsPage(_record)}>
            <AiOutlineEye cursor="pointer" size={25} color="#B95C50" />
          </div>
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

export default DataTable;
