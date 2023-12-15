import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button, Form, Input, Radio, Select, message, notification } from "antd";
import { DOCUMENT_UPLOAD, GET, PUT } from "../../utils/apiCalls";
import { CorporateRegisterType } from "../../shared/types/types";
import { useSelector } from "react-redux";
import API from "../../config/API";
import Country from "../../config/countryCode.json";
import AdminLoading from "../components/AdminLoading";
import NoData from "../../components/noData";
import PageHeader from "../components/PageHeader";
import LocationPicker from "../../screens/sellerRegister/component/LocationPicker";
import FilePicker from "../../screens/sellerRegister/component/filePicker"

function ManageStore() {
  const [sellerDetails, setSellerDetails] = useState<any>();
  const [Notifications, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(true);
  const [OpenPicker, setOpenPicker] = useState(false);
  const [form] = Form.useForm();
  const [page, setPage] = useState<number>(1);
  const [store, setStore] = useState<CorporateRegisterType[]>([]);
  const [file, setFile] = useState<any>(null);
  const [businessType, SetBusinessType] = useState([]);
  const Auth = useSelector((state: any) => state.User);

  const getSellerDetails = async (currentPage: number = page) => {
    setLoading(true);
    try {
      const url = API.CORPORATE_STORE_GETBYID + Auth?.user?.data?.store_id;
      const data: any = await GET(url, null);
      console.log(data);

      if (data?.status) {
        setSellerDetails(data?.data);
        setStore(data?.data);
      }
    } catch (err: any) {
      Notifications["error"]({
        message: "Something went wrong",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleFileUpload = (file: any) => {
    setFile(file);
  };
  useEffect(() => {
    loadbusinessType();
  }, []);
  const loadbusinessType = async () => {
    try {
      let url = API.BUSINESS_TYPE;
      let response: any = await GET(url, null);
      if (response.status) {
        SetBusinessType(response.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  const OnFinsh = async (item: any) => {
    const upload = await DOCUMENT_UPLOAD(file.file);
    const obj = {
      email: item.email,
      phone: item.phone,
      business_location: item.business_location,
      business_address: item.business_address,
      business_type: item.business_type,
      trn_number: item.trn_number,
      trade_lisc_no: item.trade_lisc_no,
      store_name: item.store_name,
      logo_upload: upload,
      upscs: item.upscs,
      manufacture: item.manufacture,
      status: item.status,
    };

    const url = API.CORPORATE_SELLER_GETALL + "/" + sellerDetails?.id;

    setLoading(true);

    try {
      const Response: any = await PUT(url, obj);
      message.success("Successfully updated");
      console.log(Response, "Response----->");
      // window.location.reload();
    } catch (error) {
      console.error("Error updating name:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSellerDetails();
  }, []);

  const prefixSelector = (
    <Form.Item name="code" noStyle>
      <Select style={{ width: 85 }} size="large" showSearch={true}>
        {Country.map((item: any) => {
          return (
            <Select.Option key={item.dial_code} value={item.dial_code}>
              {item.dial_code}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );

  return (
    <>
      {contextHolder}
      <PageHeader title="Manage Store" />
      {loading ? (
        <AdminLoading />
      ) : sellerDetails ? (
        <>
          <div style={{ padding: "30px" }}>
            <div className="fw-bold mt-3 fs-4">Personal Details</div>
            <Form
              form={form}
              onFinish={OnFinsh}
              initialValues={{
                code: "+91",
                email: sellerDetails.email,
                phone: sellerDetails.phone,
                trn_number: sellerDetails.trn_number,
                trade_lisc_no: sellerDetails.trade_lisc_no,
                business_type: sellerDetails.business_type,
                business_location: sellerDetails.business_location,
                business_address: sellerDetails.business_address,
                seller_name: sellerDetails.seller_name,
                store_name: sellerDetails.store_name,
                status: sellerDetails.status,
                manufacture: sellerDetails.manufacture,
                upscs: sellerDetails.upscs,
              }}
            >
              <Row className="mt-2">
                <Col md="4">
                  <div className="fw-bold ">Email</div>
                  <Form.Item
                    name={"email"}
                    rules={[
                      { required: true, message: "email is required" },
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col md="4">
                  <div className="fw-bold ">Phone</div>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Input your phone number!",
                      },
                    ]}
                  >
                    <Input
                      addonBefore={prefixSelector}
                      style={{ width: "100%" }}
                      size="large"
                      type="number"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="fw-bold mt-3 fs-4">Business Details</div>
              <Row className="mt-2">
                <Col md="4">
                  <div className="fw-bold ">Trn Number</div>
                  <Form.Item
                    name="trn_number"
                    rules={[
                      {
                        required: true,
                        message: "Trn number is required",
                      },
                    ]}
                  >
                    <Input size="large" disabled />
                  </Form.Item>
                </Col>
                <Col md="4">
                  <div className="fw-bold ">Trade Liscence No</div>
                  <Form.Item
                    name="trade_lisc_no"
                    rules={[
                      {
                        required: true,
                        message: "Licencs number is required",
                      },
                    ]}
                  >
                    <Input size="large" disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="fw-bold ">Business Type</div>
                  <Form.Item name="business_type">
                    <Select size="large">
                      {businessType?.map((item: any) => {
                        return (
                          <Select.Option key={item.id} value={item.name}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md="4">
                  <div className="fw-bold ">Locate your Business</div>
                  <Form.Item
                    name="business_location"
                    rules={[
                      {
                        required: true,
                        message: "Please Loacte your Business",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      onClick={(e) => {
                        setOpenPicker(true);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <div className="fw-bold ">Business Location</div>
                  <Form.Item
                    name="business_address"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Business Location",
                      },
                    ]}
                  >
                    <Input.TextArea size="large" rows={3} />
                  </Form.Item>
                </Col>
              </Row>
              <div className="fw-bold mt-3 fs-4">Store Details</div>
              <Row className="mt-2">
                <Col md="4">
                  <div className="fw-bold ">Business Name</div>
                  <Form.Item
                    name="store_name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Business Name",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col md="4">
                  <div className="fw-bold ">
                    Are you Manufacture or brand owner (or agent or
                    representiative of the brand) for the products you want to
                    sell on Gold Bazar
                  </div>
                  <Form.Item name="manufacture">
                    <Radio.Group>
                      <Radio value="Yes">Yes</Radio>
                      <Radio value="No">No</Radio>
                      <Radio value="Both">Both</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md="4">
                  <div className="fw-bold ">Upload Store Logo</div>
                  <Form.Item name="logo_upload">
                  <FilePicker onSubmit={handleFileUpload} fileName={file?.file} />
                  </Form.Item>
                </Col>
                <Col md="4">
                  <div className="fw-bold ">
                    Do you have Universal product code (UPSCs) for all your
                    products ?
                  </div>
                  <Form.Item name="upscs">
                    <Radio.Group>
                      <Radio value="Yes">Yes</Radio>
                      <Radio value="No">No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                block
                style={{ width: "30%" }}
              >
                Submit
              </Button>
            </Form>
          </div>
          {OpenPicker ? (
            <LocationPicker
              visible={OpenPicker}
              onCancel={() => setOpenPicker(false)}
              onChange={(value: any) =>
                form.setFieldValue("business_location", value)
              }
            />
          ) : null}
        </>
      ) : (
        <NoData />
      )}
    </>
  );
}

export default ManageStore;
