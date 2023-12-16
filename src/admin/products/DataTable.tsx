import { Button, Pagination, Popconfirm, Table, Tag, notification } from "antd";
import { AiTwotoneDelete } from "react-icons/ai";
import API from "../../config/API";
import { DELETE } from "../../utils/apiCalls";
import { BiSolidEditAlt } from "react-icons/bi";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useNavigate } from "react-router-dom";
function DataTable(props: any) {
  const [Notifications, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const itemDeleteHandler = async (item: any) => {
    const url = API.PRODUCTS_DELETE + item?._id;
    try {
      const response: any = await DELETE(url);
      if (response.status) {
        Notifications["success"]({
          message: "Success",
          description: response.message,
        });
        props?.getProducts(props?.page);
      } else {
        Notifications["error"]({
          message: "Failed to Delete",
          description: response.message,
        });
      }
    } catch (err: any) {
      Notifications["error"]({
        message: "Failed to Delete",
        description: err.message,
      });
    }
  };
  const columns: ColumnsType<any> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (item: any) => (
        <img alt={"image"} src={item} className="product-table-list-image" />
      ),
      width: 60,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "category",
      responsive: ["md"],
      render: (item: any) => item.name,
    },
    {
      title: "Price",
      dataIndex: "retail_rate",
      key: "price",
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (item: boolean) =>
        item == true ? (
          <Tag color="success" bordered={false}>
            Active
          </Tag>
        ) : item == false ? (
          <Tag color="warning" bordered={false}>
            Inactive
          </Tag>
        ) : (
          <Tag color="success" bordered={false}>
            Unknown
          </Tag>
        ),
    },

    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: (_text: any, _record: any) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <BiSolidEditAlt
            cursor="pointer"
            size={20}
            color="#B95C50"
            onClick={() => {
              // props?.changeType();
              // props?.getSelectedItem(_record);
              // props?.openModal();
              navigate(`/auth/edit-products/${_record?._id}`);
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      {contextHolder}
      <Table
        size="small"
        dataSource={props?.data?.length ? props.data : []}
        columns={columns}
        pagination={false}
        bordered={true}
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
            props?.changePage(current, size);
          }}
        />
      </div>
    </div>
  );
}

export default DataTable;
