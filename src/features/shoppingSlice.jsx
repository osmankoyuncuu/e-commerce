import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingList: [],
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    shoppingListener: (state, { payload }) => {
      state.shoppingList = payload;
    },
  },
});
export const { shoppingListener } = shoppingSlice.actions;
export default shoppingSlice.reducer;
