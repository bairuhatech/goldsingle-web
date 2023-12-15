import { createSlice } from "@reduxjs/toolkit";
const CheckoutSlice = createSlice({
  name: "Checkout",
  initialState: {
    Checkout: [],
  },

  reducers: {
    storeCheckout: (state, action) => {
      state.Checkout = action.payload;
    },
    clearCheckout: (state, action) => {
      state.Checkout = [];
    },
  },
});

export const { storeCheckout, clearCheckout } = CheckoutSlice.actions;
export default CheckoutSlice.reducer;
