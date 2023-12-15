import { createSlice } from "@reduxjs/toolkit";
const CategorySlice = createSlice({
  name: "Category",
  initialState: {
    categries: [],
  },

  reducers: {
    storeCategory: (state, action) => {
      state.categries = action.payload;
    },
    clearCategory: (state, action) => {
      state.categries = [];
    },
  },
});

export const { storeCategory, clearCategory } = CategorySlice.actions;
export default CategorySlice.reducer;
