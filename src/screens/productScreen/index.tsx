import React, { useEffect, useState } from "react";
import { SingleProductContext } from "./singleProductContext";

import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import useFetch from "../../shared/hook/fetchData";
import API from "../../config/API";
import ProductCard from "./components/productCard";
import Loading from "../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import { DELETE, GET, POST } from "../../utils/apiCalls";
import { message, notification } from "antd";
import { storeCart } from "../../redux/slices/cartSlice";
import AddReview from "./components/modal/addReviewModal";
import useToggle from "../../shared/hook/useToggle";
import {
  getInitialVarient,
  getSelectedVariant,
  getVarients,
} from "./components/functions";
import useDidUpdateEffect from "../../shared/hook/useDidUpdate";
const reviewPageSize = 10;
const getCategoryId = (cid: any): string => {
  try {
    return window.atob(String(cid));
  } catch (err) {
    return "0";
  }
};
type variantType = {
  status: boolean;
  variant: any;
};
function ProductPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const productId = getCategoryId(searchParams.get("pid"));
  const User = useSelector((state: any) => state.User.user);
  const Auth = useSelector((state: any) => state.User);
  // const [Notifications, contextHolder] = notification.useNotification();
  const [messageApi, contextHolder] = message.useMessage();
  const [loadingCart, setLoadingCart] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [showFav, setShowFav] = useState<boolean>(false);
  const [openReview, toggleReview] = useToggle(false);
  const [reviews, setReviews] = useState([]);
  const [reviewMeta, setReviewMeta] = useState<any>({});
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [variants, setVariants] = useState<any>({});
  const [selectedVariant, setSelectedVariant] = useState<any[]>([]);
  const [activeVariant, setActiveVariant] = useState<variantType>({
    status: false,
    variant: {},
  });
  const fetchProductDetails = async () => {
    const url = API.PRODUCTS_GETONE + productId;
    try {
      const response: any = await GET(url, null);
      console.log(response)
      if (response.status) {
        setData(response.data);
        const variantTypes: any = getVarients(response?.data); //getting all variant types and their values
        setVariants(variantTypes);
        const obj: any = getInitialVarient(variantTypes?.variants); //to get the default variant.
        setSelectedVariant(obj);
        const activeVarien: any = getSelectedVariant(
          obj,
          response.data?.productVariant
        );
        setActiveVariant(activeVarien);
      }
    } catch (err) {
      setData([]);
      messageApi.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  const OpenLink = (link: any) => {
    if (Auth.auth) {
      navigation(link);
    } else {
      navigation("/login");
    }
  };
  const addToCart = async (item: any, quantity: number) => {
    //if there is an active variant it's price will be added to cart.
    const obj = {
      productId: Number(productId),
      userId: User.data?._id,
      quantity: quantity,
      price: activeVariant.variant?.id
        ? activeVariant.variant?.price
        : item?.price,
      storeId: Number(item?.store_id),
      variantId: activeVariant.variant?.id,
      image: activeVariant.variant?.id
        ? activeVariant.variant?.image
        : item?.image,
      name: item?.name,
      combination: activeVariant.variant?.id
        ? activeVariant?.variant?.combination
        : null,
    };
    const url = API.CART;
    try {
      setLoadingCart(true);
      const newCart: any = await POST(url, obj);
      if (newCart.status) {
        messageApi.success("Successfully added to cart");
        loadCartItems();
        setTimeout(() => {
          OpenLink("/auth/cart");
        }, 1000);
      }
    } catch (err: any) {
      messageApi.error("Something went wrong!");
    } finally {
      setLoadingCart(false);
    }
  };
  const addWishlist = async (item: any) => {
    const obj = {
      userId: User.data?._id,
      productId: productId,
      description: data?.description,
      image: data?.image,
      buyPrice: data?.price,
      sellerId: 44,
      name: data?.name,
    };
    const url = API.WISHLIST;
    try {
      const created: any = await POST(url, obj);
      if (created.status) {
        messageApi.success(created?.message);
      }
    } catch (err) {
      messageApi.error("Something went wrong!");
    }
  };
  const getReviews = async (page: number = reviewPage) => {
    const url =
      API.PRODUCT_REVIEW +
      `review?productId=${productId}&order=DESC&page=${page}&take=${reviewPageSize}`;
    setReviewLoading(true);
    try {
      const reviews: any = await GET(url, null);
      if (reviews?.status) {
        setReviews(reviews?.data);
        setReviewMeta(reviews?.meta);
      }
    } catch (err) {
    } finally {
      setReviewLoading(false);
    }
  };
  const deleteReview = async (item: any) => {
    const url = API.PRODUCT_REVIEW + `${item?._id}`;
    if (item?.user_id === User.data?._id) {
      try {
        const response: any = await DELETE(url);
        if (response?.status) {
          messageApi.success("Review Deleted");
          getReviews();
        }
      } catch (err) {
        messageApi.error("Something went wrong");
      }
    }
  };
  const getReviewPage = async (page: number) => {
    window.scrollTo(0, 0);
    await getReviews(page);
    setReviewPage(page);
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
    window.scrollTo(0, 0);
    fetchProductDetails();
    getReviews();
  }, []);
  useDidUpdateEffect(() => {
    fetchProductDetails();
    getReviews();
    window.scrollTo(0, 0);
  }, [productId]);
  useEffect(() => {
    const selectedVar = getSelectedVariant(
      selectedVariant,
      data?.productVariant
    );
    setActiveVariant(selectedVar);
  }, [selectedVariant]);

  return (
    <div className="Screen-box">
      {contextHolder}
      {isLoading ? (
        <Loading />
      ) : (
        <SingleProductContext.Provider
          value={{
            data: data,
            addtoCart: addToCart,
            loadingCart: loadingCart,
            addWishlist: addWishlist,
            favorite: showFav,
            openReview: () => toggleReview(true),
            reviews: reviews,
            deleteReview: deleteReview,
            reviewMeta: reviewMeta,
            reviewPage: reviewPage,
            reviewPageSize: reviewPageSize,
            getReviewPage: getReviewPage,
            reviewLoading: reviewLoading,
            variants: variants,
            selectedVariant: selectedVariant,
            setSelectedVariant: setSelectedVariant,
            activeVariant: activeVariant,
          }}
        >
          <ProductCard />
        </SingleProductContext.Provider>
      )}
      <AddReview
        visible={openReview}
        close={() => toggleReview(false)}
        data={data}
        getReviews={getReviews}
      />
    </div>
  );
}
export default ProductPage;
