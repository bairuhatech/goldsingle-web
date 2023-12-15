import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function ProceedToNextStep(props: any) {
  const Checkout = useSelector((state: any) => state.Checkout);
  return (
    <div className="p-3 rounded">
      <div className="CartScreen-txt1">
        Price Details ({Checkout?.Checkout?.length} items)
      </div>
      <hr className="mt-0" />
      <div className="CartScreen-row cart-text-small">
        <div>Total Product Price</div>
        <div>₹ {props?.totalprice}$</div>
      </div>

      <div className="CartScreen-row cart-text-small">
        <div>Delivery Charges</div>
        <div className="text-success">FREE</div>
      </div>

      <div className="devider" style={{ marginTop: 8 }} />
      <div className="CartScreen-row">
        <div>
          <b>Total Payable</b>
        </div>
        <div>
          <b> {props?.totalprice}$</b>
        </div>
      </div>
      <div className="CartScreen-txt3">
        Note: Delivery charges will be calculated in the next step
      </div>
      <br />

      <div className="CartScreen-footerDesk">
        <Button
          block
          type="primary"
          size="large"
          onClick={() => props?.moveForward()}
          loading={props?.loading}
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
}

export default ProceedToNextStep;
