import { Tag, Tooltip, message } from "antd";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { SingleProductContext } from "../singleProductContext";

function VariantTypes() {
  const data = useContext(SingleProductContext);
  const setSelectedVariant = data?.setSelectedVariant;
  const variants = data?.variants;
  const selectedVariant = data?.selectedVariant;
  const [messageApi, contextHolder] = message.useMessage();
  const selectVarient = (item: any, varient: any) => {
    if (typeof setSelectedVariant == "function") {
      if (varient.units > 0) {
        //only if the product is in stock
        setSelectedVariant((current: any) => ({
          ...current,
          [item.variant]: varient.value,
        }));
      } else {
        messageApi.warning(`Selected Variant is Currently out of stock`);
      }
    }
  };
  const Settings = useSelector((state: any) => state.Settings.Settings);
  return (
    <>
      {contextHolder}
      {Array.isArray(variants?.variants) == true
        ? variants?.variants?.map((item: any, i: number) => {
            return (
              <div className="mt-2" key={i}>
                <Tag color="default" className="px-3" bordered={false}>
                  {item?.variant}:{" "}
                  <span className="fw-bold">
                    {selectedVariant[item?.variant]}
                  </span>
                </Tag>
                <br />
                <div className="mt-2">
                  {item?.details?.map((varient: any, i: number) => {
                    return (
                      <Tag
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            varient?.units == 0 ? "#d1d1d1" : "transparent",
                          color: "black",
                        }}
                        color={
                          selectedVariant[item?.variant] == varient.value
                            ? "error"
                            : "default"
                        }
                        onClick={() => selectVarient(item, varient)}
                        key={i}
                      >
                        <span className="text-center">{varient.value}</span>

                        <br />
                        {item?.variant == "Size" ? (
                          <span className="text-center">
                            {varient.price}
                            {Settings?.currency}
                          </span>
                        ) : null}
                      </Tag>
                    );
                  })}
                </div>
                <hr />
              </div>
            );
          })
        : null}
    </>
  );
}

export default VariantTypes;
