import React, { useEffect, useRef, useState } from "react";
import { Modal, Select } from "antd";
import { Button, Form, Input, notification } from "antd";
import { COMPRESS_IMAGE, POST, PUT } from "../../utils/apiCalls";
import API from "../../config/API";
import useFetch from "../../shared/hook/fetchData";
import ImagePicker from "../components/ImagePicker";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";

const SubCategoryUpdateModal = (props: any) => {
  const [form] = Form.useForm();
  const [Notifications, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<any>({});
  const update = "update";
  const type = props?.type;
  const fileInputRef = useRef(null);
  const { Option } = Select;
  const { data: category, isLoading: loading1 } = useFetch(API.CATEGORY, false);

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [aspectRatio, setAspectRatio] = useState(1 / 1);
  const onAspectRatioChange = (event: any) => {
    const newAspectRatio = parseFloat(event.target.value);
    setAspectRatio(newAspectRatio);
  };

  useEffect(() => {
    if (props?.type == update) {
      form.setFieldsValue({
        name: props?.data?.name,
        image: props?.data?.image,
        category_id: props?.data?.category_id,
        description: props?.data?.description,
      });
    } else {
      form.resetFields();
    }
  }, [props?.data, props?.type]);
  const formSubmitHandler = async (values: any) => {
    setIsLoading(true);
    try {
      let imageUrl = props?.data?.image;
      if (croppedImage) {
        const ImageBlob = await fetch(croppedImage).then((r) => r.blob());
        let name = moment(new Date()).unix();
        let file = new File([ImageBlob], name + "N.jpg");
        imageUrl = await COMPRESS_IMAGE(file);
      }
      const obj = {
        name: values?.name,
        image: imageUrl?.url,
        description: values?.description,
        category_id: values?.category_id,
      };
      const responseimg: any =
        props?.type === update
          ? await PUT(API.SUB_CATEGORY_EDIT + props?.data?._id, obj)
          : await POST(API.SUB_CATEGORY_EDIT, obj);
      if (responseimg?.status) {
        Notifications["success"]({
          message: "Success",
          description: `Successfully ${
            props?.type == update ? "Updated" : "Added"
          } the item`,
        });
        form.resetFields();
        props?.getSubCategory();
        props?.modalClose();
        setImage({});
        setCroppedImage(null);
      } else {
        Notifications["error"]({
          message: `Failed to ${
            props?.type == update ? "Update the Item" : "Add New Item"
          }`,
          description: responseimg.message,
        });
      }
    } catch (err) {
      Notifications["error"]({
        message: `Failed to ${
          props?.type == update ? "Update the Item" : "Add New Item"
        }`,
      });
    }
    setIsLoading(false);
  };
  const handleCrop = async () => {
    if (cropperRef.current) {
      const canvas: HTMLCanvasElement | null =
        cropperRef.current.cropper.getCroppedCanvas();
      if (canvas) {
        const croppedData = canvas.toDataURL("image/jpeg");
        setCroppedImage(croppedData);
        setCropModalOpen(false);
        try {
          // const values = await form.validateFields();
          // formSubmitHandler(values);
        } catch (error) {
          console.error("Form validation failed:", error);
        }
      }
    }
  };
  return (
    <Modal
      title={`${props?.type == update ? "Update" : "Add New"} SubCategory`}
      open={props?.open}
      okText="Update"
      centered
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      onCancel={() => {
        props?.modalClose();
        setImage({});
      }}
    >
      {contextHolder}
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        layout="vertical"
        onFinish={formSubmitHandler}
      >
        {cropModalOpen ? (
          <div className="mt-2">
            {/* <div className="aspect-ratios" onChange={onAspectRatioChange}>
          <input type="radio" value={1 / 1} name="ratio" /> 1:1
          <input type="radio" value={5 / 4} name="ratio" /> 5:4
          <input type="radio" value={4 / 3} name="ratio" /> 4:3
          <input type="radio" value={3 / 2} name="ratio" /> 3:2
          <input type="radio" value={5 / 3} name="ratio" /> 5:3
          <input type="radio" value={16 / 9} name="ratio" /> 16:9
          <input type="radio" value={3 / 1} name="ratio" /> 3:1
        </div> */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  setImage({
                    file: selectedFile,
                    url: URL.createObjectURL(selectedFile),
                  });
                  setCropModalOpen(true);
                }
              }}
            />
            <Cropper
              ref={cropperRef as React.RefObject<ReactCropperElement>}
              src={image?.url}
              style={{ height: 400, width: "100%" }}
              aspectRatio={aspectRatio}
              guides={true}
            />
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <Button type="primary" onClick={handleCrop}>
                Crop Image
              </Button>
              <Button
                style={{ marginLeft: 16 }}
                onClick={() => {
                  if (fileInputRef.current) {
                    (fileInputRef.current as any).click();
                  }
                }}
              >
                Choose Another Image
              </Button>
            </div>
          </div>
        ) : (
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please Add Image",
              },
            ]}
          >
            <ImagePicker
              onChange={(file: any) => {
                setImage(file);
                setCropModalOpen(true);
              }}
              fileURL={
                image?.url
                  ? image.url
                  : type == update
                  ? props?.data?.image
                  : null
              }
            />
          </Form.Item>
        )}
        <Form.Item
          label="Name"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Please Enter Name",
            },
          ]}
        >
          <Input placeholder="input Name" />
        </Form.Item>
        <Form.Item
          label="Description"
          name={"description"}
          rules={[
            {
              required: true,
              message: "Please Enter Description",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category_id"
          rules={[
            {
              required: true,
              message: "Please Enter Category ID",
            },
          ]}
        >
          <Select
            bordered={false}
            style={{ width: "100%" }}
            className="border rounded"
            allowClear
            defaultValue={"Select Category"}
          >
            {category?.map((item: any, index: number) => (
              <Option key={index} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="d-flex gap-2 justify-content-end">
          <Button
            onClick={() => {
              props?.modalClose();
              setImage({});
            }}
          >
            Cancel
          </Button>
          <Button type="primary" loading={isLoading} onClick={form.submit}>
            {props?.type == "add" ? "Add" : "Update"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default SubCategoryUpdateModal;
