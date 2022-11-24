import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingList: [],
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addShopping: (state, { payload }) => {
      state.shoppingList.push(payload);
    },
    deleteShopping: (state, { payload }) => {
      const filtered = state.shoppingList?.filter(
        (item) => item.id !== payload.id
      );
      state.shoppingList = filtered;
    },
  },
});
export const { addShopping, deleteShopping } = shoppingSlice.actions;
export default shoppingSlice.reducer;
