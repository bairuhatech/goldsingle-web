import { useEffect, useState } from "react";
import useToggle from "../../../shared/hook/useToggle";
import { GET } from "../../../utils/apiCalls";
import API from "../../../config/API";
import { Button } from "antd";
import FormModal from "./formModal";
import BusinessTypeTable from "./table";
import React from "react";

function BusinessType(props: any) {
  const [page, setPage] = useState(1);
  type ModalState = "add" | "update";
  const [businesstypeData, setBusinesstypeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [type, setType] = useState<ModalState>("add");
  const pageSize = 10;
  const [meta, setMeta] = useState<any>({});
  const [toggle, toggleModal] = useToggle(false);
  const openModal = (item: any) => {
    setSelectedItem(item);
    toggleModal(true);
  };

  const getBusinesstypeData = async (page: number) => {
    try {
      let url = API.BUSINESS_TYPE;
      let response: any = await GET(url, null);

      if (response.status) {
        console.log(response);
        setBusinesstypeData(response.data);
        setMeta(response?.meta);
      } else {
        console.log("couldn't get the data");
      }
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchData = async () => {
    try {
      await getBusinesstypeData(page);
    } catch (err) {
      console.log("error", err);
    }
  };
  useEffect(() => {
    let isMounted = true;

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [page, pageSize]);
  const receiveSelectedItem = (item: any) => {
    setSelectedItem(item);
  };

  const changePage = (newPage: number, pageSize: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Button
        onClick={() => {
          toggleModal(true);
          setType("add");
        }}
        type="primary"
      >
        Add BusinessType +
      </Button>
      <BusinessTypeTable
        data={businesstypeData}
        getBusinesstypeData={getBusinesstypeData}
        getBusinesstype={getBusinesstypeData}
        closeModal={() => toggleModal(false)}
        openModal={openModal}
        getSelectedItem={receiveSelectedItem}
        changeType={() => setType("update")}
        page={page}
        pageSize={pageSize}
        meta={meta}
        changePage={changePage}
      />

      <FormModal
        open={toggle}
        modalClose={() => {
          toggleModal(false);
        }}
        data={selectedItem}
        getBusinesstype={getBusinesstypeData}
        type={type}
        page={page}
      />
    </div>
  );
}
export default BusinessType;
