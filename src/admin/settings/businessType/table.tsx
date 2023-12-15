import { Table, Button, Popconfirm, notification, Pagination } from "antd";
import { AiTwotoneDelete } from "react-icons/ai";
import API from "../../../config/API";
import { DELETE } from "../../../utils/apiCalls";
import { BiSolidEditAlt } from "react-icons/bi";
import React from "react";

function BusinessTypeTable(props: any) {
  const {
    data,
    getBusinesstypeData,
    changeType,
    openModal,
    changePage,
    // receiveSelectedItem,
    page,
    pageSize,
    meta,
  } = props;

  const [Notifications, contextHolder] = notification.useNotification();

  const itemDeleteHandler = async (item: any) => {
    const url = API.BUSINESS_TYPE + item?.id;
    try {
      const response: any = await DELETE(url);
      if (response.status) {
        Notifications["success"]({
          message: "Success",
          description: response.message,
        });
        getBusinesstypeData(page);
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
      title: "Title",
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
              changeType("update");
              //   receiveSelectedItem(record);
              openModal(record);
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
        dataSource={data}
        columns={columns}
        rowKey={(data: any) => data?.id}
        pagination={false}
      />
      <div className="d-flex justify-content-end mt-3">
        <Pagination
          current={page || 1}
          pageSize={pageSize || 10}
          total={meta?.itemCount || 10}
          defaultCurrent={1}
          responsive={true}
          defaultPageSize={pageSize || 10}
          disabled={false}
          hideOnSinglePage={true}
          onChange={(current: any, size: any) => {
            changePage(current, size);
          }}
        />
      </div>
    </div>
  );
}

export default BusinessTypeTable;
