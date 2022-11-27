import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteList: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    favoriteListener: (state, { payload }) => {
      state.favoriteList = payload;
    },
  },
});
export const { favoriteListener } = favoriteSlice.actions;
export default favoriteSlice.reducer;
