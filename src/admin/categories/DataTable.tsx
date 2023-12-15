import { Button, Pagination, Popconfirm, Table, notification } from "antd";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiSolidEditAlt } from "react-icons/bi";
import API from "../../config/API";
import { DELETE } from "../../utils/apiCalls";
import "./style.scss";
import React from "react";
function DataTable(props: any) {
  const [Notifications, contextHolder] = notification.useNotification();
  const itemDeleteHandler = async (item: any) => {
    const url = API.CATEGORY + item?.id;
    try {
      const response: any = await DELETE(url);
      if (response.status) {
        Notifications["success"]({
          message: "Success",
          description: response.message,
        });
        props?.getCategory(props?.page);
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
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (item: any) => (
        <img alt={"image"} src={item} className="category-table-card-image" />
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
      title: "Actions",
      key: "actions",
      width: 80,
      render: (_text: any, _record: any) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {contextHolder}
          <BiSolidEditAlt
            cursor="pointer"
            size={25}
            color="#a10244"
            onClick={() => {
              props?.changeType();
              props?.getSelectedItem(_record);
              props?.openModal();
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
      <Table
        size="small"
        dataSource={props?.data?.length ? props.data : []}
        columns={columns}
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
            props?.changePage(current, size);
          }}
        />
      </div>
    </div>
  );
}

export default DataTable;
