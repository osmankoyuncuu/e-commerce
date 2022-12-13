import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingList: [],
  filterShoppingList: [],
  total: [],
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    shoppingListener: (state, { payload }) => {
      state.shoppingList = payload;
    },
    filterShopping: (state, { payload }) => {
      state.filterShoppingList = payload;
    },
    clearShopping: (state) => {
      state.shoppingList = [];
    },
    totalFunc: (state, { payload }) => {
      state.total = payload;
    },
  },
});
export const { shoppingListener, filterShopping, clearShopping, total } =
  shoppingSlice.actions;
export default shoppingSlice.reducer;
