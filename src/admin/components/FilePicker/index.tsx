import moment from "moment";
// import "./styles.scss";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { Button, Upload } from "antd";
import React from "react";
const FilePicker = (props: any) => {
  const handleDrop = (acceptedFiles: any) => {
    const selectedFile = acceptedFiles[0];
    props.onSubmit(selectedFile); // Pass the selected file to the parent component
  };
  return (
    <div className="ImagePicker">
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps({ className: "ImagePicker" })}>
              <input {...getInputProps()} />
              {props.fileName ? (
                <>
                  <p className="text-success">{props?.fileName}</p>
                </>
              ) : (
                <>
                  <p className="ImagePickertxt2">
                    Drag 'n' drop file here, or click to select files
                  </p>
                </>
              )}
              <Button type="primary">Choose file . . .</Button>
              {/* <input
                type="button"
                value="Choose file . . ."
                className="ImagePickerbtn ms-2"
              /> */}
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};
export default FilePicker;
