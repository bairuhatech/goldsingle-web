import { Button, Pagination, Popconfirm, Table } from "antd";
import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiSolidEditAlt } from "react-icons/bi";
import PageHeader from "../../productByCat/components/pageHeader";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function WishListDataTable(props: any) {
  const navigate = useNavigate();
  const Settings = useSelector((state: any) => state.Settings.Settings);
  const columns = [
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (item: string, record: any) => (
        <img
          alt={"image"}
          src={item}
          className="wishlist-card-image"
          onClick={() => {
            navigate(
              `/product/details?pid=${window.btoa(record.productId)}&name=${
                record?.name
              }`
            );
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "flat",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "pin_code",
    },
    {
      title: "Price",
      dataIndex: "buyPrice",
      key: "state",
      render: (item: any) => (
        <span>
          {Settings?.currency}
          {item}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 50,
      render: (_text: any, _record: any) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Popconfirm
            placement="bottomRight"
            title={"Are you sure to Remove item from wishlist?"}
            okText="Yes"
            cancelText="No"
            onConfirm={async () => await props?.delete(_record)}
          >
            <Button type="link">
              <AiTwotoneDelete cursor="pointer" size={25} color="#DA9100" />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <>
      <Table
        dataSource={props?.data}
        columns={columns}
        pagination={false}
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: (event) => {
        //       navigate(
        //         `/product/details?pid=${window.btoa(
        //           record.productId
        //         )}&name=${record?.name}`
        //       );
        //     }, // click row
        //   };
        // }}
      />
      <div className="d-flex justify-content-end">
        <Pagination
          className="mt-2"
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
    </>
  );
}

export default WishListDataTable;
