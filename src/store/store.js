import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "../features/authSlice.js"

export const Store = configureStore({
  reducer: {
    auth: authReducer
  },
})