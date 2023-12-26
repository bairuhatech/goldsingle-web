import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { PiChartLineUp, PiChartLineDown } from "react-icons/pi";
import Live from "../../../assets/images/live.gif";
import axios from "axios"
function LiveRates(props: any) {
  const [goldDataG, setGoldDataG] = useState<number>();
  const [goldDataKg,setGoldDataKg] = useState<number>()
  const [goldDataOz,setGoldDataOz] = useState<number>()
  const [silverDataOz,setSilverDataOz] = useState<number>()
  const[goldData999,setGoldData999] = useState<number>()
  useEffect(() => {
    getGold();
    liveRates()
  }, []);
  function liveRates(){
    setInterval(getGold,5000)
  }

  async function getGold() {
    try {
      const response = await axios.get("https://data-asg.goldprice.org/dbXRates/AED")
      console.log("+++++++++++++++++++++",response)
      const data = await response.data.items[0]
      console.log("=======>",data)
      setGoldDataOz(data.xauPrice)
      setSilverDataOz(data.xagPrice)
      setGoldDataG(parseFloat((data.xauPrice/28.35).toFixed(2)))
      setGoldDataKg(parseFloat(((data.xauPrice/28.35)*1000).toFixed(2)))
      setGoldData999(parseFloat((((data.xauPrice/28.35)*1000)+((((data.xauPrice/28.35)*1000)*0.5)/100)).toFixed(2)))
      
      
      // console.log("========>",data)
    } catch (err) {
      console.log("error", err);
    }
  }


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
            {/* {goldData &&
              goldData.length &&
              goldData.slice(0, 6).map((item: any) => {
                return (
                  <div className="homeScreen-item">
                    <div style={{ flex: 2 }}>{item.goldName}</div>
                    <div style={{ flex: 1 }}>1 GM</div>
                    <div style={{ flex: 1 }}>{item.rate} AED</div>
                    <div>
                      <PiChartLineUp size={20} color="green" />
                    </div>
                  </div>
                );
              })} */}
            <div className="homeScreen-item">
              <div style={{ flex: 3 }}>Gold 9999</div>
              <div style={{ flex: 1 }}>1 KG</div>
              <div style={{ flex: 2 }}>{goldData999} AED</div>
              <div>
                <PiChartLineUp size={20} color="green" />
              </div>
            </div>
            <div className="homeScreen-item">
              <div style={{ flex: 3 }}>Gold 995</div>
              <div style={{ flex: 1 }}>1 OZ</div>
              <div style={{ flex: 2 }}>{goldDataOz} AED</div>
              <div>
                <PiChartLineDown size={20} color="red" />
              </div>
            </div>
            <div className="homeScreen-item">
              <div style={{ flex: 3 }}>Gold 995</div>
              <div style={{ flex: 1 }}>1 G</div>
              <div style={{ flex: 2 }}>{goldDataG} AED</div>
              <div>
                <PiChartLineUp size={20} color="green" />
              </div>
            </div>
            <div className="homeScreen-item">
              <div style={{ flex: 3 }}>Gold 995</div>
              <div style={{ flex: 1 }}>1 KG</div>
              <div style={{ flex: 2 }}>{goldDataKg} AED</div>
              <div>
                <PiChartLineUp size={20} color="green" />
              </div>
            </div>
            <div className="homeScreen-item">
              <div style={{ flex: 3 }}>Silver 9999</div>
              <div style={{ flex: 1 }}>1 OZ</div>
              <div style={{ flex: 2 }}>{silverDataOz} AED</div>
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