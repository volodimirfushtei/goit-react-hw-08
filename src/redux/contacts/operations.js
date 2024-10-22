import { createAsyncThunk } from "@reduxjs/toolkit";
import { goitApi } from "../auth/operations";
const setAuth = (token) => {
  goitApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    console.log("Current token:", token);

    setAuth(token);

    if (!token) {
      console.error("No token found");
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const response = await goitApi.get("/contacts");
      return response.data;
    } catch (error) {
      console.error("Fetch contacts failed:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      console.error("No token ");
      return thunkAPI.rejectWithValue("No token ");
    }

    setAuth(token);

    try {
      await goitApi.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      console.error("Failed:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContacts = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      console.error("No token ");
      return thunkAPI.rejectWithValue("No token ");
    }

    setAuth(token);

    try {
      const response = await goitApi.post("/contacts", contact);
      return response.data;
    } catch (error) {
      console.error("Failed:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
