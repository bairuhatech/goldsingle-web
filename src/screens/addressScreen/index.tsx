import React, { useEffect, useState } from "react";
import "./style.scss";
import { Col, Row } from "react-bootstrap";
import API from "../../config/API";
import { GET, POST } from "../../utils/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import ProceedToNextStep from "./components/proceedCard";
import Step1 from "./components/step1";
import Step3 from "./components/step3";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { storeCart } from "../../redux/slices/cartSlice";
import Step2 from "./components/step2";
import { clearCheckout } from "../../redux/slices/checkoutSlice";
const paymentOptions = [
  { name: "Credit Card Payment" },
  { name: "Pay on Delivery" },
  { name: "Cash on Delivery" },
  { name: "NetBanking" },
];

function AddressScreen() {
  const [messageApi, contextHolder] = message.useMessage();
  const User = useSelector((state: any) => state.User.user);
  const Cart = useSelector((state: any) => state.Cart);
  const [address, setAddress] = useState([]);
  const [adressLoading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<any>({});
  const [selectedPayment, setSelectedPayment] = useState<any>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderLoading, setOrderLoading] = useState(false);
  const Checkout = useSelector((state: any) => state.Checkout);

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const getAddress = async () => {
    const url = API.ADDRESS_GET + User.data._id;
    try {
      const response: any = await GET(url, null);
      if (response.status) {
        setAddress(response.data);
      }
    } catch (err) {
      messageApi.error(`Failed to get Address Info.`);
      setAddress([]);
    } finally {
      setLoading(false);
    }
  };

  const getTotalPrice = () => {
    //calculating total price of cart items
    let total = 0;
    Checkout?.Checkout?.forEach((item: any) => {
      total += item?.quantity * item?.buyPrice;
    });
    setTotalPrice(total);
  };

  const getPaymentMethod = (method: any) => {
    if (selectedPayment.name == method.name) {
      setSelectedPayment({});
    } else if (selectedPayment.name != method.name) {
      setSelectedPayment(method);
    }
  };

  const getSelectedAddress = (address: any) => {
    if (selectedAddress.id == address.id) {
      setSelectedAddress({});
    } else if (selectedAddress.id != address.id) {
      setSelectedAddress(address);
    }
  };

  const moveToPayment = () => {
    if (selectedAddress.id) {
      setStep((step) => step + 1);
    } else {
      messageApi.warning(`Please Select Address`);
    }
  };

  const moveToOrder = () => {
    if (selectedPayment.name) {
      //creating order ...................................
      createOrder();
    } else {
      messageApi.warning(`Please Select Payment Option`);
    }
  };

  const moveToSummary = () => {
    setStep(step + 1);
  };
  const createOrder = async () => {
    const url = API.ORDER;
    const obj = {
      user: User?.data,
      payment: selectedPayment,
      cart: Checkout?.Checkout,
      address: selectedAddress,
    };
    setOrderLoading(true);
    try {
      const response: any = await POST(url, obj);
      if (response.status) {
        messageApi.success(`Order placed successfully`);
        await loadCartItems();
        setTimeout(() => {
          dispatch(clearCheckout([]));
          navigation("/profile/orders");
        }, 1000);
      } else {
        throw new Error(response.message);
      }
    } catch (err: any) {
      messageApi.error(`Failed to Place your order.`);
    } finally {
      setOrderLoading(false);
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
    getAddress();
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="Screen-box">
      {contextHolder}
      <Row className="my-3 mx-0">
        <Col md="8">
          {step == 1 ? (
            <Step1
              loading={adressLoading}
              address={address}
              getSelectedAddress={getSelectedAddress}
              selectedAddress={selectedAddress}
              totalPrice={totalPrice}
              fetchAddress={getAddress}
            />
          ) : step == 2 ? (
            <Step2
              User={User}
              selectedAddress={selectedAddress}
              goBack={() => setStep((step) => step - 1)}
            />
          ) : step == 3 ? (
            <Step3
              totalPrice={totalPrice}
              goBack={() => setStep(1)}
              paymentOptions={paymentOptions}
              selectPayment={getPaymentMethod}
              selectedPayment={selectedPayment}
              User={User}
              selectedAddress={selectedAddress}
              previous={() => setStep((step) => step - 1)}
            />
          ) : null}
        </Col>
        <Col md="4">
          <ProceedToNextStep
            cart={Cart}
            totalprice={totalPrice}
            moveForward={
              step == 1
                ? moveToPayment
                : step == 2
                ? moveToSummary
                : step == 3
                ? moveToOrder
                : () => {}
            }
            moveBack={() => setStep(step - 1)}
            loading={orderLoading}
          />
        </Col>
      </Row>
    </div>
  );
}

export default AddressScreen;
