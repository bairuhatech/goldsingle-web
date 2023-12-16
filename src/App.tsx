import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { ConfigProvider, message } from "antd";
import { useSelector } from "react-redux";
import FloatingButton from "./components/floatingButton";
import ProtectedRoute from "./utils/protectedRoute";

import Header from "./components/header";
import Footer from "./components/footer";

import HomeSCreen from "./screens/homeScreen";
import ForgottPassword from "./screens/forgottPassword";
import SignupScreen from "./screens/signupScreen";
import ProfileScreen from "./screens/profileScreen";
import SellerRegister from "./screens/sellerRegister";
import CorporateSeller from "./screens/sellerRegister/corporate";
import IndividualSeller from "./screens/sellerRegister/individual";
import LoginScreen from "./screens/loginScreens";
import CartScreen from "./screens/cartScreen";
import Admin from "./admin/route";
import ProductPage from "./screens/productScreen";
import ProductByCategory from "./screens/productByCat";
import ProductSearch from "./screens/productSearch";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import AboutNextme from "./screens/AboutNextMe";
import BestPrice from "./screens/BestPrice";
import ServiceCenters from "./screens/ServiceCenters";
import Careers from "./screens/Careers";
import SolutionBar from "./screens/SolutionBar";
import BrandPromise from "./screens/BrandPromise";
import TermsAndConditions from "./screens/TermsandConditions";
import CheckWarrantyStatus from "./screens/CheckWarrantystatus";
import StoreLocator from "./screens/StoreLocator";
import EasyPaymentPlan from "./screens/EasyPaymentPlan";
import DisclaimerPolicy from "./screens/DisclaimerPolicy";
import ReturnAndExchangePolicy from "./screens/ReturnandExchangePolicy";
import BulkOrderEnquiries from "./screens/BulkOrderEnquiries";
import ReportFraud from "./screens/ReportFraud";
import LatestCatalogue from "./screens/LatestCatalogue";
import Newsletter from "./screens/Newsletter";
import Blog from "./screens/Blog";
import TellUsMore from "./screens/TellUsMore";
import deliveryRestricted from "./screens/deliveryRestricted";
import Faq from "./screens/faq";
import AddressScreen from "./screens/addressScreen";
import IndividualInfo from "./screens/sellerRegister/individual/individualInfo";
import React from "react";
import StoreRedirectScreen from "./screens/storeDetails";
import SearchProductsByStore from "./screens/searchStore";
import EmailVerificationPage from "./screens/verifyMail";

function App() {
  const User = useSelector((state: any) => state.User);
  const Direction = useSelector((state: any) => state.Language.direction);

  message.config({ top: 100 });
  return (
    <I18nextProvider i18n={i18n}>
      <div dir={Direction}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Catamaran-Medium",
              colorPrimary: "#B95C50",
              colorBorder: "#9a9eaa",
              lineWidth: 1.8,
              controlOutlineWidth: 0,
              borderRadius: 6,
            },
            components: {
              Button: {
                fontWeight: "900",
              },
            },
          }}
        >
          <Header />
          <div className="Header-margin" />
          <Routes>
            <Route index element={<HomeSCreen />} />;
            <Route path="/" element={<HomeSCreen />} />;
            <Route path="/home" element={<HomeSCreen />} />;
            <Route path="/login" element={<LoginScreen />} />;
            <Route path="/signup/:type" element={<SignupScreen />} />;
            <Route path="/forgott" element={<ForgottPassword />} />;
            <Route path="/auth/cart" element={<CartScreen />} />;
            <Route path="/auth/checkout" element={<AddressScreen />} />;
            <Route path="/auth/check_store" element={<StoreRedirectScreen />} />
            ;
            <Route path="/seller" element={<SellerRegister />} />;
            <Route path="/slr/corporate" element={<CorporateSeller />} />;
            <Route path="/slr/individual" element={<IndividualSeller />} />;
            <Route path="/slr/individual_info" element={<IndividualInfo />} />
            <Route path="/products/category" element={<ProductByCategory />} />
            <Route path="/product/details" element={<ProductPage />} />;
            <Route path="/search" element={<ProductSearch />} />;
            <Route path="/store/:store/*" element={<SearchProductsByStore />} />
            ;
            <Route path="/profile/*" element={<ProfileScreen />} />;
            <Route path="/about-nextme" Component={AboutNextme} />
            <Route path="/best-price" Component={BestPrice} />
            <Route path="/service-centers" Component={ServiceCenters} />
            <Route path="/careers" Component={Careers} />
            <Route path="/solution-bar" Component={SolutionBar} />
            <Route path="/brand-promise" Component={BrandPromise} />
            <Route
              path="/terms-and-conditions"
              Component={TermsAndConditions}
            />
            <Route path="/warranty" Component={CheckWarrantyStatus} />
            <Route path="/store-locator" Component={StoreLocator} />
            <Route path="/easy-payment-plan" Component={EasyPaymentPlan} />
            <Route path="/disclaimer-policy" Component={DisclaimerPolicy} />
            <Route path="/return-policy" Component={ReturnAndExchangePolicy} />
            <Route path="/bulk-order" Component={BulkOrderEnquiries} />
            <Route path="/report-fraud" Component={ReportFraud} />
            <Route path="/catalogue" Component={LatestCatalogue} />
            <Route path="/newsletter" Component={Newsletter} />
            <Route path="/blog" Component={Blog} />
            <Route path="/tell-more" Component={TellUsMore} />
            <Route path="/delivery-restricted" Component={deliveryRestricted} />
            <Route path="/faq" Component={Faq} />
            <Route
              path="/verify/email/:id/:token"
              element={<EmailVerificationPage />}
            />
            <Route path="/auth/*" element={<Admin />} />;
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
          <Footer />
          <FloatingButton />
        </ConfigProvider>
      </div>
    </I18nextProvider>
  );
}

export default App;
