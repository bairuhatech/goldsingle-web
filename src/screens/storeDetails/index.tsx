import React, { useEffect, useState } from "react";
import API from "../../config/API";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GET } from "../../utils/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Card } from "antd";
import { addStore } from "../../redux/slices/storeSlice";
import NoData from "../../components/noData";
import Loading from "../../components/loading";
import { Col, Row } from "react-bootstrap";
import "./style.scss";
import { MdPendingActions } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FcApprove } from "react-icons/fc";
function StoreRedirectScreen() {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [storeData, setStoreData] = useState<any>({});
  const Settings = useSelector((state: any) => state.Settings.Settings);
  const User = useSelector((state: any) => state.User.user);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const getStoreDetails = async () => {
    const id = searchParams.get("id");
    if (id) {
      const url = API.CORPORATE_STORE_GETBYID + id;
      try {
        setLoading(true);
        const store: any = await GET(url, null);
        if (store?.status == true) {
          setStoreData(store?.data);
          dispatch(addStore(store?.data));
          if (store?.data?.status == "approved" && Settings.type == "multi") {
            if (User?.data?.role === "admin") {
              navigation("/auth/dashboard", { replace: true });
            } else {
              navigation("/auth/overview", { replace: true });
            }
          }
        } else {
          throw new Error(store.message);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    getStoreDetails();
  }, []);

  return (
    <div className="Screen-box">
      {loading ? (
        <Loading />
      ) : storeData?.id ? (
        <>
          <Row>
            <Col md="2"></Col>
            <Col md="8">
              <Card className="mt-3 w-100" bordered={false}>
                <div className="d-flex flex-column align-items-center">
                  {storeData?.status == "pending" ? (
                    <div className="pendingstatus d-flex flex-column align-items-center">
                      <MdPendingActions size={60} color="orange" />

                      <h5 className="mt-2">
                        Your Request has not been Approved Yet. please wait.
                      </h5>
                      <Button
                        onClick={() => {
                          navigation("/", { replace: true });
                        }}
                      >
                        Go Home
                      </Button>
                    </div>
                  ) : storeData?.status == "rejected" ? (
                    <div className="pendingstatus d-flex flex-column align-items-center">
                      <IoMdCloseCircleOutline size={60} color="red" />

                      <h5 className="mt-2">Your Request has been Rejected.</h5>
                      <h6 className="text-danger">
                        {" "}
                        Reason: {storeData?.status_remark}
                      </h6>
                      <Button
                        onClick={() => {
                          navigation("/", { replace: true });
                        }}
                      >
                        Go Home
                      </Button>
                    </div>
                  ) : storeData?.status == "approved" ? (
                    <div className="pendingstatus d-flex flex-column align-items-center">
                      <FcApprove size={60} color="orange" />

                      <h5 className="mt-2">
                        Your request has been Approved Successfully
                      </h5>
                    </div>
                  ) : null}

                  <p className="store-details-text-small mb-0 mt-3">
                    NB: Once your request is Approved you'll be automatically
                    redirected to Manage store page.
                  </p>
                </div>
              </Card>
              <Alert
                description={
                  <div>
                    You can Check the status of your request for New Store here.
                    The status of your request will be either <b>Pending</b> or{" "}
                    <b>Approved</b> or <b>Rejected</b> <br />
                    After You've submitted the Request Your datas will be
                    validated and will go through further procedures. And if you
                    are eligible your request will be approved else it will get
                    rejected.
                    <br />
                    During the period of evaluation of your data, your store
                    status will be pending.
                    <br />
                    for more details contact <b>Gold Bazar</b> customercare.
                  </div>
                }
                type="info"
                closable
                className="my-3"
              />
            </Col>
            <Col md="2"></Col>
          </Row>
        </>
      ) : (
        <NoData
          header="Invalid User Details"
          text1="Unable to find Seller details please make sure
        the details are correct"
        />
      )}
    </div>
  );
}

export default StoreRedirectScreen;
