import API from "../../config/API";
import DataTable from "./DataTable";
import { useEffect, useState } from "react";
import AdminLoading from "../components/AdminLoading";
import { Button, Form, Input, Modal, notification } from "antd";
import PageHeader from "../components/PageHeader";
import CategoryUpdateModal from "./categoryModal";
import useFetch from "../../shared/hook/fetchData";
import useToggle from "../../shared/hook/useToggle";
import { useSelector } from "react-redux";
import React from "react";
type ModalState = "add" | "update";
function Categories() {
  const [Notifications, contextHolder] = notification.useNotification();
  const [toggle, toggleModal] = useToggle(false);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [type, setType] = useState<ModalState>("add");
  const [page, setPage] = useState(1);
  const Settings = useSelector((state: any) => state.Settings);
  const pageSize = 10;
  const {
    data: category,
    isLoading,
    meta,
    fetchData,
    error,
    message,
  } = useFetch(API.CATEGORY_ALL, true, pageSize);

  useEffect(() => {
    if (error) {
      Notifications["error"]({
        message: "Failed to Get Categories",
        description: message,
      });
    }
  }, [error]);

  const receiveSelectedItem = (item: any) => {
    setSelectedItem(item);
  };
  const changePage = async (page: number, take: number) => {
    await fetchData(page);
    setPage(page);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="">
        {contextHolder}
        <PageHeader title="Categories">
        <Button
          onClick={() => {
            toggleModal(true);
            setType("add");
          }}
          type="primary"
        >
          Add Category +
        </Button>
        </PageHeader>
        {isLoading ? (
          <AdminLoading />
        ) : (
          <DataTable
            data={category}
            getCategory={fetchData}
            openModal={() => toggleModal(true)}
            getSelectedItem={receiveSelectedItem}
            changeType={() => setType("update")}
            page={page}
            pageSize={pageSize}
            changePage={changePage}
            meta={meta}
          />
        )}
      </div>
      <CategoryUpdateModal
        open={toggle}
        modalClose={() => toggleModal(false)}
        data={selectedItem}
        getCategory={()=>fetchData(page)}
        type={type}
        page={page}
      />
    </>
  );
}
export default Categories;
