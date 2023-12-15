import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Form, notification, message } from "antd";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import ImagePicker from "../../../../admin/components/ImagePicker";
import API from "../../../../config/API";
import { useDispatch, useSelector } from "react-redux";
import { COMPRESS_IMAGE, POST, PUT } from "../../../../utils/apiCalls";
import moment from "moment";
import { update } from "../../../../redux/slices/userSlice";

const EditProfilePhoto = (props: any) => {
  const User = useSelector((state: any) => state.User.user);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [image, setImage] = useState<any>({});
  const fileInputRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const handleCrop = async () => {
    if (cropperRef.current) {
      const croppedData = cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL();
      setCroppedImage(croppedData);
      setCropModalOpen(false);
    }
  };

  const formSubmitHandler = async (values: any) => {
    setIsLoading(true);
    const url = API.USER_PHOTO_UPDATE + `${User.data._id}`;
    try {
      let imageUrl: any;
      if (croppedImage) {
        const ImageBlob = await fetch(croppedImage).then((r) => r.blob());
        let name = moment(new Date()).unix();
        let file = new File([ImageBlob], name + "N.jpg");
        imageUrl = await COMPRESS_IMAGE(file);
      }
      const obj = {
        image: imageUrl.url,
      };
      const responseImg: any = await PUT(url, obj);
      if (responseImg.status) {
        messageApi.success(`Profile Picture updated successfully.`);
        dispatch(update(responseImg?.data));
        setTimeout(() => {
          form.resetFields();
          props?.close();
          setImage({});
          setCroppedImage(null);
        }, 1000);
      } else {
        messageApi.error(responseImg?.message);
      }
    } catch (err: any) {
      messageApi.error("Something went wrong. please try again");
    }
    setIsLoading(false);
  };

  return (
    <Modal
      title="Upload Profile Image"
      open={props?.open}
      onOk={form.submit}
      onCancel={() => {
        props?.close();
        setImage({});
      }}
      okText="Update"
      centered
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      {contextHolder}
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        layout="vertical"
        onFinish={formSubmitHandler}
      >
        {cropModalOpen ? (
          <>
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
              ref={cropperRef}
              src={image?.url}
              style={{ height: 400, width: "100%" }}
              aspectRatio={1 / 1}
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
              <div className="mb-2"></div>
            </div>
          </>
        ) : (
          <Form.Item
            name={"image"}
            label="Profile Image"
            rules={[
              {
                required: true,
                message: "Please Select Image",
              },
            ]}
          >
            <ImagePicker
              onChange={(file: any) => {
                setImage(file);
                setCropModalOpen(true);
              }}
              fileURL={
                croppedImage
                  ? croppedImage
                  : User?.data?.image
                  ? User?.data?.image
                  : ""
              }
            />
          </Form.Item>
        )}
        <div className="d-flex gap-2 justify-content-end">
          <Button
            onClick={() => {
              props?.close();
              setImage({});
            }}
          >
            Cancel
          </Button>
          <Button type="primary" loading={isLoading} onClick={form.submit}>
            Add
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProfilePhoto;
