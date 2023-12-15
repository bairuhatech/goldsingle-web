import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Popover,
  Table,
  notification,
} from "antd";
import API from "../../../config/API";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GET, POST } from "../../../utils/apiCalls";
import React from "react";
const UserTable = (props: any) => {
  const [form] = Form.useForm();
  const [Notifications, contextHolder] = notification.useNotification();
  const [loading, setloading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [inviteLoad, setInviteLoad] = useState(false);
  const [users, setUsers] = useState<[]>([]);
  const [checked, setChecked] = useState<any>();
  const [searchName, setSearchName] = useState<any>("");

  useEffect(() => {
    LoadUsers();
  }, [searchName]);

  const LoadUsers = async () => {
    try {
      let url = API.USER_CONFIG_USERS + `?name=${searchName}`;
      let loadUsers: any = await GET(url, null);
      setUsers(loadUsers);
      setloading(false);
    } catch (err) {
      setloading(false);
    }
  };

  const InviteUser = async (values: any) => {
    try {
      setInviteLoad(true);
      let url = API.USER_CONFIG_INVITE_MAIL;
      let mailObj = {
        email: values?.email,
      };
      let inviteUser: any = await POST(url, mailObj);
    } catch (error) {
    } finally {
      ResetForm();
      setInviteLoad(false);
      setIsModal(false);
    }
  };

  const ResetForm = () => {
    form.resetFields();
  };

  const userColumns = [
    {
      title: "",
      dataIndex: "",
      key: "",
      width: "7%",
      render: (text: any, record: any) => {
        return (
          <Checkbox
            checked={record?._id === checked}
            onChange={(val: any) => {
              if (checked) {
                setChecked(null);
              }
              if (val?.target?.checked === true) {
                setChecked(record._id);
              }
              props?.selectedUser(record);
            }}
          />
        );
      },
    },
    {
      title: "Users",
      dataIndex: `first_name`,
      key: "_id",
      width: "93%",
    },
  ];

  return (
    <div>
      {loading ? (
        "loading"
      ) : (
        <div style={{ marginTop: -15, borderLeft: "2px solid #e2e2e9" }}>
          <Row>
            <Col sm={9}>
              <Input
                placeholder="Search Users"
                style={{ width: "100%" }}
                bordered={false}
                onChange={(e: any) => setSearchName(e.target.value)}
              />
            </Col>
            <Col sm={3}>
              <Button onClick={() => setIsModal(true)} block type="primary">
                Invite Users
              </Button>
            </Col>
          </Row>
          <Table
            size="small"
            bordered
            dataSource={users}
            columns={userColumns}
            rowKey={(data: any) => data?.id}
            pagination={false}
            scroll={{ y: 200, x: "100%" }}
          />
          <Modal
            title="Invite Users"
            open={isModal}
            onOk={() => console.log("onOk")}
            onCancel={() => setIsModal(false)}
            width={500}
            footer={false}
          >
            <Form form={form} onFinish={InviteUser}>
              <Form.Item
                name={"email"}
                rules={[
                  {
                    required: true,
                    message: "enter email",
                  },
                ]}
              >
                <Input placeholder="enter email" />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={inviteLoad}
                  type="primary"
                  block
                  htmlType="submit"
                >
                  invite
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default UserTable;
