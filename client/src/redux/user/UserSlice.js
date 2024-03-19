import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  currentUser: null,
  error: null,
  loading: false,
  admin: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    initialState: (state, action) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
      state.admin = false;
    },
    loginStart: (state, action) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { initialState, loginStart, loginSuccess, loginFail } =
  UserSlice.actions;

export const userReducer = UserSlice.reducer;
