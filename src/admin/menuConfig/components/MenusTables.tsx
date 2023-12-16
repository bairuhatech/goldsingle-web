import {
  Button,
  Space,
  Checkbox,
  Input,
  Table,
  Modal,
  Form,
  Select,
  Popconfirm,
  notification,
} from "antd";
import API from "../../../config/API";
import { DELETE, GET, POST } from "../../../utils/apiCalls";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Col, Row } from "react-bootstrap";
import React from "react";

const MenusTables = (props: any) => {
  const [form] = Form.useForm();
  const [menus, setMenus] = useState([]);
  const [Notifications, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [checked, setChecked] = useState<any>();
  const [isModal, setIsModal] = useState(false);
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    LoadMenus();
  }, []);

  const LoadMenus = async () => {
    setLoading(true);
    try {
      let url = API.MENU_CONFIG_All;
      let loadMenus: any = await GET(url, null);

      setMenus(loadMenus.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const addMenus = async (values: any) => {
    try {
      setFormLoading(true);
      let url = API.MENU_CONFIG_ADD;
      let Obj = {
        name: values?.name,
        route: values?.route,
        icon: values?.icon,
      };
      let addMenu: any = await POST(url, Obj);
      console.log("first", addMenu);
      if (addMenu.status) {
        LoadMenus();
      }
    } catch (error) {
    } finally {
      form.resetFields();
      setFormLoading(false);
      setIsModal(false);
    }
  };
  async function DeleteMenu(id: any) {
    try {
      setDeleteLoad(true);
      let url = API.MENU_CONFIG_DELETE + Number(id);
      let deleteRole: any = await DELETE(url);

      if (deleteRole?.data?.id) {
        Notifications["success"]({
          message: "Successfully Deleted Menu",
        });
        LoadMenus();
      }
    } catch (err) {
    } finally {
      setDeleteLoad(false);
    }
  }

  const menuColumns = [
    {
      title: "Icon",
      dataIndex: `icon`,
      key: "_id",
      width: "30%",
    },

    {
      title: "Menu",
      dataIndex: `name`,
      key: "_id",
      width: "30%",
    },
    {
      title: "Route",
      dataIndex: `route`,
      key: "_id",
      width: "30%",
    },
    {
      title: <span>Action</span>,
      dataIndex: "id",
      key: "id",
      render: (text: any, record: any) => {
        return (
          <div style={{ textAlign: "center", width: "10%" }}>
            <Popconfirm
              placement="left"
              title={"Are you sure Delete ?"}
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                DeleteMenu(record?.id);
              }}
              okButtonProps={{ loading: deleteLoad }}
            >
              <AiFillDelete color="#B95C50" size={21} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    props.selectedMenu(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <div style={{ marginTop: -15, borderLeft: "2px solid #e2e2e9" }}>
          <Row>
            <Col sm={9}>
              <Input
                placeholder="Search Menus"
                style={{ width: "100%" }}
                bordered={false}
              />
            </Col>
            <Col sm={3}>
              <Button onClick={() => setIsModal(true)} block type="primary">
                Add Menus
              </Button>
            </Col>
          </Row>
          <Table
            size="small"
            bordered
            dataSource={menus}
            columns={menuColumns}
            rowKey={(data: any) => data?.id}
            pagination={false}
            rowSelection={rowSelection}
          />
          <Modal
            title="Add Menus"
            open={isModal}
            onOk={() => console.log("onOk")}
            onCancel={() => setIsModal(false)}
            width={500}
            footer={false}
          >
            <Form form={form} onFinish={addMenus} layout="vertical">
              <Form.Item
                label={"Label"}
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "enter menu name",
                  },
                ]}
              >
                <Input placeholder="Enter Label" />
              </Form.Item>
              <Form.Item
                label={"Route"}
                name={"route"}
                rules={[
                  {
                    required: true,
                    message: "choose route",
                  },
                ]}
              >
                <Input placeholder="Enter route" />
              </Form.Item>
              <Form.Item
                label={"Icons"}
                name={"icon"}
                rules={[
                  {
                    required: true,
                    message: "choose icon",
                  },
                ]}
              >
                <Input placeholder="Select Icon" />
              </Form.Item>
              <Form.Item>
                <Button loading={false} type="primary" block htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default MenusTables;
