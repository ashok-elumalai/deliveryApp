import { configureStore } from "@reduxjs/toolkit";
import CurrentRestaurantReducer from "./currentRestaurantSlice";
import CommonSliceReducer from "./commonSlice";
import { UserOrdersSlice } from "./userOrdersSlice";

export const store = configureStore({
  reducer: {
    currentRestaurant: CurrentRestaurantReducer,
    CommonSlice: CommonSliceReducer,
    UserOrders: UserOrdersSlice,
  },
});
