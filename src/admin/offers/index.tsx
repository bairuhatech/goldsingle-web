import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import useToggle from "../../shared/hook/useToggle";
import { Button } from "antd";
import DataTable from "./dataTable";
import API from "../../config/API";
import { GET } from "../../utils/apiCalls";
import Loading from "../../components/loading";
import NoData from "../../components/noData";
import OffersModal from "./offersModal";
import { metaType, offersType } from "../../shared/types/types";
type ModalState = "add" | "update";
function Offers() {
  const [toggle, toggleModal] = useToggle(false);
  const [type, setType] = useState<ModalState>("add");
  const [offers, setOffers] = useState<offersType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<offersType>();
  const pageSize = 10;
  const [page, setPage] = useState<number>(1);
  const [meta, setMeta] = useState<metaType>();
  const getOffers = async (page: number = 1) => {
    const url = API.OFFERS + `?order=ASC&page=${page}&take=${pageSize}`;
    setIsLoading(true);
    try {
      const offers: any = await GET(url, null);
      if (offers.status) {
        setOffers(offers?.data);
        setMeta(offers?.meta);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const receiveSelectedItem = (item: any) => {
    setSelectedItem(item);
  };
  const changePage = async (page: number) => {
    await getOffers(page);
    setPage(page);
  };
  useEffect(() => {
    getOffers();
  }, []);
  return (
    <div>
      <PageHeader title="Offers">
        <Button
          onClick={() => {
            toggleModal(true);
            setType("add");
          }}
          type="primary"
        >
          Add Offers +
        </Button>
      </PageHeader>
      {isLoading ? (
        <Loading />
      ) : offers.length ? (
        <DataTable
          data={offers}
          getOffers={getOffers}
          changeType={() => setType("update")}
          openModal={() => toggleModal(true)}
          getSelectedItem={receiveSelectedItem}
          pageSize={pageSize}
          meta={meta}
          page={page}
          changePage={changePage}
        />
      ) : (
        <NoData />
      )}
      <OffersModal
        open={toggle}
        modalClose={() => toggleModal(false)}
        type={type}
        data={selectedItem}
        getOffers={getOffers}
        page={page}
      />
    </div>
  );
}

export default Offers;
