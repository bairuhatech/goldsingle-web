import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { PiChartLineUp, PiChartLineDown } from "react-icons/pi";
import Live from "../../../assets/images/live.gif";
function LiveRates(props: any) {
  const [goldData, setGoldData] = useState([]);
  useEffect(() => {
    getGold();
  }, []);

  async function getGold() {
    try {
      const response = await fetch(
        "http://bcast.luckystargold.net:7767/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/lucky?_=1701803404944",
        {
          method: "GET",
          redirect: "follow",
        }
      );
      const data = await response.text();
      const mis = parseData(data);
      setGoldData(mis);
    } catch (err) {
      console.log("error", err);
    }
  }

  const parseData = (data: any) => {
    try {
      console.log("data", data);
      const rows = data.trim().split("\n");
      const parsedData = rows.map((row: any) => {
        const values = row.trim().split(/\s+/);
        const obj: any = {};
        if (values.length >= 6) {
          obj.goldName =
            values[3] === "9999"
              ? `${values[1]} ${values[2]} ${values[3]}`
              : values[3] === "BAR"
              ? `${values[1]} ${values[2]} ${values[3]}`
              : values[1] === "USDINR"
              ? `${values[1]}`
              : `${values[1]} ${values[2]}`;
          obj.rate = `${values[4]}`;
          obj.weight =
            values[3] === "9999"
              ? ``
              : values[3] === "BAR"
              ? `${values[8]}`
              : values[1] === "USDINR"
              ? `${values[1]}`
              : `${values[7]} ${values[8]}`;
          obj.rate2 = values[2] === "OZ" ? `${values[3]}` : null;
          obj.rate3 = values[2] === "OZ" ? `${values[5]}` : null;
          obj.rate4 = values[2] === "OZ" ? `${values[6]}` : null;
        }
        return obj;
      });
      return parsedData;
    } catch (err) {
      console.log("err", err);
      return {};
    }
  };

  console.log("goldData", goldData);

  return (
    <div>
      <Row>
        <Col sm={6}>
          <div className="homeScreen-box1">
            <div className="homeScreen-item">
              <div className="homeScreen-livetext1">Live Rates</div>
              <div>
                <img src={Live} className="homeScreen-liveChart" />
              </div>
            </div>
            {goldData &&
              goldData.length &&
              goldData.slice(1, 6).map((item: any) => {
                return (
                  <div className="homeScreen-item">
                    <div style={{ flex: 2 }}>Gold 9999</div>
                    <div style={{ flex: 1 }}>1 GM</div>
                    <div style={{ flex: 1 }}>239.92 AED</div>
                    <div>
                      <PiChartLineUp size={20} color="green" />
                    </div>
                  </div>
                );
              })}
            <div className="homeScreen-item">
              <div style={{ flex: 2 }}>Gold 9999</div>
              <div style={{ flex: 1 }}>1 GM</div>
              <div style={{ flex: 1 }}>239.92 AED</div>
              <div>
                <PiChartLineUp size={20} color="green" />
              </div>
            </div>
            <div className="homeScreen-item">
              <div style={{ flex: 2 }}>Gold 9999</div>
              <div style={{ flex: 1 }}>1 KG</div>
              <div style={{ flex: 1 }}>239.92 AED</div>
              <div>
                <PiChartLineDown size={20} color="red" />
              </div>
            </div>
            <div className="homeScreen-item">
              <div style={{ flex: 2 }}>Gold 995</div>
              <div style={{ flex: 1 }}>1 KG</div>
              <div style={{ flex: 1 }}>239.92 AED</div>
              <div>
                <PiChartLineUp size={20} color="green" />
              </div>
            </div>
            <div className="homeScreen-item">
              <div style={{ flex: 2 }}>TENT TOLA BAR</div>
              <div style={{ flex: 1 }}>TTB</div>
              <div style={{ flex: 1 }}>239.92 AED</div>
              <div>
                <PiChartLineUp size={20} color="green" />
              </div>
            </div>
            <div className="homeScreen-item">
              <div style={{ flex: 2 }}>1 OUNCE 9999</div>
              <div style={{ flex: 1 }}>1 oz</div>
              <div style={{ flex: 1 }}>239.92 AED</div>
              <div>
                <PiChartLineUp size={20} color="green" />
              </div>
            </div>
          </div>
        </Col>
        <Col sm={6}>
          <div className="homeScreen-img1box1">
            <img
              className="homeScreen-img1"
              src="https://static.malabargoldanddiamonds.com/media/bsimages/Diamond-Lightweight-web.jpg"
              alt=""
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LiveRates;
