import { useState, useEffect } from "react";
import axios from "axios";
function ContentTwo() {
  const [goldPrice, setGoldPrice] = useState([]);
  const [silverPrice, setSilverPrice] = useState([]);
  const [palladiumPrice, setPalladiumPrice] = useState([]);
  const [platinumPrice, setPlatinumPrice] = useState([]);
  const [goldPerformance, setGoldPerformance] = useState([]);
  const [silverPerformance, setSilverPerformance] = useState([]);
  const [palladiumPerformance, setPalladiumPerformance] = useState([]);
  const [platinumPerformance, setPlatinumPerformance] = useState([]);
  const [currency, setCurrency] = useState("AED");
  const [goldBuyingPrice, setGoldBuyingPrice] = useState([]);
  const [silverBuyingPrice, setSilverBuyingPrice] = useState([]);
  const [palladiumBuyingPrice, setPalladiumBuyingPrice] = useState([]);
  const [platinumBuyingPrice, setPlatinumBuyingPrice] = useState([]);
  const [goldSellingPrice, setGoldSellingPrice] = useState([]);
  const [silverSellingPrice, setSilverSellingPrice] = useState([]);
  const [palladiumSellingPrice, setPalladiumSellingPrice] = useState([]);
  const [platinumSellingPrice, setPlatinumSellingPrice] = useState([]);
  const [goldPrevSellingPrice, setGoldPrevSellingPrice] = useState([]);
  const [silverPrevSellingPrice, setSilverPrevSellingPrice] = useState([]);
  const [palladiumPrevSellingPrice, setPalladiumPrevSellingPrice] = useState(
    []
  );
  const [platinumPrevSellingPrice, setPlatinumPrevSellingPrice] = useState([]);
  const [goldPrevBuyingPrice, setGoldPrevBuyingPrice] = useState([]);
  const [silverPrevBuyingPrice, setSilverPrevBuyingPrice] = useState([]);
  const [palladiumPrevBuyingPrice, setPalladiumPrevBuyingPrice] = useState([]);
  const [platinumPrevBuyinPrice, setPlatinumPrevBuyingPrice] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `api/spot-prices?metal=XAU&currency=${currency}&weight_unit=oz&boundaries=1`
        );
        if (!response) {
          throw new Error("Network response was not ok.");
        }
        setGoldPrevBuyingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 3
          ].ask
        );
        setGoldPrevSellingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 3
          ].bid
        );
        setGoldBuyingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].ask
        );
        setGoldSellingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].bid
        );
        setGoldPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].value
        );
        setGoldPerformance(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].performance
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [currency]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `api/spot-prices?metal=XAG&currency=${currency}&weight_unit=oz&boundaries=1`
        );
        if (!response) {
          throw new Error("Network response was not ok.");
        }
        setSilverPrevBuyingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 3
          ].ask
        );
        setSilverPrevSellingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 3
          ].bid
        );
        setSilverBuyingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].ask
        );
        setSilverSellingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].bid
        );
        setSilverPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].value
        );
        setSilverPerformance(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].performance
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [currency]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `api/spot-prices?metal=XPD&currency=${currency}&weight_unit=oz&boundaries=1`
        );
        if (!response) {
          throw new Error("Network response was not ok.");
        }
        setPalladiumPrevBuyingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 3
          ].ask
        );
        setPalladiumPrevSellingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 3
          ].bid
        );
        setPalladiumBuyingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].ask
        );
        setPalladiumSellingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].bid
        );
        setPalladiumPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].value
        );
        setPalladiumPerformance(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].performance
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [currency]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `api/spot-prices?metal=XPT&currency=${currency}&weight_unit=oz&boundaries=1`
        );
        if (!response) {
          throw new Error("Network response was not ok.");
        }
        setPlatinumPrevBuyingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 3
          ].ask
        );
        setPlatinumPrevSellingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 3
          ].bid
        );
        setPlatinumBuyingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].ask
        );
        setPlatinumSellingPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].bid
        );
        setPlatinumPrice(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].value
        );
        setPlatinumPerformance(
          response.data._embedded.items[
            response.data._embedded.items.length - 2
          ].performance
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [currency]);

  const getPerformanceChangeColor = (performance) => {
    if (performance > 0) {
      return "#18f005";
    } else {
      return "red";
    }
  };
  const getSellingChangeColor = (current, previous) => {
    if (current > previous) {
      return "#18f005";
    } else if (current < previous) {
      return "red";
    }
  };
  const getBuyingChangeColor = (current, previous) => {
    if (current < previous) {
      return "#18f005";
    } else if (current > previous) {
      return "red";
    }
  };

  return (
    <div className="container-fluid">
      <div id="second-table" className=" tables">
        <div className="row justify-content-center p-4">
          <div className="col-md-12 table-div table-responsive">
            <table className="data-table">
              <thead className="table-header">
                <tr>
                  <th className="table-head">METAL</th>
                  <th className="table-head">WEIGHT</th>
                  <th className="table-head">CURRENCY</th>
                  <th className="table-head">PRICE</th>
                  <th className="table-head">PERFORMANCE</th>
                  <th className="table-head">BUYING PRICE </th>
                  <th className="table-head">SELLING PRICE</th>
                </tr>
              </thead>
              <tbody className="table-body">
                <tr className="metal-row">
                  <td className="table-data">GOLD</td>
                  <td className="table-data">1 OZ</td>
                  <td className="table-data">{currency}</td>
                  <td
                    className="table-data"
                    style={{
                      color: getPerformanceChangeColor(goldPerformance),
                    }}
                  >
                    {goldPrice}
                  </td>
                  <td
                    className="table-data"
                    style={{
                      color: getPerformanceChangeColor(goldPerformance),
                    }}
                  >
                    {goldPerformance}
                  </td>
                  <td
                    className="table-data"
                    style={{
                      color: getBuyingChangeColor(
                        goldBuyingPrice,
                        goldPrevBuyingPrice
                      ),
                    }}
                  >
                    {goldBuyingPrice}
                  </td>
                  <td
                    className="table-data"
                    style={{
                      color: getSellingChangeColor(
                        goldSellingPrice,
                        goldPrevSellingPrice
                      ),
                    }}
                  >
                    {goldSellingPrice}
                  </td>
                </tr>
                <tr className="metal-row">
                  <td className="table-data">SILVER</td>
                  <td className="table-data">1 OZ</td>
                  <td className="table-data">{currency}</td>
                  <td
                    className="table-data"
                    style={{
                      color: getPerformanceChangeColor(silverPerformance),
                    }}
                  >
                    {silverPrice}
                  </td>
                  <td
                    className="table-data"
                    style={{
                      color: getPerformanceChangeColor(silverPerformance),
                    }}
                  >
                    {silverPerformance}
                  </td>
                  <td
                    className="table-data"
                    style={{
                      color: getBuyingChangeColor(
                        silverBuyingPrice,
                        silverPrevBuyingPrice
                      ),
                    }}
                  >
                    {silverBuyingPrice}
                  </td>
                  <td
                    className="table-data"
                    style={{
                      color: getSellingChangeColor(
                        silverSellingPrice,
                        silverPrevSellingPrice
                      ),
                    }}
                  >
                    {silverSellingPrice}
                  </td>
                </tr>
                <tr className="metal-row">
                  <td className="table-data">PALLADIUM</td>
                  <td className="table-data">1 OZ</td>
                  <td className="table-data">{currency}</td>
                  <td
                    className="table-data"
                    style={{
                      color: getPerformanceChangeColor(palladiumPerformance),
                    }}
                  >
                    {palladiumPrice}
                  </td>
                  <td
                    className="table-data"
                    style={{
                      color: getPerformanceChangeColor(palladiumPerformance),
                    }}
                  >
                    {palladiumPerformance}
                  </td>
                  <td
                    className="table-data"
                    style={{
                      color: getBuyingChangeColor(
                        palladiumBuyingPrice,
                        palladiumPrevBuyingPrice
                      ),
                    }}
                  >
                    {palladiumBuyingPrice}
                  </td>
                  <td
                    className="table-data"
                    style={{
                      color: getSellingChangeColor(
                        palladiumSellingPrice,
                        palladiumPrevSellingPrice
                      ),
                    }}
                  >
                    {palladiumSellingPrice}
                  </td>
                </tr>
                <tr className="metal-row">
                  <td className="table-data">PLATINUM</td>
                  <td className="table-data">1 OZ</td>
                  <td className="table-data">{currency}</td>
                  <td
                    className="table-data"
                    style={{
                      color: getPerformanceChangeColor(platinumPerformance),
                    }}
                  >
                    {platinumPrice}
                  </td>
                  <td
                    className="table-data"
                    style={{
                      color: getPerformanceChangeColor(platinumPerformance),
                    }}
                  >
                    {platinumPerformance}
                  </td>
                  <td
                    className="table-data"
                    style={{
                      color: getBuyingChangeColor(
                        platinumBuyingPrice,
                        platinumPrevBuyinPrice
                      ),
                    }}
                  >
                    {platinumBuyingPrice}
                  </td>
                  <td
                    className="table-data"
                    style={{
                      color: getSellingChangeColor(
                        platinumSellingPrice,
                        platinumPrevSellingPrice
                      ),
                    }}
                  >
                    {platinumSellingPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentTwo;
