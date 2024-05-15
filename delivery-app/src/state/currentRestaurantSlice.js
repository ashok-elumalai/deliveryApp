import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedRestaurant: undefined
}

export const CurrentRestaurantSlice = createSlice({
    name: 'currentRestaurant',
    initialState,
    reducers: {
        setRestaurant: (state, action) => {
            state.selectedRestaurant = action.payload
            console.log(action.payload)
        }

    },
})

// Action creators are generated for each case reducer function
export const {setRestaurant } = CurrentRestaurantSlice.actions

export default CurrentRestaurantSlice.reducer