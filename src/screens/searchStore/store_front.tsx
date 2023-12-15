import { Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Loading from "../../components/loading";
import ProductItem from "../../components/Product_Item";
import { Col } from "react-bootstrap";
import NoData from "../../components/noData";
import { useParams, useSearchParams } from "react-router-dom";
import API from "../../config/API";
import { GET } from "../../utils/apiCalls";
import StoreAllProducts from "../../components/storeAllProducts/storeAllProducts";
function StoreFront() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const storeId = params.store;
  const getProductsByStore = async () => {
    setLoading(true);
    const url = API.STORE_SEARCH_GETALL + storeId;
    if (storeId) {
      try {
        const response: any = await GET(url, null);
        if (response.status) {
          setProducts(response?.data);
        } else throw new Error(response.message);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getProductsByStore();
  }, []);
  return (
    <div className="mt-3">
      {loading ? (
        <Loading />
      ) : products.length ? (
        products.map((item: any) => <StoreAllProducts data={item} />)
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default StoreFront;
