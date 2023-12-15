import { createSlice } from "@reduxjs/toolkit";
const StoreSlice = createSlice({
  name: "Store",
  initialState: {
    Store: {},
  },
  reducers: {
    addStore: (state, action) => {
      state.Store = action.payload;
    },
    clearStore: (state, action) => {
      state.Store = {};
    },
  },
});

export const { addStore, clearStore } = StoreSlice.actions;
export default StoreSlice.reducer;
