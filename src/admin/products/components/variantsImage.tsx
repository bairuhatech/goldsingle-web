import moment from "moment";
import React from "react";
import Dropzone from "react-dropzone";
import { IoImagesOutline } from "react-icons/io5";

const VariantsImage = (props: any) => {
  const handleDrop = (acceptedFiles: any) => {
    var myFile = acceptedFiles[0];
    let name = moment(new Date()).unix();
    const myNewFile = new File([myFile], name + "N.png", { type: myFile.type });
    const url = URL.createObjectURL(myNewFile);
    let obj = {
      file: myNewFile,
      url: url,
    };
    props.onChange(obj);
  };

  return (
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps({ className: "AddProducts-VariantsImage" })}>
            <input {...getInputProps()} />

            {props.fileURL ? (
              <>
                <img
                  src={props.fileURL}
                  className="AddProducts-VariantsImageImg"
                />
              </>
            ) : (
              <>
                <IoImagesOutline size={20} />
              </>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default VariantsImage;
