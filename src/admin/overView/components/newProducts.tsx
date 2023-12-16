import { Table } from "antd";
import { AiOutlineEye } from "react-icons/ai";
import React from "react";
import moment from "moment";
function NewProductsOverView(props: any) {
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
      render: (item: any) => <span>{moment(item).format("MM/DD/YYYY")}</span>,
    },
    {
      title: "Status", //
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: (_text: any, _record: any) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <AiOutlineEye cursor="pointer" size={20} color="#B95C50" />
        </div>
      ),
    },
  ];
  return (
    <Table
      size="small"
      dataSource={props?.data?.length ? props.data : []}
      columns={columns}
      pagination={false}
    />
  );
}

export default NewProductsOverView;
