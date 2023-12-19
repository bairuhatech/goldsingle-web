import React from "react";
import Slider from "react-slick";

import bg2 from "../../../assets/images/bg1.jpeg";
import { Row, Col } from "react-bootstrap";
import SEO from "../../../components/seo";

function Banners(props: any) {
  const Slidesettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="HomeScreen-BannerBox">
      <SEO
        title={props?.datas?.head}
        description={props?.datas?.body?.slice(0, 100)}
        image={props?.datas?.image}
      />
      {props?.data?.length ? (
        <Slider {...Slidesettings}>
          {props.data.map((bann: any) => {
            return (
              <div>
                <div
                  className="HomeScreen-Banners"
                  style={{ backgroundImage: `url(${bann.img_desk})` }}
                >
                  <Row>
                    <Col sm={6} xs={12}>
                      <div className="HomeScreen-BannersBox">
                        <div className="HomeScreen-Bannertxt2">
                          {" "}
                          {bann.title}
                        </div>
                        <div className="HomeScreen-Bannertxt3">
                          {bann.description}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            );
          })}
        </Slider>
      ) : null}
    </div>
  );
}
export default Banners;
