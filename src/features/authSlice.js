import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  message: "",
};


export const getMe = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3878/api/v1/presence", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Not authenticated");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const normallogin = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3878/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          name: userData.name,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async ({ idtoken }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3878/api/v1/login/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ idtoken }),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Google login failed");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3878/api/v1/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("logout failed");
    }
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(normallogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(normallogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || action.payload;
      })
      .addCase(normallogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
