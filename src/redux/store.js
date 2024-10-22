import { configureStore } from "@reduxjs/toolkit";
import { contactReducer } from "../redux/contacts/slice";
import { filtersReducer } from "./filters/slice";
import authSlice from "../redux/auth/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root-auth",
  version: 1,
  storage,
  whitelist: ["token"],
};

const rootReducer = combineReducers({
  contacts: contactReducer,
  filters: filtersReducer,
  auth: persistReducer(persistConfig, authSlice),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
