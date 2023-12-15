import React, { useEffect, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Form, Space, Button, Input, Select, notification } from "antd";
import { DELETE, GET, POST, PUT } from "../../../utils/apiCalls";
import API from "../../../config/API";
import NoData from "../../../components/noData";
import AdminLoading from "../../components/AdminLoading";
import { isEqual } from "lodash";

const { Option } = Select;

const DeliveryForm: React.FC = () => {
  const [Notifications, contextHolder] = notification.useNotification();
  const [slabsData, setSlabsData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { control, handleSubmit, reset } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "slabs" });
  const [deletedItemIds, setDeletedItemIds] = useState<number[]>([]);

  const loadData = async () => {
    try {
      const url = API.DELIVERY_CHARGE;
      const response: any = await GET(url, null);
      setSlabsData(response.data);
      reset({ slabs: response.data });
      return response.data;
    } catch (error) {
      console.error("Error while loading data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSlabFinish = async (values: any) => {
    setLoading(true);
    try {
      let response: any;
      const initialData = await loadData();
      const newData = values.slabs.map((item: any) => ({
        id: item.id,
        value: item.value,
        comparisonOperator: item.comparisonOperator,
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
        const updateUrl = API.DELIVERY_CHARGE;
        response = await PUT(updateUrl, modifiedRows);
      }

      const newRows = newData.filter((item: any) => !item.id);
      if (newRows.length > 0) {
        const createUrl = API.DELIVERY_CHARGE;
        response = await POST(createUrl, newRows);
      }

      if (deletedItemIds.length > 0) {
        const deleteUrls = deletedItemIds.map(
          (id) => `${API.DELIVERY_CHARGE}${id}`
        );
        const deleteRequests = deleteUrls.map((url) => DELETE(url));
        await Promise.all(deleteRequests);
        const updatedSlabsData = slabsData.filter(
          (item) => !deletedItemIds.includes(item.id)
        );
        setSlabsData(updatedSlabsData);
        setDeletedItemIds([]);
      }

      Notifications.success({
        message: "Submission Successful",
        description: "The charge has been successfully submitted.",
      });
      loadData();
    } catch (error) {
      console.error("Submission Error:", error);

      Notifications.error({
        message: "Submission Error",
        description: "An error occurred while submitting the charge.",
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
      ) : slabsData.length ? (
        <form onSubmit={handleSubmit(onSlabFinish)}>
          {fields.map((field, index) => (
            <Space key={field.id} style={{ display: "flex", marginBottom: 8 }}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Purchase Price"
                    defaultValue={field.value}
                  />
                )}
                control={control}
                name={`slabs[${index}].value`}
                rules={{ required: "Missing price" }}
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
                    <Option value="<">&lt;</Option>
                    <Option value=">">&gt;</Option>
                  </Select>
                )}
                control={control}
                name={`slabs[${index}].comparisonOperator`}
                rules={{ required: "Missing operator" }}
              />
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Delivery Charge"
                    defaultValue={field.value}
                  />
                )}
                control={control}
                name={`slabs[${index}].charge`}
                rules={{ required: "Missing charge" }}
              />
              <DeleteOutlined
                onClick={() => {
                  const deletedItemId = slabsData[index]?.id;
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
              Add Slab
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </form>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default DeliveryForm;

// const onSlabFinish = async (values: any) => {
//   setLoading(true);
//   try {
//     const hasExistingIDs = values.slabs.some((slab: any) => slab.id);
//     let response: any;

//     if (hasExistingIDs) {
//       const existingSlabs = values.slabs.filter((slab: any) => slab.id);
//       const newSlabs = values.slabs.filter((slab: any) => !slab.id);

//       if (existingSlabs.length > 0) {
//         const formattedExistingPayload = existingSlabs.map((slab: any) => ({
//           id: slab.id,
//           comparisonOperator: slab.comparisonOperator,
//           value: slab.value,
//           charge: slab.charge,
//         }));

//         const updateUrl = API.DELIVERY_CHARGE;
//         response = await PUT(updateUrl, formattedExistingPayload);
//       }

//       if (newSlabs.length > 0) {
//         const formattedNewPayload = {
//           comparisonOperator: newSlabs.map((slab: any) => slab.comparisonOperator),
//           value: newSlabs.map((slab: any) => slab.value),
//           charge: newSlabs.map((slab: any) => slab.charge),
//         };
//         const createUrl = API.DELIVERY_CHARGE;
//         response = await POST(createUrl, formattedNewPayload);
//       }
//     } else {
//       const formattedPayload = {
//         comparisonOperator: values.slabs.map(
//           (slab: any) => slab.comparisonOperator
//         ),
//         value: values.slabs.map((slab: any) => slab.value),
//         charge: values.slabs.map((slab: any) => slab.charge),
//       };
//       const url = API.DELIVERY_CHARGE;
//       response = await POST(url, formattedPayload);
//     }
//     if (deletedItemIds.length > 0) {
//       const deleteUrls = deletedItemIds.map((id) => `${API.DELIVERY_CHARGE}${id}`);
//       const deleteRequests = deleteUrls.map((url) => DELETE(url));
//       await Promise.all(deleteRequests);
//     }
//     if (response && response.status) {
//       Notifications["success"]({
//         message: "Success",
//         description: "Successfully updated delivery slab",
//       });
//     } else {
//       Notifications["error"]({
//         message: "Failed to update",
//         description: response.message || "Unknown error occurred.",
//       });
//     }
//     console.log("Server response:", response.data);
//   } catch (error: any) {
//     console.error("Error submitting form:", error);
//     Notifications["error"]({
//       message: "Failed to update",
//       description: error.message || "Something went wrong.",
//     });
//   }finally {
//     setLoading(false);
//   }
// };
