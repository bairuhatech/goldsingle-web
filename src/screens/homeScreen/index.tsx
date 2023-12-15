import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";

import { storeCategory } from "../../redux/slices/categorySlice";
import API from "../../config/API";
import { GET } from "../../utils/apiCalls";

import Loader from "./components/laoder";
import Banners from "./components/banners";
import Offers from "./components/offers";
import PopularItems from "./components/popularItems";
import useFetch from "../../shared/hook/fetchData";
import Loading from "../../components/loading";
import { storeCart } from "../../redux/slices/cartSlice";
import SubCategoryList from "./components/subCategoryList";
import { storeSettings } from "../../redux/slices/settingsSlice";
import categories from "../../admin/categories";
import SEO from "../../components/seo";
import React from "react";
import { message } from "antd";
import ContentTwo from "./components/ContentTwo";

function HomeSCreen() {
  const User = useSelector((state: any) => state.User.user);
  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const Category = useSelector((state: any) => state.Category.categries);
  const [isLoading, setIsLoading] = useState(true);
  const [subCategories, setSubcategories] = useState<any[]>([]);
  const [Banner, setBanners] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const {
    data: products,
    isLoading: loading,
    error,
  } = useFetch(API.PRODUCTS, true, 30);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      loadBanners();
      loadCartItems();
      getBanners();
      getSettings();
      //here we need to call cart itms and save it to redux
    }
  }, []);

  const getAllSubcategories = async () => {
    const subcategories: any[] = [];
    const category_subcategory: string[] = [];
    Category?.forEach((item: any) => {
      category_subcategory.push(item.name);
      item?.sub_categories?.forEach((item: any) => {
        subcategories.push(item);
        category_subcategory.push(item.name);
      });
    });
    setSubcategories(subcategories);
  };
  const loadBanners = async () => {
    try {
      let response: any = await GET(API.CATEGORY, null);
      if (response?.status) {
        let data = response.data;
        // setBanners(data.banners);
        if (response?.data?.length) {
          dispatch(storeCategory(response?.data));
        }
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
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
  const getBanners = async () => {
    const url = API.GET_HOMESCREEN;
    try {
      const banners: any = await GET(url, null);
      if (banners.status) {
        setBanners(banners.data);
      }
    } catch (err) {}
  };
  const getSettings = async () => {
    const url = API.SETTINGS;
    try {
      const settings: any = await GET(url, null);
      if (settings.status) {
        dispatch(storeSettings(settings.data));
      }
    } catch (err) {}
  };
  useMemo(() => {
    getAllSubcategories();
  }, [Category]);
  return (
    <div className="Screen-box">
      {contextHolder}
      <SEO
        title="GOLD BAZAR"
        description="GOLD BAZAR! The leading powerhouse retailer of UAE"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ContentTwo />
          <Banners data={Banner} />
          <SubCategoryList data={subCategories} />

          {/* <Offers data={[1]} /> */}
          {loading ? (
            <Loading />
          ) : error ? (
            <div>Error occured</div>
          ) : (
            <PopularItems data={products?.slice(0, 8)} title="Trending Now" />
          )}
          <br />
          {loading ? (
            <Loading />
          ) : (
            <PopularItems data={products?.slice(18, 29)} title="Top Products" />
          )}
        </>
      )}

      <br />
    </div>
  );
}
export default HomeSCreen;
