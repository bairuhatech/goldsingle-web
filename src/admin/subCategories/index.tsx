import API from "../../config/API";
import DataTable from "./DataTable";
import { GET } from "../../utils/apiCalls";
import { useEffect, useState } from "react";
import AdminLoading from "../components/AdminLoading";
import PageHeader from "../components/PageHeader";
import { Button } from "antd";
import SubCategoryUpdateModal from "./subCategoryModal";
import useToggle from "../../shared/hook/useToggle";
import React from "react";
type ModalState = "add" | "update";
function SubCategories() {
  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toggle, toggleModal] = useToggle(false);
  const [type, setType] = useState<ModalState>("add");
  const [selectedItem, setSelectedItem] = useState<any>({});
  const pageSize = 10;
  useEffect(() => {
    getSubCategory();
  }, []);

  const getSubCategory = async () => {
    try {
      let url = API.SUB_CATEGORY;
      let response: any = await GET(url, null);
      if (response?.status) setSubCategory(response?.data);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const receiveData = (_record: any) => {
    setSelectedItem(_record);
  };
  return (
    <>
      <PageHeader title="SubCategories">
        <Button
          onClick={() => {
            toggleModal(true);
            setType("add");
          }}
          type="primary"
        >
          Add Subcategory +
        </Button>
      </PageHeader>
      {isLoading ? (
        <AdminLoading />
      ) : (
        <DataTable
          data={subCategory}
          openModal={() => toggleModal(true)}
          changeType={() => setType("update")}
          receiveData={receiveData}
          getSubCategory={getSubCategory}
          pageSize={pageSize}
        />
      )}
      <SubCategoryUpdateModal
        open={toggle}
        modalClose={() => toggleModal(false)}
        data={selectedItem}
        getSubCategory={getSubCategory}
        type={type}
      />
    </>
  );
}
export default SubCategories;
