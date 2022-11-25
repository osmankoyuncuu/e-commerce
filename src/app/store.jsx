import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import favoriteReducer from "../features/favoriteSlice";
import shoppingReducer from "../features/shoppingSlice";
import authReducer from "../features/authSlice";
const store = configureStore({
  reducer: {
    product: productReducer,
    favorite: favoriteReducer,
    shopping: shoppingReducer,
    auth: authReducer,
  },
});

export default store;
