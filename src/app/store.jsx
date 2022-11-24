import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import favoriteReducer from "../features/favoriteSlice";
import shoppingReducer from "../features/shoppingSlice";
const store = configureStore({
  reducer: {
    product: productReducer,
    favorite: favoriteReducer,
    shopping: shoppingReducer,
  },
});

export default store;
