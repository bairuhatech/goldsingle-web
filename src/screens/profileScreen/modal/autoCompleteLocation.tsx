import { AutoComplete, Form, Tooltip, message } from "antd";
import React, { useEffect, useState } from "react";
import useDebounce from "../../../shared/hook/useDebounce";
import { AUTO_COMPLETE } from "../../../utils/apiCalls";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { LoadingOutlined } from "@ant-design/icons";

function AutoCompleteLocation(props: any) {
  const [options, setOptions] = useState<any[]>([]);
  const [searchParam, setSearchParam] = useState("");
  const searchLocation = useDebounce(searchParam, 300);
  const [messageApi, contextHolder2] = message.useMessage();

  const getAutoComplete = (value: string) => {
    setSearchParam(value);
  };

  const getSuggetions = (result: any) => {
    const array: any[] = [];
    result?.predictions?.forEach((item: any) => {
      array.push({
        value: item?.structured_formatting?.main_text,
        key: item?.place_id,
      });
    });
    setOptions(array);
  };
  const locationAutoComplete = async (value: string) => {
    try {
      const response: any = await AUTO_COMPLETE(value);
      if (response?.status == "OK") {
        getSuggetions(response);
      }
    } catch (error) {
      messageApi.error(`Failed to get Location details`);
    }
  };
  useEffect(() => {
    locationAutoComplete(searchLocation);
  }, [searchLocation]);
  return (
    <div className="position-relative">
      {contextHolder2}
      <Form.Item
        className="align-items-center"
        label="Location"
        name="location"
        rules={[
          {
            required: true,
            message: "Please Enter Location",
          },
        ]}
      >
        <AutoComplete
          placeholder="Location"
          options={options}
          value={searchParam}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onChange={getAutoComplete}
        ></AutoComplete>
      </Form.Item>
      <div className="position-absolute add-address-location-btn">
        <Tooltip title="Set Your current Location">
          {props?.locationLoading ? (
            <LoadingOutlined style={{ fontSize: 18, color: "#a10244" }} spin />
          ) : (
            <FaLocationCrosshairs
              color="grey"
              onClick={() => props?.setCurrentLocation()}
              size={18}
            ></FaLocationCrosshairs>
          )}
        </Tooltip>
      </div>
    </div>
  );
}

export default AutoCompleteLocation;
