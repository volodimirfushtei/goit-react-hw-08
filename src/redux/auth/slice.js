import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, refreshUser } from "./operations"; // Додайте refresh тут

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
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.isLoggedIn = !!action.payload; // Підрахунок стану авторизації
    },
    // Інші редюсери...
  },
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
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user = action.payload;
        state.isRefreshing = false;

        state.isLoggedIn = true;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        console.error("Refresh failed:", action.payload);
        state.isRefreshing = false;
      });
  },
});

export const { setIsRefreshing } = authSlice.actions;
export default authSlice.reducer;
