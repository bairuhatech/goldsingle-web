import { Card, Steps } from "antd";
import moment from "moment";
import React from "react";

const { Step } = Steps;

function OrderStatusCard(props: any) {
  return (
    <div>
      <Card bordered={false}>
        <div>
          <h5>Order Status</h5>
          {Array.isArray(props?.data?.orderStatus) == true ? (
            <Steps
              direction="vertical"
              current={props?.data?.orderStatus?.length}
            >
              {props?.data?.orderStatus.map(
                (statusUpdate: any, index: number) => (
                  <Step
                    key={index}
                    title={statusUpdate.status}
                    description={
                      <>
                      <div>
                        {moment(statusUpdate.createdAt).format("DD/MM/YYYY")}
                      </div>
                      <div>{statusUpdate.remark}</div>
                  </>
                    }
                  />
                )
              )}
            </Steps>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

export default OrderStatusCard;
