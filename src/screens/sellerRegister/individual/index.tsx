import { notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GET, POST } from "../../../utils/apiCalls";
import Step1 from "./step1";
import Step2 from "./step2";
import API from "../../../config/API";
import { Container } from "react-bootstrap";
import { SlInfo } from "react-icons/sl";
import React from "react";

function IndividualSeller() {
  const [loading, setLoading] = useState(false);
  const [states, SetStates] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigate();

  useEffect(() => {
    // window.scrollTo(0, 0);
    loadStates();
  }, []);

  const moveToNextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };
  const goBack = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const loadStates = async () => {
    try {
      let url = API.STATES;
      let response: any = await GET(url, null);
      if (response.status) {
        SetStates(response.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const register = async (obj: any) => {
    try {
      setLoading(true);
      let url = API.INDIVIDUAL_STORE_CREATE;
      const response: any = await POST(url, obj);
      if (response.status) {
        notification.success({
          message: "Success",
          description: "successful",
        });
        // navigation("/home");
      } else {
        notification.error({
          message: "Registration Failed",
          description: " Please try again.",
        });
      }
    } catch (err: any) {
      console.error("API Error:", err);
      notification.error({
        message: "Something went wrong!",
        description: err.message,
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
            {currentStep === 1 ? (
              <h4 className="sellerRegister-Heading">
                Congratulations! Application registered successfully.
              </h4>
            ) : (
              <h4 className="sellerRegister-Heading">Register your request</h4>
            )}
          </div>
          <div onClick={() => navigation("/slr/individual_info")}>
            <SlInfo size={20} />
          </div>
        </div>
        <hr />
        {currentStep === 0 && (
          <Step1
            register={register}
            loading={loading}
            states={states}
            moveToNextStep={moveToNextStep}
            goBack={goBack}
          />
        )}
        {currentStep === 1 && <Step2 loading={loading} goBack={goBack} />}
      </Container>
    </div>
  );
}
export default IndividualSeller;
