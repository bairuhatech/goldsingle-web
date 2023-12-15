import { Pagination, Popconfirm, Rate, Spin } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SingleProductContext } from "../../singleProductContext";
const ReviewTab = () => {
  const data = useContext(SingleProductContext);
  const reviews = data?.reviews;
  const reviewLoading = data?.reviewLoading;
  const openReview = data?.openReview;
  const deleteReview = data?.deleteReview;
  const reviewPage = data?.reviewPage;
  const reviewPageSize = data?.reviewPageSize;
  const reviewMeta = data?.reviewMeta;
  const getReviewPage = data?.getReviewPage;
  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  const User = useSelector((state: any) => state.User.user);
  const Auth = useSelector((state: any) => state.User);
  const navigation = useNavigate();
  return (
    <>
      <div className="ProductDetailScreen-row">
        <div className="ProductDetailScreen-txt4">Customer Reviews </div>
        <div style={{ flex: 1 }} />

        <button
          onClick={() => {
            if (Auth.auth) {
              if (typeof openReview == "function") {
                openReview();
              }
            } else {
              navigation("/login");
            }
          }}
          className="ProductDetailScreen-reviewButton"
        >
          Add Review +
        </button>
      </div>
      {reviewLoading ? (
        <div className="d-flex justify-content-center">
          {" "}
          <Spin indicator={antIcon} />
        </div>
      ) : reviews?.length ? (
        reviews?.map((item: any, index: number) => (
          <div key={index} className="review-item-card">
            <div className="productDetails-flex sproductDetails-space-between">
              <h1 className="productDetails-text3 productDetails-margin-h-6 productDetails-txt-bold productDetails-zero-margin-h">
                {item?.userName}
              </h1>
              <h1 className="productDetails-text4 productDetails-secondary-text productDetails-margin-h-6">
                {moment(item?.createdAt).format("ll")}
              </h1>
              {User.data?._id === item?.user_id ? (
                <Popconfirm
                  className="ms-3"
                  placement="bottomRight"
                  title={"Are you sure to delete review?"}
                  okText="Yes"
                  cancelText="No"
                  onConfirm={async () => {
                    if (typeof deleteReview == "function") {
                      await deleteReview(item);
                    }
                  }}
                >
                  <AiOutlineDelete
                    color="#a10244"
                    style={{ cursor: "pointer" }}
                  />
                </Popconfirm>
              ) : null}
            </div>
            <div>
              <Rate
                allowHalf
                defaultValue={Number(item?.rating)}
                className="productDetails-text4 mt-1"
              />
            </div>

            {/* <h1 className="productDetails-text2 productDetails-margin-h-6 productDetails-txt-bold productDetails-zero-margin-h">
              Awesome..!
            </h1> */}
            <h1 className="productDetails-text4 productDetails-margin-h-6 productDetails-zero-margin-h mt-1">
              {item?.message}
            </h1>
          </div>
        ))
      ) : (
        <div>No reviews available</div>
      )}

      <Pagination
        className="mt-2"
        current={reviewPage || 1}
        pageSize={reviewPageSize || 10}
        total={reviewMeta?.itemCount || 0}
        defaultCurrent={1}
        responsive={true}
        defaultPageSize={reviewPageSize || 10}
        disabled={false}
        hideOnSinglePage={true}
        onChange={(current: any, size: any) => {
          if (typeof getReviewPage == "function") getReviewPage(current);
        }}
      />
    </>
  );
};
export default ReviewTab;
