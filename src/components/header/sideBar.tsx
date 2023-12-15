import { PiGift } from "react-icons/pi";
import { Collapse, Drawer } from "antd";
import { useSelector } from "react-redux";
import DrawerProfile from "./drawerProfile";
import { LiaStarSolid } from "react-icons/lia";
import { MdFormatListBulleted } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { BsBookmarkHeart, BsShopWindow } from "react-icons/bs";
import { AiOutlineFileDone, AiOutlineShoppingCart } from "react-icons/ai";
import LanguageSelector from "./components/languageSelector";
import React from "react";

function SideBar(props: any) {
  const Category = useSelector((state: any) => state.Category.categries);
  const { Panel } = Collapse;

  return (
    <Drawer
      title={<DrawerProfile />}
      placement={"left"}
      width={280}
      onClose={props?.close()}
      open={props?.open}
      key={"left"}
      closeIcon={false}
    >
      <div style={{ marginTop: -20 }}>
        <div>
          <LanguageSelector />
        </div>
        <div className="Sidebar-itemBox">
          <BsShopWindow size={27} color="#757575" />
          <span>Become a Seller</span>
        </div>
        <div className="Sidebar-itemBox">
          <PiGift size={27} color="#757575" />
          <span>Find Gift</span>
        </div>
        <hr />
        <div className="Sidebar-txt1">Categories</div>
        <Collapse
          className="Sidebar-collapse"
          bordered={false}
          expandIconPosition="end"
        >
          {Category?.map((item: any, idx: number) => {
            return (
              <Panel header={item?.name} key={idx}>
                {item?.sub_categories?.map((subCat: any, i: number) => {
                  return (
                    <p key={i} className="Sidebar-txt2">
                      {subCat?.name}
                    </p>
                  );
                })}
              </Panel>
            );
          })}
        </Collapse>
        <hr />
        <div className="Sidebar-itemBox">
          <AiOutlineFileDone size={27} color="#757575" />
          <span>My Orders</span>
        </div>
        <div className="Sidebar-itemBox">
          <BsBookmarkHeart size={27} color="#757575" />
          <span>Wishlist</span>
        </div>
        <div className="Sidebar-itemBox">
          <AiOutlineShoppingCart size={27} color="#757575" />
          <span>Go to Cart</span>
        </div>
        <div className="Sidebar-itemBox">
          <MdFormatListBulleted size={27} color="#757575" />
          <span>About us</span>
        </div>
        <div className="Sidebar-itemBox">
          <LiaStarSolid size={27} color="#757575" />
          <span>Rate us</span>
        </div>
        <div className="Sidebar-itemBox">
          <IoIosHelpCircleOutline size={27} color="#757575" />
          <span>Need Help ?</span>
        </div>
      </div>
    </Drawer>
  );
}
export default SideBar;
