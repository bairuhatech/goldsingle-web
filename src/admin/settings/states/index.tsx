import { useEffect, useState } from "react";
import useToggle from "../../../shared/hook/useToggle";
import { GET } from "../../../utils/apiCalls";
import API from "../../../config/API";
import { Button } from "antd";
import StatesTable from "./table";
import FormStatesModal from "./formModal";
import React from "react";

function States(props: any) {
  const [page, setPage] = useState(1);
  type ModalState = "add" | "update";
  const [stateData, setStateData] = useState<any[]>([]);
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

  const getStatesData = async (page: number) => {
    try {
      let url = API.STATES;
      console.log(url,"asdasd");
      let response: any = await GET(url, null);

      if (response.status) {
        console.log(response);
        setStateData(response.data);
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
      await getStatesData(page);
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
        Add States +
      </Button>
      <StatesTable
        data={stateData}
        getStatesData={getStatesData}
        getStates={getStatesData}
        closeModal={() => toggleModal(false)}
        openModal={openModal}
        getSelectedItem={receiveSelectedItem}
        changeType={() => setType("update")}
        page={page}
        pageSize={pageSize}
        meta={meta}
        changePage={changePage}
      />
      <FormStatesModal
        open={toggle}
        modalClose={() => {
          toggleModal(false);
        }}
        data={selectedItem}
        getStates={getStatesData}
        type={type}
        page={page}
      />
    </div>
  );
}
export default States;
