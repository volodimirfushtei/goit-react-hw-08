import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const goitApi = axios.create({
  baseURL: "https://connections-api.goit.global",
});

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const responce = await goitApi.post("users/signup", credentials);
      return responce.data;
    } catch (error) {
      if (error.response) {
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
      const { data } = await goitApi.post("users/login", credentials);
      return data;
    } catch (error) {
      if (error.response) {
        console.error("Logining error details:", error.response.data);
      } else {
        console.error("Logining error:", error.message);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
