import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/UserSlice";

export const store = configureStore({
  reducer: userReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
