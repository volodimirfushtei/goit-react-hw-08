import { configureStore } from "@reduxjs/toolkit";
import { contactReducer } from "../redux/contacts/slice";
import { filtersReducer } from "./filters/slice";
import { combineReducers } from "redux";

import authReducer from "../redux/auth/slice";

const rootReducer = combineReducers({
  contacts: contactReducer,
  filters: filtersReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
