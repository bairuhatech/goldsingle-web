import { useState, useEffect } from "react";
import "../styles.scss";
import PageHeader from "../../components/PageHeader";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { TbListDetails } from "react-icons/tb";
import { BiImages } from "react-icons/bi";
import { CiViewTable } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";

import SiderItem from "../components/siderItem";

import Information from "./information";
import Images from "./images";
import Variants from "./variants";
import Review from "./review";

import { COMPRESS_IMAGE, GET, POST } from "../../../utils/apiCalls";
import API from "../../../config/API";
import { Button, notification } from "antd";
import { useSelector } from "react-redux";
import React from "react";

function AddProducts() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [variantform, setVariantform] = useState([]);
  const [Notifications, contextHolder] = notification.useNotification();
  const [step, setSteps] = useState(1);
  const User = useSelector((state: any) => state.User.user);

  //formdata
  const [information, setInformation] = useState<any>({});
  const [images, setImages] = useState<any>([]);
  const [variants, setVariants] = useState<any>([]);

  //end formdata

  useEffect(() => {
    LoadCategory();
  }, []);

  const LoadCategory = async () => {
    try {
      const response: any = await GET(API.CATEGORY, null);
      if (response?.status) {
        setCategories(response?.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const reset = () => {
    setVariantform([]);
    setInformation({});
    setImages([]);
    setVariants([]);
    setSteps(1);
  };

  const Step1Action = (value: any) => {
    try {
      console.log("value", value);
      setInformation(value);
      setSteps(2);
    } catch (err) {}
  };

  const Step2Action = (value: any) => {
    try {
      setImages(value);
      setSteps(3);
    } catch (err) {}
  };

  const Step3Action = (value: any) => {
    try {
      setVariants(value);
      setSteps(4);
    } catch (err) {}
  };

  const uploadImageFiles = async () => {
    try {
      let arr = images;
      for (let i = 0; i < arr.length; i++) {
        let upload = await COMPRESS_IMAGE(arr[i]?.file);
        let obj = arr[i];
        obj.url = upload;
        arr[i] = obj;
      }
      return arr;
    } catch (err) {
      console.log("err = = = ", err);
    }
  };

  const uploadVariantsImage = async () => {
    try {
      let arr = variants.variants;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]?.image?.file) {
          let upload = await COMPRESS_IMAGE(arr[i]?.image?.file);
          let obj: any = arr[i];
          obj.image.url = upload;
          arr[i] = obj;
        }
      }
      return arr;
    } catch (err) {
      console.log("err = = = ", err);
    }
  };

  const submit = async () => {
    try {
      setLoading(true);
      let images = await uploadImageFiles();
      let variants = await uploadVariantsImage();
      let info = information;
      info.store_id = User?.data?.store_id;
      info.image = images[0]?.url; //first image
      let obj = {
        information: info,
        images: images,
        variants: variants,
      };
      console.log("obj = = = = >", obj);
      let createProduct: any = await POST(API.PRODUCTS_CREATE, obj);
      console.log(createProduct);
      if (createProduct.status) {
        Notifications["success"]({
          message: "Success",
          description: "Product Added Successfully",
        });
        setTimeout(() => {
          navigate("/auth/products");
        }, 1000);
      } else {
        throw new Error(createProduct.message);
      }
    } catch (err: any) {
      Notifications["error"]({
        message: "Failed to Add product",
        description: err.message,
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Products"
        second={"Products"}
        third={"Create New Listing"}
      >
        {contextHolder}
        <Button danger onClick={() => reset()}>
          Reset &nbsp;
          <GrPowerReset color="red" />
        </Button>
      </PageHeader>
      <Container fluid>
        <Row>
          <Col sm={2} style={{ margin: 0, padding: 0 }}>
            <div>
              <SiderItem
                level={1}
                step={step}
                name={"Details"}
                status={null}
                Icon={<TbListDetails />}
              />
              <SiderItem
                level={2}
                step={step}
                name={"Images"}
                status={null}
                Icon={<BiImages />}
              />
              <SiderItem
                level={3}
                step={step}
                name={"Variants"}
                status={null}
                Icon={<CiViewTable />}
              />
              <SiderItem
                level={4}
                step={step}
                name={"Review"}
                status={null}
                Icon={<IoDocumentTextOutline />}
              />
            </div>
          </Col>
          <Col sm={10} style={{ margin: 0, padding: 0 }}>
            <div className="AddProducts-sideBox2">
              {step === 1 ? (
                <Information
                  categories={categories}
                  data={information}
                  onBack={() => navigate(-1)}
                  saveData={(value: any) => {}}
                  onChange={(value: any) => Step1Action(value)}
                />
              ) : null}
              {step === 2 ? (
                <Images
                  data={images}
                  onBack={(value: any) => setSteps(1)}
                  onChange={(value: any) => Step2Action(value)}
                />
              ) : null}
              {step === 3 ? (
                <Variants
                  data={variants}
                  variantform={variantform}
                  variantformChange={(value: any) => setVariantform(value)}
                  skip={() => setSteps(4)}
                  saveData={(value: any) => setVariants(value)}
                  onBack={(value: any) => setSteps(2)}
                  onChange={(value: any) => Step3Action(value)}
                />
              ) : null}
              {step === 4 ? (
                <Review
                  information={null}
                  images={null}
                  variants={null}
                  loading={loading}
                  onBack={(value: any) => setSteps(3)}
                  onChange={() => submit()}
                />
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default AddProducts;
