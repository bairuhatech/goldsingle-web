import React from "react";
import PageHeader from "../components/PageHeader";
import DataTableEnquiry from "./dataTable";

const Enquiry = () => {
  return (
    <div>
      <PageHeader title="Enquiries" />
      <div style={{ padding: "20px" }}>
        <DataTableEnquiry />
      </div>
    </div>
  );
};

export default Enquiry;
