import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/authSlice.js"

export const Store = configureStore({
  reducer: {
    auth: authSlice
  },
})