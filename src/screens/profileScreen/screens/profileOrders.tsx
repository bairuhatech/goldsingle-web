import React, { useEffect, useState } from "react";
import EmptyOrders from "../components/emptyOrders";
import NoData from "../../../components/noData";
import { FaBoxOpen } from "react-icons/fa";
import Loading from "../../../components/loading";
import { Avatar, List, Pagination, Skeleton, Tag, message } from "antd";
import API from "../../../config/API";
import { useSelector } from "react-redux";
import { GET } from "../../../utils/apiCalls";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import moment from "moment";

const ProfileOrders = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any[]>([]);
  const User = useSelector((state: any) => state.User.user.data);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [meta, setMeta] = useState<any>({});
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const getOrders = async (current: number) => {
    try {
      const url =
        API.ORDER_GET +
        User._id +
        `?order=DESC&page=${current}&take=${pageSize}`;
      const response: any = await GET(url, null);
      if (response.status) {
        setOrders(response.data);
        setMeta(response?.meta);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      messageApi.error(`Failed to get your Orders.`);
    } finally {
      setIsLoading(false);
    }
  };
  const getVariantInfo = (data: any) => {
    let variantss = "";
    if (Array.isArray(data?.combination) == true) {
      data?.combination.map((item: any) => {
        variantss += `${item.value} `;
      });
    }
    return variantss;
  };
  const changePage = async (page: number) => {
    await getOrders(page);
    setPage(page);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    getOrders(1);
  }, []);
  return (
    <>
      <div>
        {contextHolder}
        {isLoading ? (
          <Loading />
        ) : orders && orders.length ? (
          <List
            className="demo-loadmore-list"
            loading={isLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={orders}
            size="small"
            header={<h3>{"Your Orders"}</h3>}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <div
                    onClick={() => navigate(`/profile/orders/${item?.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <AiOutlineEye cursor="pointer" size={25} color="#a10244" />
                  </div>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <span className="fw-bold">
                      {item?.storeDetails?.store_name}
                    </span>
                  }
                  description={
                    <div className="ms-3">
                      {Array.isArray(item?.orderItems) == true
                        ? item?.orderItems.map((item: any, index: number) => (
                            <List.Item.Meta
                              key={index}
                              className="mt-2"
                              avatar={
                                <Avatar
                                  shape="square"
                                  src={item?.image}
                                  size={"large"}
                                />
                              }
                              title={
                                <>
                                  <div>{`${item?.name} ${getVariantInfo(
                                    item?.variantDetails
                                  )} (${item.quantity} item)`}</div>
                                  <div>
                                    <span>Ordered on:</span>
                                    <span className="text-success">{` ${moment(
                                      item.createdAt
                                    ).format("DD/MM/YYYY")}`}</span>
                                  </div>
                                </>
                              }
                            />
                          ))
                        : "false"}
                    </div>
                  }
                />
                <Tag bordered={false}>{item?.status}</Tag>
              </List.Item>
            )}
          ></List>
        ) : (
          <NoData
            icon={<FaBoxOpen size={70} color="#e6e6e6" />}
            header="No Orders Yet!!"
            text1={`You have no orders. Please start shopping at Next ME and place orders`}
            button={"START SHOPPING NOW"}
            onclick={()=>navigate('/')}
          />
        )}
        <div className="d-flex justify-content-end mt-3">
          <Pagination
            current={page || 1}
            pageSize={pageSize || 10}
            total={meta?.itemCount || 0}
            defaultCurrent={1}
            responsive={true}
            defaultPageSize={pageSize || 10}
            disabled={false}
            hideOnSinglePage={true}
            onChange={(current: any, size: any) => {
              changePage(current);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileOrders;
