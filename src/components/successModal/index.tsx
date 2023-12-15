import { Modal, Button } from "antd";
import SUCCESS from "../../assets/images/success.svg";
import "./style.scss";
import React from "react";
function SuccessModal(props: any) {
  return (
    <Modal visible={props.visible} onCancel={props.onCancel} footer={false}>
      <div className="SuccessModal-modal">
        <div className="SuccessModal-modal-txt1">{props.title}</div>
        <br />
        <img src={SUCCESS} className="SuccessModal-image1" />
        <br />
        <div className="SuccessModal-modal-txt2">{props.body}</div>
        <br />
        <div>
          <Button type="default" onClick={() => props.onButtonClick()}>{props.buttonText}</Button>
        </div>
      </div>
    </Modal>
  );
}

export default SuccessModal;
