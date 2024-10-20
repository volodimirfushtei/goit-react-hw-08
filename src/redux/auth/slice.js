import { createSlice } from "@reduxjs/toolkit";
import { register } from "./operations";
import { login } from "./operations";
import { logout } from "./operations";
const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        console.log("Logout fulfilled");
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        console.error("Logout failed:", action.payload);
      });
  },
});

export const { setIsRefreshing } = authSlice.actions;

export default authSlice.reducer;
export const selectUser = authSlice.reducer;

export const { setUser } = authSlice.actions;
