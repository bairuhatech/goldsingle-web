import { Button, Space } from "antd";
import React from "react";
const MenuFooter = (props: any) => {
  return (
    <div className="MenuFooter-container">
      <Space>
        <Button block size="large" onClick={() => props.cancel()}>
          Cancel
        </Button>
        <Button
          loading={props?.isLoading}
          type="primary"
          size="large"
          onClick={() => props.save()}
        >
          Save Settings
        </Button>
      </Space>
    </div>
  );
};

export default MenuFooter;
