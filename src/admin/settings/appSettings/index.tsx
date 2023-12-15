import { Button, Form, Input, Select, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../config/API";
import { storeSettings } from "../../../redux/slices/settingsSlice";
import { PUT } from "../../../utils/apiCalls";
import currencyList from "../../../config/currencies.json";

function Settings() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const Settings = useSelector((state: any) => state.Settings.Settings);
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const updateSettings = async (values: any) => {
    const url = API.SETTINGS + Settings.id;
    setUpdating(true);
    try {
      const updated: any = await PUT(url, values);
      if (updated.status) {
        dispatch(storeSettings(updated.data));
        messageApi.success(`Settings updated successfully.`);
      }
    } catch (err) {
      messageApi.success(`Something went wrong!`);
    } finally {
      setUpdating(false);
    }
  };
  return (
    <div>
      {contextHolder}
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        layout="vertical"
        onFinish={updateSettings}
        initialValues={{
          type: Settings.type,
          isLocation: Settings.isLocation == true ? "true" : "false",
          currency: Settings.currency,
        }}
      >
        <Form.Item
          label={"Type"}
          name={"type"}
          rules={[
            {
              required: true,
              message: "Please Enter Type",
            },
          ]}
        >
         <Select
            bordered={false}
            style={{ width: "100%" }}
            className="border rounded"
            allowClear
            // defaultValue={"Select Type"}
          >
            {[
              { name: "Single Vendor", value: 'single' },
              { name: "Multi Store", value: 'multi' },
            ]?.map((item: any, index: number) => (
              <Option key={index} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Location"
          name={"isLocation"}
          rules={[
            {
              required: true,
              message: "Please Select Location",
            },
          ]}
        >
          <Select
            bordered={false}
            style={{ width: "100%" }}
            className="border rounded"
            allowClear
            defaultValue={"Select Location"}
          >
            {[
              { name: "true", value: true },
              { name: "false", value: false },
            ]?.map((item: any, index: number) => (
              <Option key={index} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Currency"
          name="currency"
          rules={[
            {
              required: true,
              message: "Please Enter Currency",
            },
          ]}
        >
          <Select placeholder="Select Currency" showSearch={true}>
            {currencyList.map((currency) => (
              <Option key={currency.symbol} value={currency.symbol}>
                {currency.cc}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div className="d-flex gap-2 justify-content-end">
          <Button
            type="primary"
            loading={updating}
            onClick={() => {
              form.submit();
            }}
          >
            Update Settings
          </Button>
        </div>
      </Form>
    </div>
  );
}
//form.submit
export default Settings;
