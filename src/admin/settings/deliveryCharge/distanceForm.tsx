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

const DistanceForm: React.FC = () => {
  const [Notifications, contextHolder] = notification.useNotification();
  const [distancesData, setDistancesData] = useState<any[]>([]);
  const { control, handleSubmit, reset } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "distances" });
  const [deletedItemIds, setDeletedItemIds] = useState<number[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchDistances = async () => {
    try {
      const url = API.DISTANCE_CHARGE;
      const response: any = await GET(url, null);
      setDistancesData(response.data);
      reset({ distances: response.data });
      return response.data;
    } catch (error) {
      console.error("Error while loading data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistances();
  }, []);

  const onDistanceFinish = async (values: any) => {
    setLoading(true);
    try {
      let response: any;

      const initialData = await fetchDistances();
      const newData = values.distances.map((item: any) => ({
        id: item.id,
        distance: item.distance,
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
        const updateUrl = API.DISTANCE_CHARGE;
        response = await PUT(updateUrl, modifiedRows);
      }
      const newRows = newData.filter((item: any) => !item.id);
      if (newRows.length > 0) {
        const createUrl = API.DISTANCE_CHARGE;
        response = await POST(createUrl, newRows);
      }

      if (deletedItemIds.length > 0) {
        const deleteUrls = deletedItemIds.map(
          (id) => `${API.DISTANCE_CHARGE}${id}`
        );
        const deleteRequests = deleteUrls.map((url) => DELETE(url));
        await Promise.all(deleteRequests);
        const updatedSlabsData = distancesData.filter(
          (item) => !deletedItemIds.includes(item.id)
        );
        setDistancesData(updatedSlabsData);
        setDeletedItemIds([]);
      }

      Notifications.success({
        message: "Submission Successful",
        description: "The distance charge has been successfully submitted.",
      });
      fetchDistances();
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
      ) : distancesData.length ? (
        <form onSubmit={handleSubmit(onDistanceFinish)}>
          {fields.map((field, index) => (
            <Space key={field.id} style={{ display: "flex", marginBottom: 8 }}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Distance"
                    defaultValue={field.value}
                  />
                )}
                control={control}
                name={`distances[${index}].distance`}
                rules={{ required: "Missing distance" }}
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
                name={`distances[${index}].operator`}
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
                name={`distances[${index}].charge`}
                rules={{ required: "Missing price" }}
              />
              <DeleteOutlined
                onClick={() => {
                  const deletedItemId = distancesData[index]?.id;
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
              Add Distance
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Distance
            </Button>
          </Form.Item>
        </form>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default DistanceForm;
