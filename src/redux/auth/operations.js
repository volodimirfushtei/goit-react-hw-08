import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const goitApi = axios.create({
  baseURL: "https://connections-api.goit.global",
});

const setAuth = (token) => {
  goitApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.post("/users/signup", credentials);
      setAuth();
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
      setAuth(data.token);
      console.log("Token set to:", data.token);
      return data;
    } catch (error) {
      if (error.response) {
        console.error("Logining error details:", error.response.data);
      } else {
        console.error("Logining error:", error.message);
      }
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    const response = await goitApi.post("/users/logout");
    setAuth();
    return response.data;
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
    try {
      const { data } = await goitApi.get("/users/current");
      setAuth();
      return data;
    } catch (error) {
      console.error("Refresh user error:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
