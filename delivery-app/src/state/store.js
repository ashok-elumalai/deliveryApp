import { configureStore } from "@reduxjs/toolkit";
import CurrentRestaurantReducer from "./currentRestaurantSlice";
import CommonSliceReducer from "./commonSlice";

export const store = configureStore({
  reducer: {
    currentRestaurant: CurrentRestaurantReducer,
    CommonSlice: CommonSliceReducer,
  },
});
