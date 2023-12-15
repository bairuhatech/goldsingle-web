import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ImagePicker from "../components/ImagePicker";
import { Button, Alert } from "antd";
import { IoAddCircleOutline } from "react-icons/io5";
import moment from "moment";
import React from "react";
function EditImages(props: any) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [removeImg, setRemoveImg] = useState<any[]>([]);
  const [data, setData] = useState<any>(
    props?.data?.length
      ? props?.data
      : [
          {
            id: moment(new Date()).unix(),
            type: "img",
            file: "",
            url: "",
          },
        ]
  );
  const submit = async () => {
    try {
      props.onChange(data, removeImg);
    } catch (err) {
      console.log("err", err);
    }
  };

  const CreateNewImage = async () => {
    try {
      setLoading(true);
      console.log("CreateNewImage");
      let arr = data;
      let obj = {
        id: moment(new Date()).unix(),
        type: "img",
        file: "",
        url: "",
        s3_url: "",
      };
      arr.push(obj);
      setData(arr);
      setTimeout(() => {
        setLoading(false);
      }, 5);
    } catch (err) {
      console.log("CreateNewImage ,err", err);
    }
  };

  const removeNewImage = async (index: number) => {
    try {
      setLoading(true);
      let arr = data;
      arr.splice(index, 1);
      setData(arr);
      setTimeout(() => {
        setLoading(false);
      }, 5);
    } catch (err) {
      console.log("CreateNewImage ,err", err);
    }
  };

  const updateImage = (value: any, index: number) => {
    try {
      setLoading(true);
      let arr = data;
      const item: any = arr[index];
      item["file"] = value.file;
      item["url"] = value.url;
      arr[index] = item;
      setData(arr);
      setTimeout(() => {
        setLoading(false);
      }, 5);
    } catch (err) {
      console.log("updateImage ,err", err);
    }
  };
  //=================================================getting images tobe removed from db
  const removeImageFromDb = (item: any, index: number) => {
    const array = [...images];
    array.splice(index, 1);
    setImages(array);
    setRemoveImg((all) => [...all, item]);
  };
  useEffect(() => {
    setImages(props?.product?.productImages);
    setData([
      {
        id: moment(new Date()).unix(),
        type: "img",
        file: "",
        url: "",
      },
    ]);
    setRemoveImg([]);
  }, [props?.product?.productImages]);
  return (
    <div>
      <div style={{ minHeight: "64vh" }}>
        <Alert
          message="Follow below guid to reduce quality check failure"
          description={
            <ul>
              <li>
                Products must fill at least 85% of the image. Images must show
                only the product that is for sale, with few or no props
              </li>
              <li>
                Images may only contain text that is a part of the product. •
                Main images must have a pure white background, must be a photo
                (not a drawing), and must not contain excluded accessories.
              </li>
              <li>
                JPEG is the preferred image format, but you also may use TIFF
                and GIF files.
              </li>
            </ul>
          }
          type="warning"
          closable
        />
        <br />
        {images?.length == 0 && data[0]?.url == "" ? (
          <Alert
            message="No Images Are available for this product. Please choose new
            images using the Imagepicker given below."
            type="info"
            closable
          />
        ) : null}
        <Row className="mt-2">
          {images?.map((item: any, index: number) => {
            return (
              <Col sm={3}>
                <ImagePicker
                  size={"lagre"}
                  fileURL={item.url}
                  remove={() => removeImageFromDb(item, index)}
                  onChange={(value: any) => updateImage(value, index)}
                />
              </Col>
            );
          })}
          {data?.map((item: any, index: number) => {
            return (
              <Col sm={3}>
                <ImagePicker
                  size={"lagre"}
                  fileURL={item.url}
                  remove={() => removeNewImage(index)}
                  onChange={(value: any) => updateImage(value, index)}
                />
              </Col>
            );
          })}
          <Col sm={3}>
            <div
              className="AddProducts-newImagBox"
              onClick={() => CreateNewImage()}
            >
              <IoAddCircleOutline size={40} />
              <div>Add New</div>
            </div>
          </Col>
        </Row>
      </div>

      <br />
      <Row>
        <Col sm={6}></Col>
        <Col sm={2}>
          {/* <Button size="large" block onClick={() => props?.onBack()}>
            Back
          </Button> */}
        </Col>
        <Col sm={4}>
          <Button
            size="large"
            block
            type="primary"
            htmlType="submit"
            onClick={() => submit()}
            loading={props?.isLoading}
          >
            {data[0]?.url || removeImg.length
              ? "Update images"
              : "Select Images"}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
export default EditImages;
