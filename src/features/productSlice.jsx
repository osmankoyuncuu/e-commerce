import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk("getProduct", async () => {
  const BASE_URL = "https://fakestoreapi.com/products";
  const { data } = await axios(BASE_URL);
  return data;
});

const initialState = {
  productList: [],
  loading: false,
  error: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productList = payload;
      })
      .addCase(getProduct.rejected, (state, { paylaod }) => {
        state.loading = false;
        state.error = paylaod;
      });
  },
});

export default productSlice.reducer;
