import React from "react";
import { Route, Routes } from "react-router-dom";
import Firstpage from "./store_search";
import SecondPage from "./store_categories";
import StoreSearchPage from "./store_search";
import StoreFront from "./store_front";

function StoreMainArea() {
  return (
    <div className="mt-md-3">
      <Routes>
        <Route path="/search" element={<StoreSearchPage />} />;
        <Route path="/categories" element={<SecondPage />} />;
        <Route path="/main" element={<StoreFront />} />;
      </Routes>
    </div>
  );
}

export default StoreMainArea;
