import React, { useEffect, useRef, useState } from "react";
import { Alert, Modal } from "antd";
import { Button, Form, Input, notification } from "antd";
import { COMPRESS_IMAGE, POST, PUT } from "../../utils/apiCalls";
import API from "../../config/API";

import ImagePicker from "../components/ImagePicker";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import Cropper, { ReactCropperElement } from "react-cropper";
import moment from "moment";
import "cropperjs/dist/cropper.css";
import "./style.scss";

const update = "update";
const BannerUpdateModal = (props: any) => {
  const [form] = Form.useForm();
  const [Notifications, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const type = props?.type;
  const [image, setImage] = useState<any>({});
  const User = useSelector((state: any) => state.User.user);
  const fileInputRef = useRef(null);

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [aspectRatio, setAspectRatio] = useState(4 / 1);
  const onAspectRatioChange = (event: any) => {
    const newAspectRatio = parseFloat(event.target.value);
    setAspectRatio(newAspectRatio);
  };
  const [alertVisible, setAlertVisible] = useState(true);
  const handleAlertClose = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    if (type == update) {
      form.setFieldsValue({
        description: props?.data?.description,
        img_mob: props?.data?.img_mob,
        img_desk: props?.data?.img_desk,
        title: props?.data?.title,
      });
    } else {
      form.resetFields();
    }
  }, [props.data, type]);
  const formSubmitHandler = async (values: any) => {
    const url = type == update ? API.BANNER + props?.data?.id : API.BANNER;
    setIsLoading(true);

    try {
      let imageUrl = props?.data?.img_desk;
      if (croppedImage) {
        const ImageBlob = await fetch(croppedImage).then((r) => r.blob());
        let name = moment(new Date()).unix();
        let file = new File([ImageBlob], name + "N.jpg");
        imageUrl = await COMPRESS_IMAGE(file);
      }
      const obj = {
        description: values?.description,
        img_mob: "",
        storeId: User?.data?.store_id,
        img_desk: imageUrl.url,
        status: true,
        title: values?.title,
      };

      const responseImg: any =
        type === update
          ? await PUT(API.BANNER + props?.data?.id, obj)
          : await POST(API.BANNER, obj);

      if (responseImg.status) {
        Notifications["success"]({
          message: "Success",
          description: `Successfully ${
            type === update ? "updated" : "Added"
          } the item`,
        });
        form.resetFields();
        props?.modalClose();
        props?.getBanner(props?.page);
        setImage({});
        setCroppedImage(null);
      } else {
        Notifications["error"]({
          message: `Failed to ${type === update ? "Update" : "Add New Item"}`,
        });
      }
    } catch (err: any) {
      Notifications["error"]({
        message: `Failed to ${type === update ? "Update" : "Add New Item"}`,
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
      }
    }
  };

  return (
    <Modal
      title={`${type === update ? "Update" : "Add New"} Banner`}
      open={props?.open}
      onOk={form.submit}
      onCancel={() => {
        props?.modalClose();
        setImage({});
      }}
      okText="Update"
      centered
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      {contextHolder}

      {alertVisible && (
        <Alert
          className="small"
          message="Follow below guide before uploading image"
          description={
            <ul>
              <li>
                Use images with light background to highlight the text
                description and title.
              </li>
              <li>
                Banner images are cropped to 4:1 ratio for better visibility.
              </li>
              <li>
                Preferred image formats are JPEG, JPG, or PNG and avoid file
                sizes bigger than 5MB.
              </li>
            </ul>
          }
          type="warning"
          closable
          onClose={handleAlertClose}
        />
      )}
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
              <Button
                style={{ marginRight: 16 }}
                onClick={() => {
                  if (fileInputRef.current) {
                    (fileInputRef.current as any).click();
                  }
                }}
              >
                Choose Another Image
              </Button>
              <Button type="primary" onClick={handleCrop}>
                Crop Image
              </Button>
            </div>
          </div>
        ) : (
          <Form.Item
            name={"img_desk"}
            label="Banner Image"
            rules={[
              {
                required: true,
                message: "Please Select Image",
              },
            ]}
          >
            <ImagePicker
              size={true}
              onChange={(file: any) => {
                setImage(file);
                setCropModalOpen(true);
              }}
              fileURL={
                image.file || croppedImage
                  ? croppedImage || image.url
                  : type === update
                  ? props?.data?.img_desk
                  : null
              }
            />
          </Form.Item>
        )}
        <Form.Item
          label="Title"
          name="title"
          className="small"
          rules={[
            {
              required: true,
              message: "Please Enter Title",
            },
          ]}
        >
          <Input placeholder="Title" />
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
            {type === update ? "Update" : "Add"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default BannerUpdateModal;
