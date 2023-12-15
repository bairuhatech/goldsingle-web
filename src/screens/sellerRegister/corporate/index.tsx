import React, { useEffect, useState } from "react";
import { Steps, notification } from "antd";
import { Step } from "rc-steps";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Step5 from "./step5";
import { CorporateRegisterType } from "../../../shared/types/types";

import API from "../../../config/API";
import { DOCUMENT_UPLOAD, GET, POST } from "../../../utils/apiCalls";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import { useSelector } from "react-redux";

function Register() {
  const navigation = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, SetSuccess] = useState(false);
  const User = useSelector((state: any) => state.User.user);
  const userId = User?.data?._id;
  const [businessType, SetBusinessType] = useState([]);
  const [formData, setFormData] = useState({
    step1Data: {},
    step2Data: {},
    step3Data: {},
    step4Data: {},
  } as any);

  let phone = `${formData.step1Data?.code}${formData.step1Data?.phone}`;

  useEffect(() => {
    loadbusinessType();
  }, []);

  const loadbusinessType = async () => {
    try {
      let url = API.BUSINESS_TYPE;
      let response: any = await GET(url, null);
      if (response.status) {
        SetBusinessType(response.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const moveToNextStep = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };
  const goBack = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  const register = async () => {
    try {
      //uploading id proof and trn file.
      setLoading(true);
      const id_proof_upload = await DOCUMENT_UPLOAD(
        formData?.step4Data?.id_proof?.file
      );
      const trn_upload = await DOCUMENT_UPLOAD(
        formData?.step4Data?.trn_upload?.file
      );
      let obj: CorporateRegisterType & {
        userId: number;
      } = {
        //step1
        first_name: formData?.step1Data?.first_name,
        last_name: formData?.step1Data?.last_name,
        name: `${formData?.step1Data?.first_name} ${formData?.step1Data?.last_name}`,
        email: formData?.step1Data?.email,
        code: formData.step1Data?.code,
        phone: formData.step1Data?.phone,
        password: formData?.step1Data?.password,
        //step2
        store_name: formData?.step2Data?.store_name,
        business_address: formData?.step2Data?.business_address,
        business_location: formData?.step2Data?.business_location,
        business_type: formData?.step2Data?.business_type,
        trn_number: formData?.step2Data?.trn_number,
        trade_lisc_no: formData?.step2Data?.trade_licencse_no,
        upscs: formData?.step2Data?.upscs,
        manufacture: formData?.step2Data?.manufacture,
        agreement: formData?.step2Data?.agreement,
        //step3
        seller_name: formData?.step3Data?.seller_name,
        seller_country: formData?.step3Data?.citizenship_country,
        birth_country: formData?.step3Data?.birth_country,
        dob: formData?.step3Data?.dob,
        id_issue_country: formData?.step3Data?.issue_country,
        id_expiry_date: formData?.step3Data?.expiry_date,
        id_type: formData?.step3Data?.id_type,
        //step3
        id_proof: id_proof_upload,
        trn_upload: trn_upload,
        status: "pending",
        userId: userId,
      };
      let url = API.CORPORATE_STORE_CREATE;
      const response: any = await POST(url, obj);
      if (response.status) {
        notification.success({
          message: "Success",
          description: "Seller Registration is successful",
        });
        SetSuccess(true);
        window.scrollTo(0, 0);
      } else {
        console.log(response.message)
        notification.error({
          message: "Something went wrong!",
          description: "Please connect support team to slove this issue.",
        });
      }
    } catch (err: any) {
      notification.error({
        message: "Something went wrong!",
        description: "Please connect support team to slove this issue.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Screen-box">
      <br />
      <Container>
        <div className="sellerRegister-row">
          <div>
            <h4 className="sellerRegister-Heading">
              Create Your Seller Account
            </h4>
          </div>
          <div
            className="sellerRegister-text2"
            style={{ color: "blue" }}
            onClick={() => navigation("/slr/individual")}
          >
            Individual
          </div>
        </div>
        <br />
        <Steps className="sellerRegister-steps" current={currentStep}>
          <Step title={"Profile"} description={"Enter email,phone etc..."} />
          <Step title={"Business Info"} description={"Name, Location etc..."} />
          <Step title={"Seller Details"} description={"Owner Details etc..."} />
          <Step title={"Upload Documents"} description={"ID,TRN etc..."} />
        </Steps>
        <br />
        <div>
          {currentStep === 0 && (
            <Step1
              moveToNextStep={moveToNextStep}
              formData={formData.step1Data}
            />
          )}
          {currentStep === 1 && (
            <Step2
              businessType={businessType}
              formData={formData.step2Data}
              moveToNextStep={moveToNextStep}
              goBack={goBack}
            />
          )}
          {currentStep === 2 && (
            <Step3
              moveToNextStep={moveToNextStep}
              goBack={goBack}
              formData={formData.step3Data}
            />
          )}
          {currentStep === 3 && (
            <Step4
              moveToNextStep={moveToNextStep}
              goBack={goBack}
              formData={formData.step4Data}
            />
          )}
          {currentStep === 4 && (
            <Step5
              loading={loading}
              success={success}
              phoneNumber={phone}
              formData={formData}
              register={register}
              goBack={goBack}
            />
          )}
        </div>
      </Container>
      <br />
    </div>
  );
}
export default Register;
