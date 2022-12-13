import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteList: [],
  filterFavoriteList: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    favoriteListener: (state, { payload }) => {
      state.favoriteList = payload;
    },
    filterFavorite: (state, { payload }) => {
      state.filterFavoriteList = payload;
    },
    clearFavorite: (state) => {
      state.favoriteList = [];
    },
  },
});
export const { favoriteListener, filterFavorite, clearFavorite } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
