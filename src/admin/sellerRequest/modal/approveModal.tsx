import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, notification, Select, Radio, DatePicker } from "antd";
import { DOCUMENT_UPLOAD, POST, PUT } from "../../../utils/apiCalls";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import API from "../../../config/API";
import LocationPicker from "../../../screens/sellerRegister/component/LocationPicker";
import Country from "../../../config/countryCode.json";
import FilePicker from "../../../screens/sellerRegister/component/filePicker";

const ApproveModal = (props: any) => {
  const { Option } = Select;
  const params = useParams();
  const [form] = Form.useForm();
  const { businessType, data } = props;
  const [Notifications, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState("");
  const [OpenPicker, setOpenPicker] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [file2, setFile2] = useState<any>(null);

  const handleFileUpload = (file: any) => {
    setFile(file);
    console.log(file, "consoled file");
  };
  const handleFileUpload2 = (file: any) => {
    setFile2(file);
  };

  useEffect(() => {}, []);

  const formSubmitHandler = async (values: any) => {
    const id_proof_upload = await DOCUMENT_UPLOAD(file?.file);
    const trn_uploadDoc = await DOCUMENT_UPLOAD(file2?.file);

    const obj = {
      ...values,
      ...data,
      id_proof: id_proof_upload,
      trn_upload: trn_uploadDoc,
      name: `${values?.first_name} ${values?.last_name}`,
      agreement: "true",
      status_remark: values?.status_remark,
      status: action,
    };

    try {
      setIsLoading(true);
      const url = API.CORPORATE_STORE_CREATE;

      const response: any = await POST(url, obj);
      if (response.status) {
        Notifications["success"]({
          message: "Status updated successfully",
        });
        const putUrl = API.INDIVIDUAL_STORE_UPDATE_STATUS + params?.id;
        await PUT(putUrl, { status: action });
        props?.getSellerDetails();
        props?.modalClose();
        form.resetFields();
      } else {
        Notifications["error"]({
          message: "Failed to update Status",
          description: response.message,
        });
      }
    } catch (err) {
      Notifications["error"]({
        message: "Failed to update Status",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={`Approve Seller Request`}
      open={props?.open}
      onOk={() => {
        setAction("approved");
        form.submit();
      }}
      onCancel={props?.modalClose}
      footer={false}
    >
      {contextHolder}
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        layout="vertical"
        onFinish={formSubmitHandler}
        initialValues={{ status: "approved" }}
      >
        <Row>
          <Col md="6">
            <Form.Item
              label="Enter First Name"
              name={"first_name"}
              rules={[{ required: true, message: "name is required" }]}
            >
              <Input placeholder="First name" size="large" />
            </Form.Item>
          </Col>
          <Col md="6">
            <Form.Item
              label="Enter last Name"
              name={"last_name"}
              rules={[{ required: true, message: "name is required" }]}
            >
              <Input placeholder="Last name" size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Form.Item
              label="Business Name"
              name="store_name"
              rules={[
                {
                  required: true,
                  message: "Please enter Business Name",
                },
              ]}
            >
              <Input placeholder="Store Name" size="large" />
            </Form.Item>
          </Col>
          <Col md="6">
            <Form.Item label="Business Type" name="business_type">
              <Select placeholder="Business Type" size="large">
                {businessType?.map((item: any) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Form.Item
              label="Trade License No"
              name="trade_lisc_no"
              rules={[
                {
                  required: true,
                  message: "License number is required",
                },
              ]}
            >
              <Input placeholder="Enter Trade License No" size="large" />
            </Form.Item>
          </Col>
          <Col md="6">
            <Form.Item name="seller_name" label="Seller Name">
              <Input placeholder="Seller Name" size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Form.Item
              label="TRN Number"
              name="trn_number"
              rules={[
                {
                  required: true,
                  message: "TRN number is required",
                },
              ]}
            >
              <Input placeholder="Enter TRN Number" size="large" />
            </Form.Item>
          </Col>
          <Col md="6">
            <Form.Item
              label="Business Location"
              name="business_location"
              rules={[
                {
                  required: true,
                  message: "Please Loacte your Business",
                },
              ]}
            >
              <Input
                placeholder="Store Location"
                size="large"
                onClick={(e) => {
                  setOpenPicker(true);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Form.Item
              label="TRN Document"
              name={"trn_upload"}
              rules={[{ message: "TRN Document is required" }]}
            >
              <FilePicker onSubmit={handleFileUpload2} fileName={file2?.file} />
            </Form.Item>
          </Col>
          <Col md="6">
            <Form.Item
              label="Business Address"
              name="business_address"
              rules={[
                {
                  required: true,
                  message: "Please enter Business Location",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter your Business Location"
                size="large"
                rows={3}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="input-form-label">
          Do seller have Universal product code (UPSCs) for all his/her products
          ?
        </div>
        <Form.Item name="upscs">
          <Radio.Group size="large">
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>

        <div className="input-form-label">
          Is seller Manufacture or brand owner (or agent or representiative of
          the brand) for the products he/she want to sell on Gold Bazar
        </div>
        <Form.Item name="manufacture">
          <Radio.Group size="large">
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
            <Radio value="both">Both</Radio>
          </Radio.Group>
        </Form.Item>
        <Row>
          <Col md="6">
            <Form.Item label="Birth Country" name="birth_country">
              <Select
                placeholder="Birth Country"
                size="large"
                showSearch={true}
              >
                {Country?.map((item: any) => {
                  return (
                    <Option key={item.name} value={item.name}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col md="6">
            <Form.Item label="Date of Birth" name="dob">
              <DatePicker
                placeholder="DOB"
                style={{ width: "100%" }}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <Form.Item label="Citizenship Country" name="seller_country">
              <Select
                placeholder="Citizenship Country"
                size="large"
                showSearch={true}
              >
                {Country?.map((item: any) => {
                  return (
                    <Option key={item.name} value={item.name}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col md="6">
            <Form.Item label="ID Proof" name="id_type">
              <Select placeholder="Select ID Proof" size="large">
                <Option key="Emirates ID">Emirates ID</Option>
                <Option key="Passport">Passport</Option>
                <Option value="Driving Liscence">Drivers Liscence</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Form.Item label="Issue Country" name="id_issue_country">
              <Select
                placeholder="Issue Country"
                size="large"
                showSearch={true}
              >
                {Country?.map((item: any) => {
                  return (
                    <Option key={item.name} value={item.name}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col md="6">
            <Form.Item label="Expiry Date" name="id_expiry_date">
              <DatePicker
                placeholder="Expiry Date"
                style={{ width: "100%" }}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Form.Item label="ID Proof Documents" name="id_proof">
            <FilePicker onSubmit={handleFileUpload} fileName={file?.file} />
            </Form.Item>
          </Col>
          <Col md="6">
            <Form.Item
              label="Enter Password"
              name="password"
              rules={[
                { required: true, message: "password is required", min: 6 },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter password" size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Remark"
          name="status_remark"
          rules={[
            {
              required: true,
              message: "Please Enter Remark",
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Remark" />
        </Form.Item>

        <div className="d-flex gap-2 justify-content-end">
          <Button
            loading={action == "approved" ? isLoading : false}
            type="primary"
            onClick={() => {
              setAction("approved");
              form.submit();
            }}
          >
            Approve
          </Button>
        </div>
      </Form>
      {OpenPicker ? (
        <LocationPicker
          visible={OpenPicker}
          onCancel={() => setOpenPicker(false)}
          onChange={(value: any) =>
            form.setFieldValue("business_location", value)
          }
        />
      ) : null}
    </Modal>
  );
};

export default ApproveModal;
