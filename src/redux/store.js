import { configureStore } from "@reduxjs/toolkit";
import { contactReducer } from "../redux/contacts/slice";
import { filtersReducer } from "./filters/slice";
import { combineReducers } from "redux";
import authSlice from "../redux/auth/slice";
const rootReducer = combineReducers({
  contacts: contactReducer,
  filters: filtersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  auth: authSlice,
});
