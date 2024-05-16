import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

export const CommonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = CommonSlice.actions;

export default CommonSlice.reducer;
