import { configureStore } from '@reduxjs/toolkit'
import CurrentRestaurantReducer from './currentRestaurantSlice'

export const store = configureStore({
    reducer: {
        currentRestaurant: CurrentRestaurantReducer
    },
})