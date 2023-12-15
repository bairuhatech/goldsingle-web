import { Col, Container, Row } from "react-bootstrap";
import MenuFooter from "./components/menuFooter";
import UserTable from "./components/UserTable";
import RolesTable from "./components/RolesTable";

import API from "../../config/API";
import { GET, POST, PUT } from "../../utils/apiCalls";
import { useEffect, useState } from "react";
import React from "react";

const UserConfig = () => {
  const [selectedUser, setSelectedUser] = useState<any>();
  const [selectedRole, setSelectedRole] = useState<any>();
  const [updateLoading, setUpdateLoading] = useState(false);

  const Update = async () => {
    try {
      setUpdateLoading(true);
      let url = API.USER_COINFIG_UPDATE + selectedUser?._id;
      let obj = {
        role_id: selectedRole?.id,
        store_id: selectedRole?.store_id,
        role: selectedRole.name,
      };
      let updateRolesConfig: any = await PUT(url, obj);
    } catch (err) {
      console.log("err = = = = >", err);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div>
      <Row>
        <Col md={6}>
          <UserTable
            value={"riyas"}
            selectedUser={(user: any) => setSelectedUser(user)}
            onChange={(val: any) => console.log("onChange", val)}
          />
        </Col>
        <Col md={6}>
          <RolesTable
            value={"riyas"}
            selectedRole={(role: any) => setSelectedRole(role)}
            onChange={(val: any) => console.log("onChange", val)}
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md={12}>
          <MenuFooter
            cancel={() => console.log("cancel")}
            save={() => Update()}
            isLoading={updateLoading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default UserConfig;
