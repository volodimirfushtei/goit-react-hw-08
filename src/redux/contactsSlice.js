import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchContacts,
  deleteContacts,
  addContacts,
} from "../redux/contactsOps.js"; // Import your thunks

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.error = null; // Reset error
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false on fulfilled
        state.items = action.payload; // Update items with fetched contacts
      })

      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false on fulfilled
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload // Remove the deleted contact
        );
      })

      .addCase(addContacts.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false on fulfilled
        state.items.push(action.payload); // Add the new contact
      })
      .addCase(addContacts.rejected, (state, action) => {
        state.error = action.payload; // Set error message
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

export const contactReducer = contactsSlice.reducer;
export const selectLoding = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;
// export const selectContacts = (state) => state.contacts.items;
