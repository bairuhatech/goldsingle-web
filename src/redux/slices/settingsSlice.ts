import { createSlice } from "@reduxjs/toolkit";
const SettingsSlice = createSlice({
  name: "Settings",
  initialState: {
    Settings: {},
  },
  reducers: {
    storeSettings: (state, action) => {
      state.Settings = action.payload;
    },
    clearSettings: (state, action) => {
      state.Settings = {};
    },
  },
});

export const { storeSettings, clearSettings } = SettingsSlice.actions;
export default SettingsSlice.reducer;
