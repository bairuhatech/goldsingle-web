import { Button, Pagination, Table, notification } from "antd";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";

function DataTable(props: any) {
  const [Notifications, contextHolder] = notification.useNotification();
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
      render: (item: string) => item,
    },
    {
      title: "Business Type",
      dataIndex: "business_type",
      key: "business_type",
    },
    {
      title: "Store Name",
      dataIndex: "store_name",
      key: "store_name",
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
          onClick={() => props?.viewDetailsPage(_record)}
        >
          <AiOutlineEye cursor="pointer" size={25} color="#a10244" />
        </div>
      ),
    },
  ];
  return (
    <div>
      {contextHolder}
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
