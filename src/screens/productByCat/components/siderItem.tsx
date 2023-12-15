import { Checkbox, Select } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const SiderItem = ({ item }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const Navigate = (path: any) => {
    navigate(path);
  };
  const { Option } = Select;
const params=useParams();

  return (
    <div
      onClick={() => ""}
      className={
        location.pathname === item?.route ? "sideItem-selected" : "sideItem"
      }
    >
      {/* <span>{item?.menu}</span> */}
      <Select value={item?.menu} style={{ width: '100%' }}>
        <Option>
          {/* <Checkbox.Group> */}
          {item?.options?.map((options: any)=>{
            <Checkbox value={options}>{options}</Checkbox>
          })}
          {/* </Checkbox.Group> */}
        </Option>
      </Select>
    </div>
  );
};
export default SiderItem;
