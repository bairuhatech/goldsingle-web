import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";
import CategorySlice from "./categorySlice";
import CartSlice from "./cartSlice";
import notificationSlice from "./notificationSlice";
import languageSlice from "./languageSlice";
import SettingsSlice from "./settingsSlice";
import LocationSlice from "./locationSlice";
import storeSlice from "./storeSlice";
import CheckoutSlice from "./checkoutSlice";

const Slices = combineReducers({
  User: UserSlice,
  Category: CategorySlice,
  Cart: CartSlice,
  Notification: notificationSlice,
  Language: languageSlice,
  Settings: SettingsSlice,
  Location: LocationSlice,
  Store:storeSlice,
  Checkout:CheckoutSlice,
});
export default Slices;
