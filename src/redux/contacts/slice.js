import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { deleteContacts, addContacts } from "../contacts/operations";
import { createSelector } from "reselect";
import { fetchContacts } from "../contacts/operations.js";
const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.token = action.payload.token;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.token = action.payload.token;
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.token = action.payload.token;
      })
      .addCase(addContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.token = action.payload.token;
      })
      .addMatcher(
        isAnyOf(
          addContacts.pending,
          deleteContacts.pending,
          fetchContacts.pending
        ),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          addContacts.rejected,
          deleteContacts.rejected,
          fetchContacts.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const selectNameFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [(state) => state.contacts.items, selectNameFilter],
  (contacts, filter) => {
    if (!filter) return contacts;

    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  }
);

export const contactReducer = slice.reducer;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

// export const selectContacts = (state) => state.contacts.items;
