import React, { useEffect, useState, useRef } from "react";
import { Modal, Select, Spin, message } from "antd";
import { Button, Form, Input } from "antd";
import API from "../../../config/API";
import "./style.scss";
import { FaLocationArrow, FaLocationCrosshairs } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { LocationType, reduxType } from "../../../shared/types/types";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLocation,
  storeLocation,
} from "../../../redux/slices/locationSlice";
import { LoadingOutlined } from "@ant-design/icons";
import AutoCompleteLocation from "../../../screens/profileScreen/modal/autoCompleteLocation";

const ChooseLocationModal = (props: any) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef: any = useRef(null);
  const LocationDetails: LocationType = useSelector(
    (state: reduxType) => state.Location.location
  );
  const dispatch = useDispatch();
  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocation, handleError);
    } else {
      messageApi.error(`GeoLocation not supported`);
    }
  }
  const student = {
    name: "amal",
    age: 23,
  };
  const getLocation = (lat: number, long: number) => {
    const locationObj: any = {};
    locationObj.latitude = lat;
    locationObj.longitude = long;
    const url =
      API.GET_LOCATION + `?latlng=${lat},${long}&key=${API.GGL_TOKEN}`;
    setIsLoading(true);
    fetch(url, {
      method: "get",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        messageApi.error(`Failed to get your location`);
        setIsLoading(false);
        return;
      })
      .then((response) => {
        if (response?.status == "OK") {
          response.results?.map((item: any) => {
            if (item.types?.includes("country")) {
              locationObj.country = item.formatted_address;
            }
            if (item.types?.includes("postal_code")) {
              locationObj.postal_code = item.formatted_address;
            }
            if (item.types?.includes("administrative_area_level_1")) {
              locationObj.state = item.formatted_address;
            }
            if (item.types?.includes("administrative_area_level_3")) {
              locationObj.district = item.formatted_address;
            }
            if (item.types?.includes("administrative_area_level_4")) {
              locationObj.taluk = item.formatted_address;
            }
            if (item.types?.includes("plus_code")) {
              locationObj.plus_code = item.formatted_address;
            }
            if (item.types?.includes("street_address")) {
              locationObj.street_address = item.formatted_address;
            }
            if (item.types?.includes("route")) {
              locationObj.route = item.formatted_address;
            }
          });
          dispatch(storeLocation(locationObj));
          messageApi.info(`Your location has been set to current Location`);
          setIsLoading(false);
        } else {
          messageApi.error(`Request failed ,reason:${response.status}`);
          setIsLoading(false);
          dispatch(clearLocation(null));
        }
      })
      .catch((err) => {
        messageApi.error(`Failed to get Location.`);
        setIsLoading(false);
      });
  };

  const handleLocation = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getLocation(latitude, longitude);
  };
  const handleError = (error: any) => {
    messageApi.error(`Unable to get your Location. reason:${error.message}`);
  };
  const focusInput = () => {
    //if the modal is open focus on the input
    setTimeout(() => {
      if (props?.open == true) {
        inputRef?.current?.focus();
      }
    }, 10);
  };
  useEffect(() => {
    focusInput();
  }, [props?.open]);
  return (
    <Modal
      title={`Choose Location`}
      open={props?.open}
      onOk={form.submit}
      onCancel={() => {
        props?.modalClose();
      }}
      okText="Choose"
      centered
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      bodyStyle={{ height: 500, borderRadius: "50px" }}
      closeIcon={
        <AiOutlineClose
          color="black"
          size={22}
          style={{ strokeWidth: "4px" }}
        />
      }
    >
      {contextHolder}
      <Form form={form} style={{ maxWidth: 600 }} layout="vertical">
        <Form.Item
          name={"name"}
          rules={[
            {
              required: true,
              message: "",
            },
          ]}
        >
          <Input
            placeholder="Choose Location"
            className="desktop-choose-location"
            ref={inputRef}
          />
          {/* <AutoCompleteLocation/> */}
        </Form.Item>
      </Form>
      <hr />
      <div
        className="current-location-text d-flex"
        onClick={handleLocationClick}
        style={{ cursor: "pointer" }}
      >
        {isLoading ? (
          <Spin
            indicator={
              <LoadingOutlined style={{ fontSize: 24 }} spin className="me-3" />
            }
          />
        ) : LocationDetails.latitude ? (
          <FaLocationCrosshairs
            size={20}
            className="me-3 mt-1"
            color="a10244"
          />
        ) : (
          <FaLocationArrow size={20} className="me-3" color="grey" />
        )}
        <div>
          {" "}
          {LocationDetails.latitude
            ? LocationDetails.postal_code
            : "Use Current Location"}
          <br />
          {LocationDetails.latitude ? LocationDetails.country : null}
        </div>
      </div>
    </Modal>
  );
};

export default ChooseLocationModal;
