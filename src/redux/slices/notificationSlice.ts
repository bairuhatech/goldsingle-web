import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
  name: "Notification",
  initialState: {
    noti: false,
  },
  reducers: {
    storeNoti: (state, action) => {
      state.noti = action.payload;
    },
    clearNoti: (state, action) => {
      state.noti = false;
    },
  },
});

export const { storeNoti, clearNoti } = notificationSlice.actions;
export default notificationSlice.reducer;
