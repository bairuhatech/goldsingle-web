import { Button, Popconfirm, Table, notification } from "antd";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiSolidEditAlt } from "react-icons/bi";
import { useState } from "react";
import API from "../../config/API";
import { DELETE } from "../../utils/apiCalls";
import "./styles.scss";
import React from "react";
function DataTable(props: any) {
  const [Notifications, contextHolder] = notification.useNotification();
  const itemDeleteHandler = async (item: any) => {
    const url = API.SUB_CATEGORY_EDIT + item?._id;
    try {
      const response: any = await DELETE(url);
      if (response.status) {
        Notifications["success"]({
          message: "Success",
          description: response.message,
        });
        props?.getSubCategory();
      }
    } catch (err: any) {
      Notifications["error"]({
        message: "Failed to Delete",
        description: err.message,
      });
    }
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (item: any) => (
        <img
          alt={"image"}
          src={item}
          className="subcategory-table-card-image"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (item: any) => item.name,
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_text: any, _record: any) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <BiSolidEditAlt
            cursor="pointer"
            size={25}
            color="#a10244"
            onClick={() => {
              props?.openModal();
              props?.changeType();
              props?.receiveData(_record);
            }}
          />

          <Popconfirm
            placement="bottomRight"
            title={"Are you sure to delete?"}
            okText="Yes"
            cancelText="No"
            onConfirm={() => itemDeleteHandler(_record)}
          >
            <Button type="link">
              <AiTwotoneDelete cursor="pointer" size={25} color="#a10244" />
            </Button>
          </Popconfirm>
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
        pagination={
          props?.data.length > props?.pageSize && { pageSize: props?.pageSize }
        }
      />
    </div>
  );
}

export default DataTable;
