import React, { useEffect, useState } from "react";
import EmptyCart from "./components/emptyCart";
import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "./components/cartItemCard";
import { Col, Row } from "react-bootstrap";
import "./styles.scss";
import ProceedCart from "./components/proceedCart";
import API from "../../config/API";
import { DELETE, GET, PUT } from "../../utils/apiCalls";
import { storeCart } from "../../redux/slices/cartSlice";
import { message } from "antd";
import ApplayCoupan from "./components/modal/applyCouponModal";
import useToggle from "../../shared/hook/useToggle";
import { Link } from "react-router-dom";

const CartScreen = () => {
  const Cart = useSelector((state: any) => state.Cart);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [messageApi, contextHolder] = message.useMessage();
  const User = useSelector((state: any) => state.User.user);
  const dispatch = useDispatch();
  const [couponModal, toggleCouponModal] = useToggle(false);
  const getTotalPrice = () => {
    //calculating total price of cart items
    let total = 0;
    Cart.items?.forEach((item: any) => {
      total += item?.quantity * item?.buyPrice;
    });
    setTotalPrice(total);
  };
  const removeItemFromCart = async (id: number, item: any) => {
    //function to remove item from cart
    const url = API.CART + id;
    try {
      const cartItems: any = await DELETE(url);
      if (cartItems.status) {
        loadCartItems();
        messageApi.success(
          `You have removed ${item?.productDetails?.name} from cart`
        );
      }
    } catch (err) {
      messageApi.error("Failed to Update cart");
    }
  };
  const updateProductQuantity = async (quantity: number, item: any) => {
    //function to increment or decrement products in cart
    const obj = {
      quantity: quantity,
      price: item?.buyPrice,
      userId: User.data._id,
    };
    const url = API.CART + item?.id;
    try {
      const cartItems: any = await PUT(url, obj);
      if (cartItems.status) {
        loadCartItems();
        messageApi.success(
          `You have changed ${item?.productDetails?.name} quantity to ${quantity}`
        );
      } else {
        messageApi.error("Something went wrong!");
      }
    } catch (err) {
      messageApi.error("Failed to Update cart");
    } finally {
    }
  };
  const loadCartItems = async () => {
    if (User.data?._id) {
      //if user is signed in
      try {
        const url = API.CART_GET + `${User.data?._id}`;
        const cartItems: any = await GET(url, null);
        if (cartItems.status) {
          dispatch(storeCart(cartItems.data));
        }
      } catch (err) {
        messageApi.error(`Something went wrong. please try again`);
      }
    }
  };
  useEffect(() => {
    getTotalPrice();
  }, [Cart]);
  useEffect(() => {
    loadCartItems();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="Screen-box">
      {contextHolder}
      <br /> <br />
      <h2 className="my-md-4 mb-3 cart-title ps-2">Your Cart</h2>
      <Row className="px-2">
        <Col className="cart-text-small">
          <Link to={"/"} style={{ color: "black" }}>
            Continue Shopping
          </Link>
        </Col>
        <Col className="text-center fw-bold cart-text-small">
          {Cart.items.length} Items
        </Col>
        <Col className="text-end cart-text-small">Need help?</Col>
      </Row>
      <hr className="mt-0" />
      {Cart.items.length ? (
        <Row className="my-3 gy-3">
          <Col md="8">
            <div>
              {Cart.items.map((item: any, index: number) => (
                <CartItemCard
                  key={index}
                  data={item}
                  removeItem={removeItemFromCart}
                  updateProduct={updateProductQuantity}
                />
              ))}
            </div>
          </Col>
          <Col md="4">
            <ProceedCart
              cart={Cart}
              totalprice={totalPrice}
              checkCoupan={() => toggleCouponModal(true)}
            />
          </Col>
        </Row>
      ) : (
        <EmptyCart />
      )}
      <ApplayCoupan
        visible={couponModal}
        close={() => toggleCouponModal(false)}
      />
    </div>
  );
};

export default CartScreen;
