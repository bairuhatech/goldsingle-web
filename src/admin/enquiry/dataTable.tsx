import React, { useEffect, useState } from "react";
import { Popover, Table, notification } from "antd";
import API from "../../config/API";
import { AiOutlineEye } from "react-icons/ai";
import { Modal } from "antd";
import "./styles.scss";
function DataTableEnquiry(props: any) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Notifications, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: () => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
            onClick={showModal}
          >
            <AiOutlineEye cursor="pointer" size={25} color="#a10244" />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    setLoading(true);

    const getEnquiry = async () => {
      let url = API.BASE_URL + API.ENQUIRY_GET;
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();

        setData(responseData);
        console.log(responseData, "responseData");

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    getEnquiry();
  }, []);

  return (
    <div>
      {contextHolder}

      <Table
        size="small"
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey={(data: any) => data?.id}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setSelectedRecord(record);
              showModal();
            },
          };
        }}
        pagination={false}
      />

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered>
        <div>
          <p className="dataTableEnquiry-Box1">Connect With Us Details</p>
          {selectedRecord && (
            <>
              <div className="dataTableEnquiry-Box2">
                <p className="dataTableEnquiry-Box3">
                  <div className="dataTableEnquiry-Txt1">Email</div>
                  <div className="dataTableEnquiry-Txt3">
                    :&nbsp; {selectedRecord.email}
                  </div>
                </p>
                <p className="dataTableEnquiry-Box3">
                  <div className="dataTableEnquiry-Txt2">Message</div>
                  <div className="dataTableEnquiry-Txt3">
                    :&nbsp; {selectedRecord.message}
                  </div>
                </p>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default DataTableEnquiry;
