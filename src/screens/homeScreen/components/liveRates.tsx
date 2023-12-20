import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { PiChartLineUp, PiChartLineDown } from "react-icons/pi";
import Live from "../../../assets/images/live.gif";
import API from "../../../config/API"
import axios from "axios";
function LiveRates(props: any) {
  const [goldDataOz, setGoldDataOz] = useState();
  const [goldDataG, setGoldDataG] = useState();
  const [goldDataKg, setGoldDataKg] = useState();
  const [goldData9999, setGoldData9999] = useState<number>();
  const [goldDataTtb, setGoldDataTtb] = useState<number>();
  useEffect(() => {
    getGold();
    liveRate()
  }, []);

  function liveRate() {
    setInterval(function () {
      getGold();
    }, 5000)
  }
  // function convert(){

  //   if(goldDataKg){
  //     gold9999 = goldDataKg+(goldDataKg*0.5).toFixed(2)
  //     console.log("gold9999",gold9999)
  //   }
  //   if(goldDataG){
  //     goldttb = goldDataG*106.5
  //     console.log("goldttb",goldttb)
  //   }

  // }

  async function getGold() {
    try {
      const responseoz = await axios.get(API.API_URL+'api/spot-prices?metal=XAU&currency=AED&weight_unit=oz&boundaries=1')
      const responseg = await axios.get(API.API_URL+'api/spot-prices?metal=XAU&currency=AED&weight_unit=g&boundaries=1')
      const responsekg = await axios.get(API.API_URL+'api/spot-prices?metal=XAU&currency=AED&weight_unit=kg&boundaries=1')
      // console.log("======>",response.text())
      // console.log(response)
      const dataoz = await responseoz.data;
      const datag = await responseg.data
      const datakg = await responsekg.data
      console.log("gggggggggg", dataoz)
      // const mis = parseData(data);

      setGoldDataOz(dataoz._embedded.items[dataoz._embedded.items.length - 2].value);
      setGoldDataG(datag._embedded.items[datag._embedded.items.length - 2].value)
      setGoldDataKg(datakg._embedded.items[datakg._embedded.items.length - 2].value)
      setGoldData9999(parseFloat((datakg._embedded.items[datakg._embedded.items.length - 2].value + ((datakg._embedded.items[datakg._embedded.items.length - 2].value * 0.5)/100)).toFixed(2)))
      setGoldDataTtb(parseFloat((datag._embedded.items[datag._embedded.items.length - 2].value*106.5).toFixed(2)))
      console.log("++++++++++++++++++++", goldDataOz)
    } catch (err) {
      console.log("error", err);
    }
  }

  // const parseData = (data: any) => {
  //   try {
  //     console.log("data", data);
  //     const rows = data.trim().split("\n");
  //     const parsedData = rows.map((row: any) => {
  //       const values = row.trim().split(/\s+/);
  //       const obj: any = {};
  //       if (values.length >= 6) {
  //         obj.goldName =
  //           values[3] === "9999"
  //             ? `${values[1]} ${values[2]} ${values[3]}`
  //             : values[3] === "BAR"
  //               ? `${values[1]} ${values[2]} ${values[3]}`
  //               : values[1] === "USDINR"
  //                 ? `${values[1]}`
  //                 : `${values[1]} ${values[2]}`;
  //         obj.rate = `${values[4]}`;
  //         obj.weight =
  //           values[3] === "9999"
  //             ? ``
  //             : values[3] === "BAR"
  //               ? `${values[8]}`
  //               : values[1] === "USDINR"
  //                 ? `${values[1]}`
  //                 : `${values[7]} ${values[8]}`;
  //         obj.rate2 = values[2] === "OZ" ? `${values[3]}` : null;
  //         obj.rate3 = values[2] === "OZ" ? `${values[5]}` : null;
  //         obj.rate4 = values[2] === "OZ" ? `${values[6]}` : null;
  //       }
  //       return obj;
  //     });
  //     return parsedData;
  //   } catch (err) {
  //     console.log("err", err);
  //     return {};
  //   }
  // };

  // console.log("goldData", goldData);

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

            {/* <div className="homeScreen-item">
              <div style={{ flex: 2 }}>hjkhjkhj</div>
              <div style={{ flex: 1 }}>jhjkhk</div>
              <div style={{ flex: 1 }}>yjhgg AED</div>
              <div>
                <PiChartLineUp size={20} color="green" />
              </div>
            </div> */}

            <div className="homeScreen-item">
              <div style={{ flex: 3 }}>Gold 995</div>
              <div style={{ flex: 1 }}>1 GM</div>
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
                <PiChartLineDown size={20} color="red" />
              </div>
            </div>
            <div className="homeScreen-item">
              <div style={{ flex: 3 }}>Gold 9999</div>
              <div style={{ flex: 1 }}>1 KG</div>
              <div style={{ flex: 2 }}>{goldData9999} AED</div>
              <div>
                <PiChartLineUp size={20} color="green" />
              </div>
            </div>
            <div className="homeScreen-item">
              <div style={{ flex: 3 }}>TENT TOLA BAR</div>
              <div style={{ flex: 1 }}>TTB</div>
              <div style={{ flex: 2 }}>{goldDataTtb} AED</div>
              <div>
                <PiChartLineUp size={20} color="green" />
              </div>
            </div>
            <div className="homeScreen-item">
              <div style={{ flex: 3 }}>1 OUNCE 995</div>
              <div style={{ flex: 1 }}>1 oz</div>
              <div style={{ flex: 2 }}>{goldDataOz} AED</div>
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
