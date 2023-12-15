import { Modal, Button, Input, message, Spin } from "antd";
import React, { useState } from "react";
import API from "../../../../config/API";
import { POST } from "../../../../utils/apiCalls";
import { useSelector } from "react-redux";

const EmailVerificationModal = (props: any) => {
  const User = useSelector((state: any) => state.User.user);
  const [emailToVerify, setEmailToVerify] = useState(User?.data?.email || "");
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const sendVerificationEmail = async () => {
    try {
      setLoading(true);
      const response: any = await POST(API.USER_EMAIL_VERIFY, {
        userId: User?.data?._id,
      });

      if (response?.status) {
        messageApi.success(`Verification mail sent successfully. Check your mailbox`);
        props?.onClose();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      messageApi.error(`something went wrong!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Verify Email"
        visible={props?.visible}
        onCancel={props?.onClose}
        footer={[
          <Button key="cancel" onClick={props?.onClose}>
            Cancel
          </Button>,
          <Button
            key="send"
            type="primary"
            onClick={sendVerificationEmail}
            disabled={loading}
          >
            {loading ? <Spin /> : "Send Verification Email"}
          </Button>,
        ]}
      >
        <p>Please enter your email to receive verification:</p>
        <Input
          value={emailToVerify}
          onChange={(e) => setEmailToVerify(e.target.value)}
          disabled
        />
      </Modal>
    </>
  );
};

export default EmailVerificationModal;
