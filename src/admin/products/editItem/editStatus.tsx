import { Alert, Avatar, Button, Card, Popconfirm, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

function UpdateProductStatus(props: any) {
  return (
    <div style={{ minHeight: "64vh" }}>
      <div>
        <Alert
          description={
            <div>
              You Can Either set status of the product to Active or Inactive.{" "}
              <br />
              <b>What does Active Means?</b>
              <br />
              If the product is in Active state it will be available to the
              users and everyone who visits Gold Bazar can see it. A user can add
              the Item to his Cart and also Order the product.
              <br />
              <b>What does Inactive means</b>
              <br />
              If A Product is Inactive it means the Product won't be Listed in
              Gold Bazar No users can see the product. hence no one can buy or add
              it to cart. An inactive Product can only be seen by the respective
              store owners. If you want you can reactivate the product. <br />
              <b>NB: </b>Activating an Inactivating the product will also
              affect status of it's Variants
              {/* <img src={VariationImg} style={{ width: 400 }} /> */}
            </div>
          }
          type="warning"
          closable
        />
      </div>
      <Card
        // cover={
        //   <div>fdff</div>
        // }
        style={{ marginTop: "20px" }}
        actions={[
          <div>
            {props?.data?.status == true ? (
              <Popconfirm
                placement="bottomRight"
                title={"Are You sure to Deactivate the product?"}
                okText="Yes"
                cancelText="No"
                onConfirm={async () => {
                  await props?.updateProductStatus(false);
                }}
              >
                <Button type="primary" danger className="px-4">
                  Inactivate Product
                </Button>
              </Popconfirm>
            ) : props?.data?.status == false ? (
              <Popconfirm
                placement="bottomRight"
                title={"Are You sure to Activate the product?"}
                okText="Yes"
                cancelText="No"
                onConfirm={async () => {
                  await props?.updateProductStatus(true);
                }}
              >
                <Button type="primary" className="px-4 bg-success">
                  Activate Product
                </Button>
              </Popconfirm>
            ) : null}
          </div>,
        ]}
      >
        <Meta
          avatar={<Avatar src={props?.data?.image} shape="square" size={50} />}
          title={props?.data?.name}
          description={`${props?.data?.description}`}
        />
      </Card>
    </div>
  );
}

export default UpdateProductStatus;
