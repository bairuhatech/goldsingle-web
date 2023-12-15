import { Button, Pagination, Popconfirm, Table, notification } from "antd";
import { AiTwotoneDelete } from "react-icons/ai";
import API from "../../config/API";
import { DELETE } from "../../utils/apiCalls";
import { BiSolidEditAlt } from "react-icons/bi";
import "./style.scss";
import React from "react";
function DataTable(props: any) {
  const [Notifications, contextHolder] = notification.useNotification();

  const itemDeleteHandler = async (item: any) => {
    const url = API.BANNER + item?.id;
    try {
      const response: any = await DELETE(url);
      if (response.status) {
        Notifications["success"]({
          message: "Success",
          description: response.message,
        });
        props?.getBannerData(props?.page);
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
      dataIndex: "img_desk",
      key: "img_desk",
      render: (item: any) => (
        <img alt={"image"} src={item} className="banner-table-card-image" />
      ),
    },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: (text: any, record: any) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BiSolidEditAlt
            cursor="pointer"
            size={20}
            color="grey"
            onClick={() => {
              props?.changeType();
              props?.getSelectedItem(record);
              props?.openModal();
            }}
          />
          <Popconfirm
            placement="bottomRight"
            title={"Are you sure to delete?"}
            okText="Yes"
            cancelText="No"
            onConfirm={() => itemDeleteHandler(record)}
          >
            <AiTwotoneDelete cursor="pointer" size={20} color="#a10244" />
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
        rowKey={(data: any) => data?.id}
        pagination={false}
      />
      <div className="d-flex justify-content-end mt-3">
        <Pagination
          current={props?.page || 1}
          pageSize={props?.pageSize || 10}
          total={props?.meta?.itemCount || 10}
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
