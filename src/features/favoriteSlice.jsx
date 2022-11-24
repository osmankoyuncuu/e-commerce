import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteList: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, { payload }) => {
      state.favoriteList.push(payload);
    },
    deleteFavorite: (state, { payload }) => {
      const filtered = state.favoriteList?.filter(
        (item) => item.id !== payload.id
      );
      state.favoriteList = filtered;
    },
  },
});
export const { addFavorite, deleteFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
