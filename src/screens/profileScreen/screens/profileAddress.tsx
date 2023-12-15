import React, { useEffect, useState } from "react";
import EmptyOrders from "../components/emptyOrders";
import NoData from "../../../components/noData";
import { FaBoxOpen } from "react-icons/fa";
import Loading from "../../../components/loading";
import { FaMapLocationDot } from "react-icons/fa6";
import AddressDataTable from "../components/addressDataTable";
import PageHeader from "../../../admin/components/PageHeader";
import AddressModal from "../modal/addressModal";
import useToggle from "../../../shared/hook/useToggle";
import { Button, message } from "antd";
import API from "../../../config/API";
import { useSelector } from "react-redux";
import { DELETE, GET } from "../../../utils/apiCalls";
import { Container } from "react-bootstrap";
import { BsFillBookmarkFill } from "react-icons/bs";

const ProfileAddress = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<any>([]);
  const [openModal, toggleModal] = useToggle(false);
  const [type, setType] = useState<string>("update");
  const User = useSelector((state: any) => state.User.user);
  const [selected, setSelected] = useState<any>({});
  const [messageApi, contextHolder] = message.useMessage();
  const pageSize = 5;
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    const url = API.ADDRESS_GET + `${User.data._id}`;
    setIsLoading(true);
    try {
      const address: any = await GET(url, null);
      if (address?.status) {
        setAddress(address?.data);
      } else {
        throw new Error(address.message);
      }
    } catch (err) {
      messageApi.error(`something went wrong!`);
    } finally {
      setIsLoading(false);
    }
  };
  const getSelectedItem = (item: any) => {
    setSelected(item);
  };
  const deleteAddress = async (item: any) => {
    const url = API.ADDRESS + item?.id;
    try {
      const response: any = await DELETE(url);
      if (response?.status) {
        messageApi.success(`Address removed successfully.`);
        fetchAddresses();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      messageApi.error(`something went wrong!`);
    }
  };
  return (
    <>
      <div className="mb-3">
        {contextHolder}
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => {
              toggleModal(true);
              setType("add");
            }}
            type="primary"
          >
            Add Address +
          </Button>
        </div>
        {isLoading ? (
          <Loading />
        ) : address.length ? (
          <AddressDataTable
            toggleModal={toggleModal}
            setType={() => setType("update")}
            data={address}
            getSelected={getSelectedItem}
            delete={deleteAddress}
            pageSize={pageSize}
          />
        ) : (
          <NoData
            icon={<BsFillBookmarkFill size={70} color="#e6e6e6" />}
            header="No Address Found"
            text1={`You have not added any Address yet!`}
          />
        )}

        <AddressModal
          open={openModal}
          modalClose={() => toggleModal(false)}
          type={type}
          selected={selected}
          fetchAddress={fetchAddresses}
        />
      </div>
    </>
  );
};

export default ProfileAddress;
