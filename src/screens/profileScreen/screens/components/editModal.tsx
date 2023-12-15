import React from "react";
import { Modal } from "antd";
import "../../styles.scss";

const EditModal = (props: any) => {
  return (
    <div>
      <Modal open={props.open} onCancel={props.close} centered footer={null}>
        {props.ui}
      </Modal>
    </div>
  );
};

export default EditModal;
