import React, { useEffect, useState } from "react";
import EmptyOrders from "../components/emptyOrders";
import NoData from "../../../components/noData";
import { FaBoxOpen } from "react-icons/fa";
import Loading from "../../../components/loading";
import { BsFillBookmarkFill } from "react-icons/bs";
import WishListDataTable from "../components/wishlistDataTable";
import API from "../../../config/API";
import { useSelector } from "react-redux";
import { DELETE, GET } from "../../../utils/apiCalls";
import PageHeader from "../../../admin/components/PageHeader";
import { message } from "antd";

const ProfileFavourites = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any>();
  const User = useSelector((state: any) => state.User.user);
  const [messageApi, contextHolder] = message.useMessage();
  const [meta, setMeta] = useState<any>({});
  const [page, setPage] = useState(1);
  const pageSize = 10;
  useEffect(() => {
    getFavourites();
  }, []);
  const getFavourites = async (currPage: number = page) => {
    const url =
      API.WISHLIST +
      `all?userId=${User.data._id}&order=ASC&page=${currPage}&take=${pageSize}`;
    setIsLoading(true);
    try {
      const favorites: any = await GET(url, null);
      if (favorites.status) {
        setOrders(favorites?.data);
        setMeta(favorites?.meta);
      }else{throw new Error(favorites.message)}
    } catch (err) {
      messageApi.error(`Failed to get Favorites.`);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteItem = async (item: any) => {
    const url = API.WISHLIST + item?.id;
    try {
      const deleted: any = await DELETE(url);
      if (deleted.status) {
        getFavourites(page);
        messageApi.success(`Item removed from wishlist.`);
      }
    } catch (err) {
      messageApi.error(`something went wrong!`);
    }
  };
  const changePage = async (page: number) => {
    window.scrollTo(0, 0);
    await getFavourites(page);
    setPage(page);
  };
  return (
    <>
      <div className="mb-3">
        {/* <PageHeader title="Wishlist"></PageHeader> */}
        {contextHolder}
        {isLoading ? (
          <Loading />
        ) : orders && orders.length ? (
          <WishListDataTable
            data={orders}
            delete={deleteItem}
            meta={meta}
            pageSize={pageSize}
            page={page}
            changePage={changePage}
          />
        ) : (
          <NoData
            icon={<BsFillBookmarkFill size={70} color="#e6e6e6" />}
            header="No Favorites"
            text1={`You have no items in your favourites`}
          />
        )}
      </div>
    </>
  );
};

export default ProfileFavourites;
