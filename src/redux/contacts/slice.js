import { createSlice } from "@reduxjs/toolkit";
import {
  deleteContacts,
  addContacts,
  fetchContacts,
} from "../contacts/operations";
import { logout } from "../auth/operations";

const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: [],
  extraReducers: (builder) => {
    // fetchContacts
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // deleteContacts
    builder
      .addCase(deleteContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // addContacts
    builder
      .addCase(addContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // logout
    builder.addCase(logout.fulfilled, (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    });
  },
});

export const contactReducer = slice.reducer;
