import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const goitApi = axios.create({
  baseURL: "https://connections-api.goit.global",
});

const setAuth = (token) => {
  if (token) {
    goitApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete goitApi.defaults.headers.common.Authorization;
  }
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.post("/users/signup", credentials);
      setAuth(data.token); // Встановлення токена
      return data;
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.code === 11000
        ) {
          return thunkApi.rejectWithValue(
            "Ця електронна адреса вже використовується."
          );
        }
        console.error("Registration error details:", error.response.data);
      } else {
        console.error("Registration error:", error.message);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.post("/users/login", credentials);
      setAuth(data.token); // Встановлення токена
      console.log("Token set to:", data.token);
      return data;
    } catch (error) {
      if (error.response) {
        console.error("Login error details:", error.response.data);
      } else {
        console.error("Login error:", error.message);
      }
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await goitApi.post("/users/logout");
    setAuth(); // Скидання токена
    return { token: null };
  } catch (error) {
    console.error(
      "Logout error:",
      error.response ? error.response.data : error.message
    );
    return thunkApi.rejectWithValue(
      error.response ? error.response.data : error.message
    );
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;

    if (!savedToken) {
      return thunkAPI.rejectWithValue("Токен не знайдено");
    }

    try {
      setAuth(savedToken);
      const response = await goitApi.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
