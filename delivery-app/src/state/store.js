import { configureStore } from "@reduxjs/toolkit";
import CurrentRestaurantReducer from "./currentRestaurantSlice";
import CommonSliceReducer from "./commonSlice";
import UserOrdersReducer from "./userOrdersSlice";

export const store = configureStore({
  reducer: {
    currentRestaurant: CurrentRestaurantReducer,
    CommonSlice: CommonSliceReducer,
    UserOrdersSlice: UserOrdersReducer,
  },
});
