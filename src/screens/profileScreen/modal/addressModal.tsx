import React, { useEffect, useMemo, useState } from "react";
import { AutoComplete, Modal, Select, Spin, Tooltip, message } from "antd";
import { Button, Form, Input, Radio, notification } from "antd";
import {
  AUTO_COMPLETE,
  CURRENT_LOCATION,
  GET,
  POST,
  PUT,
} from "../../../utils/apiCalls";
import API from "../../../config/API";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { currentLoctionType } from "../../../shared/types/types";
import "./style.scss";
import { Col, Row } from "react-bootstrap";
import AutoCompleteLocation from "./autoCompleteLocation";
const update = "update";
const AddressModal = (props: any) => {
  const [form] = Form.useForm();
  const [Notifications, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const User = useSelector((state: any) => state.User.user);
  const [locationLoading, setLocationLoading] = useState(false);
  const type = props?.type;
  const [messageApi, contextHolder2] = message.useMessage();
  useEffect(() => {
    if (type == update) {
      form.setFieldsValue({
        flat: props?.selected?.flat,
        pincode: props?.selected?.pin_code,
        state: props?.selected?.state,
        street: props?.selected?.street,
        city: props?.selected?.city,
        phone: props?.selected?.alt_phone,
        location: props?.selected?.geo_location,
        address:props?.selected?.fullAddress,
      });
    } else {
      form.resetFields();
    }
  }, [type, props?.selected]);
  const formSubmitHandler = async (values: any) => {
    const url =
      type == update ? API.ADDRESS + props?.selected?.id : API.ADDRESS;
    const obj = {
      userId: User.data._id,
      flat: values?.flat,
      pin_code: values?.pincode,
      state: values?.state,
      city: values?.city,
      street: values?.street,
      alt_phone: values?.phone,
      geo_location: values?.location,
      fullAddress:values?.address,
      type: "home",
    };
    setIsLoading(true);
    try {
      const response: any =
        type == update ? await PUT(url, obj) : await POST(url, obj);
      if (response?.status) {
        Notifications["success"]({
          message: "Success",
          description: `Successfully ${
            type == update ? "updated" : "Added"
          } the Address`,
        });
        form.resetFields();
        props?.modalClose();
        props?.fetchAddress();
      } else {
        Notifications["error"]({
          message: `Failed to ${type == update ? "Update" : "Add New Address"}`,
          description: response.message,
        });
      }
    } catch (err: any) {
      Notifications["error"]({
        message: `Failed to ${type == update ? "Update" : "Add New Address"}`,
        description: err.message,
      });
    }
    setIsLoading(false);
  };

  //========================================================================= getcurrentlocation api

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocation, handleError);
    } else {
      messageApi.error(`GeoLocation not supported`);
    }
  }
  const handleLocation = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getCurrentLocation(latitude, longitude);
  };
  const handleError = (error: any) => {
    messageApi.error(`Unable to get your Location. reason:${error.message}`);
  };
  const getCurrentLocation = async (lat: number, long: number) => {
    setLocationLoading(true);
    try {
      const locationInfo: any = await CURRENT_LOCATION(lat, long);
      if (locationInfo.status) {
        const locationData: currentLoctionType = locationInfo.data;
        form.setFieldsValue({
          pincode: locationData?.postal_code,
          state: locationData?.state,
          street: locationData?.street_address,
          city: locationData?.taluk,
          address: locationData.premise,
        });
        messageApi.success(`Address set to Your Current Location`);
      }
    } catch (err) {
      messageApi.error(`Unable to get your Location.`);
    } finally {
      setLocationLoading(false);
    }
  };
  //===================================================================================locationautoapi

  //=====================================================================autocomplete

  return (
    <Modal
      title={`${type == "add" ? "Add New" : "Edit"} Address `}
      open={props?.open}
      onCancel={() => {
        props?.modalClose();
      }}
      okText="Update"
      centered
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      {contextHolder}
      {contextHolder2}
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        layout="vertical"
        onFinish={formSubmitHandler}
      >
        <Form.Item
          label="Flat"
          name={"flat"}
          rules={[
            {
              required: true,
              message: "Please Enter Flat Number",
            },
          ]}
        >
          <Input placeholder="Flat" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please Enter Address",
            },
          ]}
        >
          <TextArea rows={3} placeholder="Address" maxLength={200} />
        </Form.Item>
        <AutoCompleteLocation setCurrentLocation={handleLocationClick} locationLoading={locationLoading}/>

        <Row>
          <Col md="6">
            <Form.Item
              label="PinCode"
              name="pincode"
              rules={[
                {
                  required: true,
                  message: "Please Enter PinCode",
                },
              ]}
            >
              <Input placeholder="Pincode" />
            </Form.Item>
          </Col>
          <Col md="6">
            <Form.Item
              label="State"
              name="state"
              rules={[
                {
                  required: true,
                  message: "Please Enter State",
                },
              ]}
            >
              <Input placeholder="State" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Street"
          name="street"
          rules={[
            {
              required: true,
              message: "Please Enter Street",
            },
          ]}
        >
          <Input placeholder="Street" />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[
            {
              required: true,
              message: "Please Enter City",
            },
          ]}
        >
          <Input placeholder="City" />
        </Form.Item>
        <Form.Item
          label="Alternate Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please Enter Phone Number",
            },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        <div className="d-flex gap-2 justify-content-end">
          <Button onClick={props?.modalClose}>Cancel</Button>
          <Button type="primary" loading={isLoading} onClick={form.submit}>
            {type == update ? "Update" : "Add"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddressModal;
