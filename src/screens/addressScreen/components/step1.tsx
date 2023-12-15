import React, { useEffect, useState } from "react";
import AdressCard from "./addressCard";
import "../style.scss";
import Loading from "../../../components/loading";
import NoData from "../../../components/noData";
import { MdAdd } from "react-icons/md";
import AddressModal from "../../profileScreen/modal/addressModal";
function Step1(props: any) {
  const [openModal, toggleModal] = useState(false);
  return (
    <>
      <div className="bg-light d-flex justify-content-between align-items-center pe-2">
        <h5 className="py-2   text-dark ps-3 my-0  rounded">Delivery Address</h5>
        <span
          className=" address-font-size-small Header-desk-menu2 add text-dark"
          onClick={() => toggleModal(true)}
        >
          <span>
            {" "}
            <MdAdd color="black" size={20} />
          </span>
          Add New Address
        </span>
      </div>
      {props?.loading ? (
        <Loading />
      ) : props?.address?.length ? (
        <>
          {props?.address.map((item: any, index: number) => (
            <AdressCard
              key={index}
              data={item}
              selectAddress={props?.getSelectedAddress}
              selected={props?.selectedAddress}
            />
          ))}
        </>
      ) : (
        <NoData text1={"No Address Found"} />
      )}
      <AddressModal
        open={openModal}
        modalClose={() => toggleModal(false)}
        type={"add"}
        fetchAddress={props?.fetchAddress}
      />
    </>
  );
}

export default Step1;
