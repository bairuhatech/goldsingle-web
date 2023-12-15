import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import Slices from "../slices";

const persistConfig = {
  key: "nxtme",
  storage: storage,
  whitelist: ["User", "Category", "Cart", "Language", "Settings", "Location","Store","Checkout"],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, Slices);

const middleWareConfigs = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(middleWareConfigs),
  ],
});
const PersistedStore = persistStore(Store);
export { Store, PersistedStore };
