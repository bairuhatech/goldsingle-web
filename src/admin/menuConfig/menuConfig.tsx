import { Col, Row } from "react-bootstrap";
import { Checkbox } from "antd";
import { useState } from "react";
import MenuFooter from "./components/menuFooter";
import MenusTables from "./components/MenusTables";
import RolesTable from "./components/RolesTable";
import { POST } from "../../utils/apiCalls";
import API from "../../config/API";
import React from "react";

const MenuConfig = () => {
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [updateLoading, setUpdateLoading] = useState<any>(false);

  const Update = async () => {
    try {
      setUpdateLoading(true);
      let url = API.ROLE_ASSIGN_MENU;
      let obj = {
        role_id: Number(selectedRole?.id),
        store_id: Number(selectedRole?.store_id),
        menu: selectedMenu,
      };

      let updateRolesConfig: any = await POST(url, obj);
    } catch (err) {
      console.log("err = = = = >", err);
    } finally {
      setUpdateLoading(false);
    }
  };
  return (
    <>
      <Row>
        <Col md={6}>
          <RolesTable
            value={selectedRole}
            selectedRole={(role: any) => setSelectedRole(role)}
            onChange={(val: any) => console.log("onChange", val)}
          />
        </Col>
        <Col md={6}>
          <MenusTables
            selectedMenu={(menu: any) => setSelectedMenu(menu)}
            onChange={(val: any) => console.log("onChange", val)}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={12}>
          <MenuFooter
            cancel={() => console.log("cancel")}
            save={() => Update()}
            isLoading={updateLoading}
          />
        </Col>
      </Row>
    </>
  );
};

export default MenuConfig;
