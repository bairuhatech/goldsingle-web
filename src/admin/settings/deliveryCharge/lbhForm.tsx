import React, { useEffect, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Form, Space, Button, Input, Select, notification } from "antd";
import { DELETE, GET, POST, PUT } from "../../../utils/apiCalls";
import API from "../../../config/API";
import AdminLoading from "../../components/AdminLoading";
import NoData from "../../../components/noData";
import { isEqual } from "lodash";

const { Option } = Select;

const LbhForm: React.FC = () => {
  const [Notifications, contextHolder] = notification.useNotification();
  const [lbhData, setLbhData] = useState<any[]>([]);
  const { control, handleSubmit, reset } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "lbhs" });
  const [deletedItemIds, setDeletedItemIds] = useState<number[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchLbh = async () => {
    setLoading(true);
    try {
      const url = API.LBH_CHARGE;
      const response: any = await GET(url, null);
      setLbhData(response.data);
      reset({ lbhs: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching lbhs:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLbh();
  }, []);

  const onLbhFinish = async (values: any) => {
    setLoading(true);
    try {
      let response: any;
      const initialData = await fetchLbh();
      const newData = values.lbhs.map((item: any) => ({
        id: item.id,
        length: item.length,
        breadth: item.breadth,
        height: item.height,
        operator: item.operator,
        charge: item.charge,
      }));

      const modifiedRows = newData.filter((newItem: any) => {
        const initialItem = initialData.find(
          (item: any) => item.id === newItem.id
        );
        return !isEqual(newItem, initialItem);
      });

      const updatedRows = modifiedRows.filter((item: any) => item.id);
      if (updatedRows.length > 0) {
        const updateUrl = API.LBH_CHARGE;
        response = await PUT(updateUrl, modifiedRows);
      }
      const newRows = newData.filter((item: any) => !item.id);
      if (newRows.length > 0) {
        const createUrl = API.LBH_CHARGE;
        response = await POST(createUrl, newRows);
      }

      if (deletedItemIds.length > 0) {
        const deleteUrls = deletedItemIds.map((id) => `${API.LBH_CHARGE}${id}`);
        const deleteRequests = deleteUrls.map((url) => DELETE(url));
        await Promise.all(deleteRequests);
        const updatedSlabsData = lbhData.filter(
          (item) => !deletedItemIds.includes(item.id)
        );
        setLbhData(updatedSlabsData);
        setDeletedItemIds([]);
      }

      Notifications.success({
        message: "Submission Successful",
        description: "The LBH charges has been successfully submitted.",
      });
      fetchLbh();
    } catch (error) {
      console.error("Submission Error:", error);

      Notifications.error({
        message: "Submission Error",
        description: "An error occurred while submitting the data.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {contextHolder}
      {isLoading ? (
        <AdminLoading />
      ) : lbhData.length ? (
        <form onSubmit={handleSubmit(onLbhFinish)}>
          {fields.map((field, index) => (
            <Space key={field.id} style={{ display: "flex", marginBottom: 8 }}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Length"
                    defaultValue={field.value}
                  />
                )}
                control={control}
                name={`lbhs[${index}].length`}
                rules={{ required: "Missing length" }}
              />
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Breadth"
                    defaultValue={field.value}
                  />
                )}
                control={control}
                name={`lbhs[${index}].breadth`}
                rules={{ required: "Missing breadth" }}
              />
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Height"
                    defaultValue={field.value}
                  />
                )}
                control={control}
                name={`lbhs[${index}].height`}
                rules={{ required: "Missing height" }}
              />
              <Controller
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: 60 }}
                    defaultValue={field.value}
                  >
                    <Option value="=">=</Option>
                    <Option value="<=">&lt;=</Option>
                    <Option value=">=">&gt;=</Option>
                  </Select>
                )}
                control={control}
                name={`lbhs[${index}].operator`}
                rules={{ required: "Missing operator" }}
              />
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Price"
                    defaultValue={field.value}
                  />
                )}
                control={control}
                name={`lbhs[${index}].charge`}
                rules={{ required: "Missing price" }}
              />
              <DeleteOutlined
                onClick={() => {
                  const deletedItemId = lbhData[index]?.id;
                  remove(index);
                  setDeletedItemIds((prevIds) => [...prevIds, deletedItemId]);
                }}
              />
            </Space>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => append({})}
              icon={<PlusOutlined />}
            >
              Add LBH
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit LBH
            </Button>
          </Form.Item>
        </form>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default LbhForm;
