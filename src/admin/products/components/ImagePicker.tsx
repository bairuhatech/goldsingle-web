import { useRef, useState } from "react";
import moment from "moment";
import Dropzone from "react-dropzone";
import { Button, Modal } from "antd";
import { BsCloudUpload } from "react-icons/bs";
import Cropper, { ReactCropperElement } from "react-cropper";
import { IoImagesOutline } from "react-icons/io5";
import { Row, Col } from "react-bootstrap";
import { GrPowerReset } from "react-icons/gr";
import { IoRemoveCircle } from "react-icons/io5";
import React from "react";

const ImagePicker = (props: any) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [cropup, setCropup] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1 / 1);
  const [orginFile, setOrginFile] = useState<any>(null);
  const [cropedimage, setCropedImage] = useState<any>({});

  const reset = () => {
    setOrginFile(null);
    setCropedImage(null);
  };

  const handleDrop = (acceptedFiles: any) => {
    var myFile = acceptedFiles[0];
    let name = moment(new Date()).unix();
    const myNewFile = new File([myFile], name + "N.png", { type: myFile.type });
    const url = URL.createObjectURL(myNewFile);
    let obj = {
      file: myNewFile,
      url: url,
    };
    setOrginFile(obj);
  };

  const handleCrop = async () => {
    try {
      if (cropperRef.current) {
        const canvas: HTMLCanvasElement | null =
          cropperRef.current.cropper.getCroppedCanvas();
        if (canvas) {
          const croppedData = canvas.toDataURL("image/jpeg");
          GenerateFile(croppedData);
        }
      }
    } catch (error) {
      console.error("Form validation failed:", error);
    }
  };

  const GenerateFile = async (blob: any) => {
    try {
      if (blob) {
        const croppedImageBlob = await fetch(blob).then((r) => r.blob());
        let name = moment(new Date()).unix();
        let myNewFiles = new File([croppedImageBlob], name + "N.jpg", {
          type: "image/jpeg",
        });
        const url = URL.createObjectURL(myNewFiles);
        let obj = {
          file: myNewFiles,
          url: url,
        };
        props.onChange(obj);
        setCropup(false);
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {props?.size === "small" ? (
        <div
          className="AddProducts-VariantsImage"
          onClick={() => setCropup(true)}
        >
          {props.fileURL ? (
            <>
              <img
                src={props.fileURL}
                className="AddProducts-VariantsImageImg"
              />
            </>
          ) : (
            <IoImagesOutline size={20} />
          )}
        </div>
      ) : (
        <div className="AddProducts-ImagePicker">
          <div
            className="AddProducts-ImagePickerClose"
            onClick={() => props.remove()}
          >
            <IoRemoveCircle size={25} color="red" />
          </div>
          {props.fileURL ? (
            <>
              <img src={props.fileURL} className="AddProducts-imagePickerImg" />
            </>
          ) : (
            <div onClick={() => setCropup(true)}>
              <BsCloudUpload size={30} />
              <div>Drag or click to select files</div>
              <div style={{ fontSize: 10 }}>Image or video </div>
              <Button type="dashed" size="small">
                Choose file . . .
              </Button>
            </div>
          )}
        </div>
      )}
      {cropup ? (
        <Modal
          title={<span style={{ fontSize: 20 }}>Select Image</span>}
          open={cropup}
          footer={false}
          onCancel={() => setCropup(false)}
          centered
          width={550}
        >
          {orginFile ? (
            <Cropper
              ref={cropperRef as React.RefObject<ReactCropperElement>}
              src={orginFile?.url}
              style={{ height: 400, width: "100%" }}
              aspectRatio={aspectRatio}
              guides={true}
            />
          ) : (
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    {...getRootProps({
                      className: "AddProducts-ImagePickerBox",
                    })}
                  >
                    <input {...getInputProps()} />
                    <div>Drag or click to select files</div>
                    <div style={{ fontSize: 10 }}>Image or video </div>
                    <IoImagesOutline size={70} />
                  </div>
                </section>
              )}
            </Dropzone>
          )}

          <br />
          <Row>
            <Col sm={2}>
              <Button size="large" block onClick={() => reset()}>
                <GrPowerReset size={20} color="red" />
              </Button>
            </Col>
            <Col sm={4}></Col>
            <Col sm={2}>
              <Button
                size="large"
                block
                danger
                onClick={() => {
                  setCropup(false);
                  reset();
                }}
              >
                Close
              </Button>
            </Col>
            <Col sm={4}>
              <Button
                size="large"
                block
                type="primary"
                onClick={() => handleCrop()}
              >
                Done
              </Button>
            </Col>
          </Row>
        </Modal>
      ) : null}
    </>
  );
};

export default ImagePicker;
