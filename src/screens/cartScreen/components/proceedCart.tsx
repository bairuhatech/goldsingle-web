import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { storeCheckout } from "../../../redux/slices/checkoutSlice";

function ProceedCart(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="p-3 rounded">
      <div className="CartScreen-txt1">
        Price Details ({props?.cart?.items?.length} items)
      </div>
      <hr className="mt-0" />
      <div className="CartScreen-row cart-text-small">
        <div>Total Product Price</div>
        <div>₹ {props?.totalprice}$</div>
      </div>

      <div className="CartScreen-row cart-text-small">
        <div>Delivery Charges</div>
        <div>0$</div>
      </div>

      <div className="CartScreen-row cart-text-small">
        <div>Discount</div>
        <div>10%</div>
      </div>

      <div className="devider" style={{ marginTop: 8 }} />
      <div className="CartScreen-row">
        <div>
          <b>Total</b>
        </div>
        <div>
          <b> {props?.totalprice}$</b>
        </div>
      </div>
      <div className="CartScreen-txt3">
        Note: Delivery charges will be calculated in the next step
      </div>
      <br />
      <div className="CartScreen-row">
        <div>
          <b>Coupons</b>
        </div>
        <div
          className="CartScreen-rowButton"
          onClick={() => props.checkCoupan()}
        >
          Apply Coupon
        </div>
      </div>

      <br />
      <div className="CartScreen-footerDesk">
        <Button
          block
          type="primary"
          size="large"
          onClick={() => {
            navigate("/auth/checkout");
            //now we are adding all items iin cart to checkout section
            dispatch(storeCheckout(props?.cart?.items));
          }}
        >
          PLACE ORDER
        </Button>
      </div>
    </div>
  );
}
export default ProceedCart;
