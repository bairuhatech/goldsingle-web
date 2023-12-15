import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import { Button, Form, Input, notification } from "antd";
import { POST, PUT, COMPRESS_IMAGE } from "../../utils/apiCalls";
import API from "../../config/API";
import TextArea from "antd/es/input/TextArea";
import ImagePicker from "../components/ImagePicker";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import moment from "moment";
const update = "update";
const CategoryUpdateModal = (props: any) => {
  const [form] = Form.useForm();
  const [Notifications, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<any>({});
  const type = props?.type;
  const fileInputRef = useRef(null);

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [aspectRatio, setAspectRatio] = useState(1 / 1);

  useEffect(() => {
    if (type == update) {
      form.setFieldsValue({
        name: props?.data?.name,
        image: props?.data?.image,
        description: props?.data?.description,
      });
    } else {
      form.resetFields();
    }
  }, [props?.data, type]);

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
        name: values?.name?.trim(),
        image: imageUrl.url,
        description: values?.description?.trim(),
      };
      const responseimg: any =
        type === update
          ? await PUT(API.CATEGORY + props?.data?.id, obj)
          : await POST(API.CATEGORY, obj);
      if (responseimg?.status) {
        Notifications["success"]({
          message: "Success",
          description: `Successfully ${type == update ? "Updated" : "Added"}`,
        });
        form.resetFields();
        props?.modalClose();
        props?.getCategory();
        setImage({});
        setCroppedImage(null);
      } else {
        Notifications["error"]({
          message: `Failed to ${type == update ? "Update" : "Add New item"}`,
          description: responseimg.message,
        });
      }
    } catch (err: any) {
      Notifications["error"]({
        message: `Failed to ${type == update ? "Update" : "Add New item"}`,
        description: err.message,
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
      title={`${type == update ? "Update" : "Add New"} Category`}
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
                message: "Please Upload image",
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
          <Input placeholder="Category Name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please Enter Description",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Description" />
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
            {type == update ? "Update" : "Add"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CategoryUpdateModal;
