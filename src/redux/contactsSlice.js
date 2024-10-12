import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchContactsSuccess(state, action) {
      state.items = action.payload;
    },
    addContact(state, action) {
      state.items.push(action.payload);
    },
    deleteContact(state, action) {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});
export const contactReducer = contactsSlice.reducer;
export const { addContact, deleteContact, fetchContactsSuccess } =
  contactsSlice.actions;
// export const selectContacts = (state) => state.contacts.items;
