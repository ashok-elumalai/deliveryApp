import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: {},
};

export const UserOrdersSlice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
      console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrders } = UserOrdersSlice.actions;

export default UserOrdersSlice.reducer;
