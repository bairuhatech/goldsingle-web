import React, { useContext, useState } from "react";
import { Button } from "antd";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsFillChatRightDotsFill, BsHandbag } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { BiHeart, BiSolidShareAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import OrderBulkModal from "./modal/bulkOrderModal";
import useToggle from "../../../shared/hook/useToggle";
import { storeCheckout } from "../../../redux/slices/checkoutSlice";
import { SingleProductContext } from "../singleProductContext";

const CartCard = () => {
  const data = useContext(SingleProductContext);
  const productInfo = data?.data;
  const addToCart = data?.addtoCart;
  const activeVariant = data?.activeVariant;
  const loadingCart = data?.loadingCart;
  const addWishlist = data?.addWishlist;
  const [quantity, setQuantity] = useState(1);
  const [openModal, toggleModal] = useToggle(false);
  const buyNow = () => {
    const obj = {
      name: productInfo?.name,
      buyPrice: activeVariant?.variant?.id
        ? activeVariant?.variant?.price
        : productInfo?.price,
      productId: productInfo?._id,
      quantity: quantity,
      storeId: productInfo?.store_id,
      totalPrice: Number(
        (activeVariant?.variant?.id
          ? activeVariant?.variant?.price
          : productInfo?.price) * quantity
      ),
      userId: User.data?._id,
      variantId: activeVariant?.variant?.id,
      image: activeVariant?.variant?.id
        ? activeVariant?.variant?.image
        : productInfo?.image,
      combination: activeVariant?.variant?.combination,
      storeName: productInfo?.storeDetails?.store_name,
    };
    dispatch(storeCheckout([obj]));
    navigate("/auth/checkout");
  };
  const handleIncrement: any = () => {
    setQuantity((quanti) => quanti + 1);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getQuantity = (quantity: number) => {
    setQuantity(quantity);
  };
  const Auth = useSelector((state: any) => state.User);
  const User = useSelector((state: any) => state.User.user);
  const Settings = useSelector((state: any) => state.Settings.Settings);
  const navigation = useNavigate();
  const handleDecrement: any = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="productDetails-cart-card">
      <div className="productDetails-flex productDetails-space-between">
        <div className="productDetails-counter-button">
          <Button
            type="primary"
            shape="circle"
            size="middle"
            icon={<AiOutlineMinus size={"10px"} />}
            onClick={handleDecrement}
            className="productDetails-counter-control"
            disabled={quantity === 0}
          />
          <span className="productDetails-count">{quantity}</span>
          <Button
            type="primary"
            size="middle"
            shape="circle"
            icon={<AiOutlinePlus size={"10px"} />}
            onClick={handleIncrement}
            className="productDetails-counter-control"
          />
        </div>

        <div className="productDetails-flex productDetails-v-center productDetails-h-center productDetails-p-6-12">
          <h6 className="productDetails-secondary-text productDetails-margin-h-6">
            Total Price:
          </h6>
          <h5 className="productDetails-margin-h-6 productDetails-txt-bold">
            {Settings.currency}{" "}
            {activeVariant?.status == true
              ? `${Number(activeVariant?.variant?.price) * quantity}`
              : `${Number(productInfo?.price) * quantity}`}
          </h5>
        </div>
      </div>
      <div className="productDetails-flex" style={{ marginTop: 30 }}>
        <Button
          type="primary"
          className="productDetails-cart-btn productDetails-margin-h-6"
          onClick={() => {
            if (Auth.auth) {
              buyNow();
            } else {
              navigation("/login");
            }
          }}
        >
          Buy now
        </Button>
        <Button
          type="default"
          className="productDetails-cart-btn productDetails-margin-h-6"
          icon={<BsHandbag />}
          onClick={() => {
            if (Auth.auth) {
              if (typeof addToCart === "function") {
                addToCart(productInfo, quantity);
              }
            } else {
              navigation("/login");
            }
          }}
          loading={loadingCart}
        >
          Add to cart
        </Button>
      </div>
      <div
        className="productDetails-flex productDetails-space-between"
        style={{ marginTop: 15 }}
      >
        <Button
          type="text"
          className="productDetails-cart-btn productDetails-margin-h-6"
          icon={<BiHeart />}
          onClick={() => {
            if (typeof addWishlist == "function") addWishlist(productInfo);
          }}
        >
          Add Favorites
        </Button>
        {productInfo?.bulk_order == true ? (
          <Button
            type="primary"
            className="productDetails-cart-btn productDetails-margin-h-6"
            onClick={() => {
              toggleModal(true);
            }}
          >
            Bulk Order
          </Button>
        ) : null}
      </div>
      <div
        className="productDetails-flex productDetails-space-between"
        style={{ marginTop: 15 }}
      >
        <Button
          type="text"
          icon={<BsFillChatRightDotsFill />}
          className="productDetails-text-btn1"
        >
          Chat Seller
        </Button>

        <Button
          type="text"
          icon={<BiSolidShareAlt />}
          className="productDetails-text-btn1"
        >
          Share Product
        </Button>
      </div>
      <OrderBulkModal
        open={openModal}
        modalClose={() => toggleModal(false)}
        setQuantity={getQuantity}
      />
    </div>
  );
};

export default CartCard;
