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

const WeightForm: React.FC = () => {
  const [Notifications, contextHolder] = notification.useNotification();
  const [weightsData, setWeightsData] = useState<any[]>([]);
  const { control, handleSubmit, reset } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "weights"});
  const [deletedItemIds, setDeletedItemIds] = useState<number[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchWeights = async () => {
    try {
      const url = API.WEIGHT_CHARGE;
      const response: any = await GET(url, null);
      setWeightsData(response.data);
      reset({ weights: response.data });
      return response.data;
    } catch (error) {
      console.error("Error while loading data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeights();
  }, []);

  const onWeightFinish = async (values: any) => {
    setLoading(true);
    try {
      let response: any;
      const initialData = await fetchWeights();
      const newData = values.weights.map((item: any) => ({
        id: item.id,
        weight: item.weight,
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
        const updateUrl = API.WEIGHT_CHARGE;
        response = await PUT(updateUrl, modifiedRows);
      }
      const newRows = newData.filter((item: any) => !item.id);
      if (newRows.length > 0) {
        const createUrl = API.WEIGHT_CHARGE;
        response = await POST(createUrl, newRows);
      }
      if (deletedItemIds.length > 0) {
        const deleteUrls = deletedItemIds.map(
          (id) => `${API.WEIGHT_CHARGE}${id}`
        );
        const deleteRequests = deleteUrls.map((url) => DELETE(url));
        await Promise.all(deleteRequests);
        const updatedSlabsData = weightsData.filter(
          (item) => !deletedItemIds.includes(item.id)
        );
        setWeightsData(updatedSlabsData);
        setDeletedItemIds([]);
      }

      Notifications.success({
        message: "Submission Successful",
        description: "The weight charge has been successfully submitted.",
      });
      fetchWeights();
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
      ) : weightsData.length ? (
        <form onSubmit={handleSubmit(onWeightFinish)}>
          {fields.map((field, index) => (
            <Space key={field.id} style={{ display: "flex", marginBottom: 8 }}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Weight"
                    defaultValue={field.value}
                  />
                )}
                control={control}
                name={`weights[${index}].weight`}
                rules={{ required: "Missing weight" }}
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
                name={`weights[${index}].operator`}
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
                name={`weights[${index}].charge`}
                rules={{ required: "Missing price" }}
              />
              <DeleteOutlined
                onClick={() => {
                  const deletedItemId = weightsData[index]?.id;
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
              Add Weight
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Weight
            </Button>
          </Form.Item>
        </form>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default WeightForm;
