import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ImagePicker from "../components/ImagePicker";
import { Button, Alert } from "antd";
import { IoAddCircleOutline } from "react-icons/io5";
import moment from "moment";
import React from "react";
function Images(props: any) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(
    props?.data.length
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
      console.log("submit");
      props.onChange(data);
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
        <Row>
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
          <Button size="large" block onClick={() => props?.onBack()}>
            Back
          </Button>
        </Col>
        <Col sm={4}>
          <Button
            size="large"
            block
            type="primary"
            htmlType="submit"
            onClick={() => submit()}
          >
            Continue
          </Button>
        </Col>
      </Row>
    </div>
  );
}
export default Images;
