import React from "react";
import { Modal, Button } from "antd";

interface RegistrationCompleteModalProps {
  isVisible: boolean;
  onModalClose: () => void;
  onBackToHomePage: () => void;
}

const RegistrationCompleteModal: React.FC<RegistrationCompleteModalProps> = ({
  isVisible,
  onModalClose,
  onBackToHomePage,
}) => {
  return (
    <Modal
      title="Registration Completed"
      visible={isVisible}
      onOk={onModalClose}
      onCancel={onModalClose}
      footer={[
        <Button type="primary" onClick={onBackToHomePage}>
          Back to Home
        </Button>
      ]}
    >
      Congratulations! You have become a Gold Bazar seller.
    </Modal>
  );
};

export default RegistrationCompleteModal;
