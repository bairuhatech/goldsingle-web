import { Button, Popconfirm, Table } from "antd";
import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiSolidEditAlt } from "react-icons/bi";
import PageHeader from "../../productByCat/components/pageHeader";
function AddressDataTable(props: any) {
  const columns = [
    {
      title: "Flat",
      dataIndex: "flat",
      key: "flat",
    },
    {
      title: "PinCode",
      dataIndex: "pin_code",
      key: "pin_code",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Street",
      dataIndex: "street",
      key: "street",
    },
    {
      title: "Phone",
      dataIndex: "alt_phone",
      key: "alt_phone",
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_text: any, _record: any) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {/* {contextHolder} */}
          <BiSolidEditAlt
            cursor="pointer"
            size={25}
            color="#DA9100"
            onClick={() => {
              props?.setType();
              props?.toggleModal(true);
              props?.getSelected(_record);
            }}
          />
          <Popconfirm
            placement="bottomRight"
            title={"Are you sure to delete?"}
            okText="Yes"
            cancelText="No"
            onConfirm={() => props?.delete(_record)}
          >
            <AiTwotoneDelete cursor="pointer" size={25} color="#DA9100" />
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <Table
      dataSource={props?.data}
      columns={columns}
      pagination={
        props?.data.length > props?.pageSize && { pageSize: props?.pageSize }
      }
    />
  );
}

export default AddressDataTable;
