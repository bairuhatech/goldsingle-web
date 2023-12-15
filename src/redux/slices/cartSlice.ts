import { createSlice } from "@reduxjs/toolkit";
const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: [],
  },
  reducers: {
    storeCart: (state, action) => {
      state.items = action.payload;
    },
    clearCart: (state, action) => {
      state.items = [];
    },
  },
});

export const { storeCart, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
