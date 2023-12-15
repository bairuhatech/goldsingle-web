import { createSlice } from "@reduxjs/toolkit";
import Defult from "../../languages/english.json";
const languageSlice = createSlice({
  name: "Language",
  initialState: {
    direction: "LTR",
  },
  reducers: {
    setDirection: (state, action) => {
      state.direction = action.payload;
    },
  },
});

export const { setDirection } = languageSlice.actions;
export default languageSlice.reducer;
