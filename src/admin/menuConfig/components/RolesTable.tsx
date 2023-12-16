import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Table,
  Form,
  Popconfirm,
  notification,
  Modal,
} from "antd";
import API from "../../../config/API";
import { Row, Col } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { DELETE, GET, POST } from "../../../utils/apiCalls";
import React from "react";

const RolesTable = (props: any) => {
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState(null);
  const [Notifications, contextHolder] = notification.useNotification();
  const [loading, setloading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  const [roles, setRoles] = useState<[]>([]);
  const [checked, setChecked] = useState<any>(props.value);
  const [roleName, setRoleName] = useState<any>("");

  useEffect(() => {
    GetRoles();
  }, [roleName]);

  const GetRoles = async () => {
    try {
      let url = API.ROLES_LIST + `?name=${roleName}`;
      let getRoles: any = await GET(url, null);
      if (getRoles?.data?.length) {
        setRoles(getRoles?.data);
      }
      setloading(false);
    } catch (err) {
      setloading(false);
    }
  };

  const AddRoles = async (values: any) => {
    try {
      setPostLoading(true);
      let url = API.ROLES_ADD;
      let obj = {
        store_id: 1,
        name: values?.role,
      };
      let addRoles: any = await POST(url, obj);
      if (addRoles?.message === "Role already exists") {
        Notifications["error"]({
          message: addRoles?.message,
          description: "This role you're trying to insert is already exist.",
        });
      }
      if (addRoles?.message === "New Role created Successfully") {
        Notifications["success"]({
          message: addRoles?.message,
        });
        GetRoles();
      }
    } catch (err) {
    } finally {
      ResetForm2();
      setPostLoading(false);
      setIsModal(false);
    }
  };

  const DeleteRoles = async (id: any) => {
    try {
      setDeleteLoad(true);
      let url = API.ROLES_DELETE + Number(id);
      let deleteRole: any = await DELETE(url);

      if (deleteRole?.data?.id) {
        Notifications["success"]({
          message: deleteRole?.message,
        });
        GetRoles();
      }
    } catch (err) {
    } finally {
      setDeleteLoad(false);
    }
  };

  const ResetForm2 = () => {
    form.resetFields();
  };

  const roleColumns = [
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (text: any, record: any) => {
        return (
          <Checkbox
            checked={record?.id === checked}
            onChange={(val: any) => {
              if (checked) {
                setChecked(null);
              }
              if (val?.target?.checked === true) {
                setChecked(record?.id);
              }
              props?.selectedRole(record);
            }}
          />
        );
      },
    },
    {
      title: <span> Role</span>,
      dataIndex: "name",
      key: "id",
      width: "100%",
    },
    {
      title: <span>Action</span>,
      dataIndex: "id",
      key: "id",
      render: (text: any, record: any) => {
        return (
          <div style={{ textAlign: "center" }}>
            <Popconfirm
              placement="left"
              title={"Are you sure Delete ?"}
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                DeleteRoles(record?.id);
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

  return (
    <div>
      {contextHolder}
      {loading ? (
        "loading"
      ) : (
        <div style={{ marginTop: -15, borderLeft: "2px solid #e2e2e9" }}>
          <Row>
            <Col sm={9}>
              <Input
                placeholder="Search Roles"
                style={{ width: "100%" }}
                bordered={false}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </Col>
            <Col sm={3}>
              <Button onClick={() => setIsModal(true)} block type="primary">
                Add Roles
              </Button>
            </Col>
          </Row>
          <Table
            size="small"
            bordered
            dataSource={roles}
            columns={roleColumns}
            rowKey={(data: any) => data?.id}
            pagination={false}
          />
          <Modal
            title="Add Roles"
            open={isModal}
            width={500}
            onOk={() => console.log("onOk")}
            onCancel={() => setIsModal(false)}
            footer={false}
          >
            <Form form={form} onFinish={AddRoles}>
              <Form.Item
                name={"role"}
                rules={[
                  {
                    required: true,
                    message: "enter Role name",
                  },
                ]}
              >
                <Input placeholder="enter Role" />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={postLoading}
                  type="primary"
                  block
                  htmlType="submit"
                >
                  Add Roles
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default RolesTable;
