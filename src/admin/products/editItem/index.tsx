import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { Button, Divider, Form, Tag, notification } from "antd";
import { GrPowerReset } from "react-icons/gr";
import API from "../../../config/API";
import { useNavigate, useParams } from "react-router";
import {
  COMPRESS_IMAGE,
  DELETE,
  GET,
  POST,
  PUT,
} from "../../../utils/apiCalls";
import { Col, Container, Row } from "react-bootstrap";
import SiderItem from "../components/siderItem";
import { TbListDetails } from "react-icons/tb";
import "../styles.scss";
import { CiViewTable } from "react-icons/ci";
import { BiImages } from "react-icons/bi";
import { IoDocumentTextOutline } from "react-icons/io5";
import EditProductInformations from "./productInfo";
import EditImages from "./editImages";
import { CgUnavailable } from "react-icons/cg";
import { HiDocumentReport } from "react-icons/hi";
import UpdateVariants from "./editVariants";
import { create } from "domain";
import UpdateProductStatus from "./editStatus";

function EditProducts() {
  const [Notifications, contextHolder] = notification.useNotification();
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [product, setProduct] = useState<any>({});
  const [step, setSteps] = useState<number>(1);
  const [categories, setCategories] = useState([]);
  const [uploadingImg, setUploadImg] = useState(false);
  const [loadingVariant, setLoadingVariant] = useState(false);
  const [variants, setVariants] = useState<any>([]);
  const [variantform, setVariantform] = useState([]);
  const navigate = useNavigate();
  const clearForm = (clearForm: any) => {
    clearForm();
  };
  //update product status===========================================================
  const updateProductStatus = async (status: boolean) => {
    const url = API.PRODUCT_STATUS_UPDATE + params?.id;
    try {
      const obj = {
        status: status,
      };
      const response: any = await PUT(url, obj);
      if (response?.status == true) {
        Notifications["success"]({
          message: "Success",
          description: "Product Status Updated Successfully",
        });
        getProductDetails();
      } else {
        throw new Error(response?.message);
      }
    } catch (err) {
      Notifications["error"]({
        message: "Failed",
        description: "Failed Update Product Status",
      });
    }
  };
  //delete variant===================================================================
  const deleteVariant = async (item: any) => {
    const url = API.PRODUCT_VARIANT_DELETE + item?.id;
    try {
      const deleted: any = await DELETE(url);
      if (deleted.status) {
        Notifications["success"]({
          message: "Success",
          description: "Variant Deleted Successfully.",
        });
        getProductDetails();
      } else {
        throw new Error(deleted.message);
      }
    } catch (err) {
      Notifications["error"]({
        message: "Failed",
        description: "Failed  to Delete Variant.",
      });
    } finally {
      setLoadingVariant(false);
    }
  };
  //updaate product Vaarients=========================================================
  const updateProductVarient = async (varients: any) => {
    setLoadingVariant(true);
    if (Array.isArray(varients?.variants)) {
      try {
        const variantsData = await uploadVariantsImage(varients);
        const obj = {
          data: variantsData,
          name: product?.name,
          productId: params.id,
        };

        const url = API.PRODUCT_VARIANT_ADD;
        const created: any = await POST(url, obj);
        if (created?.status) {
          Notifications["success"]({
            message: "Success",
            description: "New Variants added Successfully.",
          });
          getProductDetails();
          setVariantform([]);
          setVariants([]);
        } else {
          throw new Error(created.message);
        }
      } catch (err) {
        Notifications["error"]({
          message: "Failed",
          description: "Something went wrong. please try again",
        });
      } finally {
        setLoadingVariant(false);
      }
    }
  };
  //update product images==============================================================
  const updateProductImages = async (images: any[], removeImg: any[]) => {
    try {
      setUploadImg(true);
      const url = API.PROUCTS_IMAGE_UPDATE + params.id;
      if (images[0]?.url || removeImg.length != 0) {
        const newImages: any[] = await uploadImagesToS3(images);
        const response: any = await PUT(url, {
          addImages: newImages,
          removeImages: removeImg,
        });
        if (response.status) {
          getProductDetails();
          Notifications["success"]({
            message: "Success",
            description: "Image Updated Successfully",
          });
        } else {
          throw new Error(response.message);
        }
      } else {
        Notifications["warning"]({
          message: "No Images Selected",
          description: "Please Add or Remove Images",
        });
      }
    } catch (err: any) {
      Notifications["error"]({
        message: "Failed",
        description: err.message,
      });
    } finally {
      setUploadImg(false);
    }
  };
  //uploading product varient image to s3================================================
  const uploadVariantsImage = async (varian: any) => {
    try {
      let arr = varian.variants;
      if (Array.isArray(arr)) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i]?.image?.file) {
            let upload = await COMPRESS_IMAGE(arr[i]?.image?.file);
            let obj: any = arr[i];
            obj.image.url = upload;
            arr[i] = obj;
          }
        }
        return arr;
      }
    } catch (err) {
      return [];
    }
  };
  //uplading product image to s3=========================================================
  const uploadImagesToS3 = async (newImages: any[]) => {
    try {
      let arr = newImages;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]?.file) {
          let upload = await COMPRESS_IMAGE(arr[i]?.file);
          let obj = arr[i];
          obj.url = upload;
          arr[i] = obj;
        }
      }
      return arr;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
  //update product info================================================================
  const updateProductInfo = async (value: any) => {
    const url = API.PRODUCTS_UPDATE + params.id;
    setLoading(true);
    try {
      const response: any = await PUT(url, value);
      if (response?.status) {
        Notifications["success"]({
          message: "Success",
          description: "Product Details Updated Successfully",
        });
        getProductDetails()
      } else {
        throw new Error(response?.message);
      }
    } catch (err: any) {
      Notifications["error"]({
        message: "Failed",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  //get product detail============================================================
  const getProductDetails = async () => {
    const url = API.PRODUCTS_GETONE + params.id;
    try {
      setProductLoading(true);
      const response: any = await GET(url, null);
      if (response?.status) {
        setProduct(response?.data);
      }
    } catch (err) {
      Notifications["error"]({
        message: "Failed",
        description: "Something went wrong. please try again",
      });
    } finally {
      setProductLoading(false);
    }
  };
  //get categories=============================================================
  const getCategories = async () => {
    try {
      const response: any = await GET(API.CATEGORY, null);
      if (response?.status) {
        setCategories(response?.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  //step1 action===============================================================updating product info
  const Step1Action = (value: any) => {
    updateProductInfo(value);
  };
  //step2 action =================================================================

  //step3 action ====================================================================

  //useffect====================================================================
  useEffect(() => {
    getCategories();
    getProductDetails();
  }, []);
  return (
    <>
      <PageHeader
        title="Products"
        second={"Edit Product"}
        third={product?.name}
      >
        {contextHolder}
        {productLoading ? null : product?.status == true ? (
          <Tag color="success">Active</Tag>
        ) : (
          <Tag color="warning">Inactive</Tag>
        )}
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
                onClick={() => setSteps(1)}
              />
              <SiderItem
                level={2}
                step={step}
                name={"Images"}
                status={null}
                Icon={<BiImages />}
                onClick={() => setSteps(2)}
              />
              <SiderItem
                level={3}
                step={step}
                name={"Variants"}
                status={null}
                Icon={<CiViewTable />}
                onClick={() => setSteps(3)}
              />

              <SiderItem
                level={4}
                step={step}
                name={"Deactivate"}
                status={null}
                Icon={<CgUnavailable />}
                onClick={() => setSteps(4)}
              />
              <SiderItem
                level={5}
                step={step}
                name={"Report"}
                status={null}
                Icon={<HiDocumentReport />}
                onClick={() => setSteps(5)}
              />
            </div>
          </Col>
          <Col sm={10} style={{ margin: 0, padding: 0 }}>
            <div className="AddProducts-sideBox2">
              {step === 1 ? (
                <EditProductInformations
                  categories={categories}
                  data={product}
                  onBack={() => navigate(-1)}
                  saveData={(value: any) => {}}
                  onChange={(value: any) => Step1Action(value)}
                  isLoading={isLoading}
                  productLoading={productLoading}
                />
              ) : null}
              {step === 2 ? (
                <EditImages
                  product={product}
                  //   data={images}
                  onBack={(value: any) => setSteps(1)}
                  onChange={(value: any, value2: any) =>
                    updateProductImages(value, value2)
                  }
                  isLoading={uploadingImg}
                />
              ) : null}
              {step === 3 ? (
                <UpdateVariants
                  data={variants}
                  variantform={variantform}
                  product={product}
                  variantformChange={(value: any) => setVariantform(value)}
                  skip={() => setSteps(4)}
                  saveData={(value: any) => setVariants(value)}
                  onBack={(value: any) => setSteps(2)}
                  onChange={(value: any) => updateProductVarient(value)}
                  loadingVariant={loadingVariant}
                  deleteVariant={deleteVariant}
                  clearForm={clearForm}
                />
              ) : null}
              {step === 4 ? (
                <UpdateProductStatus
                  data={product}
                  updateProductStatus={updateProductStatus}
                />
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EditProducts;
