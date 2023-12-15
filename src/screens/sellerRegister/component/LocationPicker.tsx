import { Button, Modal } from "antd";
import { useState } from "react";
import MapPicker from "react-google-map-picker";
import API from "../../../config/API";
import { Col, Row } from "react-bootstrap";
import React from "react";
const DefaultZoom = 10;
function LocationPicker(props: any) {
  const [location, setLocation] = useState({});
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat: any, lng: any) {
    console.log("handleChangeLocation");
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom: any) {
    setZoom(newZoom);
  }

  const generateAddress = async () => {
    props.onChange(location);
    props?.onCancel();
  };

  return (
    <Modal
      title={<h4>Point Store Location</h4>}
      visible={props?.visible}
      footer={null}
      onCancel={() => props?.onCancel()}
      centered
    >
      <br />
      <MapPicker
        zoom={zoom}
        style={{ height: "400px" }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey={API.GGL_TOKEN}
        defaultLocation={{
          lat: 25.204849,
          lng: 55.270782,
        }}
      />
      <br />
      <Row>
        <Col sm={6} xs={12}></Col>
        <Col sm={2} xs={6}>
          <Button block size="large" danger onClick={() => props?.onCancel()}>
            Close
          </Button>
        </Col>
        <Col sm={4} xs={6}>
          <Button
            size="large"
            block
            type="primary"
            onClick={() => generateAddress()}
          >
            Done
          </Button>
        </Col>
      </Row>
    </Modal>
  );
}

export default LocationPicker;
