import { createSlice } from "@reduxjs/toolkit";
const LocationSlice = createSlice({
  name: "Location",
  initialState: {
    location: {},
  },
  reducers: {
    storeLocation: (state, action) => {
      state.location = action.payload;
    },
    clearLocation: (state, action) => {
      state.location = {};
    },
  },
});

export const { storeLocation, clearLocation } = LocationSlice.actions;
export default LocationSlice.reducer;
