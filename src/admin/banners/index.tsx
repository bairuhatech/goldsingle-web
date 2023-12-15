import { useEffect, useState } from "react";
import DataTable from "./dataTable";
import API from "../../config/API";
import { GET } from "../../utils/apiCalls";
import Loading from "../../components/loading";
import BannerUpdateModal from "./bannerModal";
import PageHeader from "../components/PageHeader";
import { Button, message } from "antd";
import useToggle from "../../shared/hook/useToggle";
import React from "react";

function Banners() {
  useEffect(() => {
    getBannerData();
  }, []);

  type ModalState = "add" | "update";
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [type, setType] = useState<ModalState>("add");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [meta, setMeta] = useState<any>({});
  const [toggle, toggleModal] = useToggle(false);
  const [messageApi, contextHolder] = message.useMessage();
  const getBannerData = async (page: number = 1) => {
    try {
      let url = API.BANNER_ALL + `?order=DESC&page=${page}&take=${pageSize}`;
      let response: any = await GET(url, null);
      if (response.status) {
        setBannerData(response.data);
        setLoading(false);
        setMeta(response?.meta);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      messageApi.error(`Failed to get Banners`);
    }
  };

  const receiveSelectedItem = (item: any) => {
    setSelectedItem(item);
  };

  const changePage = async (page: number, take: number) => {
    await getBannerData(page);
    setPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <PageHeader title="Banners">
        {contextHolder}
        <Button
          onClick={() => {
            toggleModal(true);
            setType("add");
          }}
          type="primary"
        >
          Add Banners +
        </Button>
      </PageHeader>
      {loading && loading ? (
        <Loading />
      ) : (
        <DataTable
          data={bannerData}
          getBannerData={getBannerData}
          getBanner={getBannerData}
          closeModal={() => toggleModal(false)}
          openModal={() => toggleModal(true)}
          getSelectedItem={receiveSelectedItem}
          changeType={() => setType("update")}
          page={page}
          pageSize={pageSize}
          meta={meta}
          changePage={changePage}
        />
      )}
      <BannerUpdateModal
        open={toggle}
        modalClose={() => {
          toggleModal(false);
        }}
        data={selectedItem}
        getBanner={getBannerData}
        type={type}
        page={page}
      />
    </div>
  );
}
export default Banners;
