import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    loadingTrue: (state) => {
      state.loading = true;
    },
    clearLoading: (state) => {
      state.loading = false;
    },
  },
});
export const {
  createCurrentUser,
  clearCurrentUser,
  clearLoading,
  loadingTrue,
} = authSlice.actions;
export default authSlice.reducer;
