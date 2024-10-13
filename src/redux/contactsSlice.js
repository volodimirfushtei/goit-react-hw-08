import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchContacts,
  deleteContacts,
  addContacts,
} from "../redux/contactsOps.js"; // Імпортуйте свої thunk-функції
import { createSelector } from "reselect";

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
        state.loading = true; // Встановлюємо loading в true під час pending
        state.error = null; // Скидаємо помилку
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false; // Встановлюємо loading в false при виконанні
        state.items = action.payload; // Оновлюємо items з отриманими контактами
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.loading = false; // Встановлюємо loading в false при виконанні
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        ); // Видаляємо контакт
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.loading = false; // Встановлюємо loading в false при виконанні
        state.items.push(action.payload); // Додаємо новий контакт
      })
      .addCase(addContacts.rejected, (state, action) => {
        state.loading = false; // Встановлюємо loading в false при відмові
        state.error = action.payload; // Встановлюємо повідомлення про помилку
      })
      .addMatcher(
        isAnyOf(
          addContacts.pending,
          deleteContacts.pending,
          fetchContacts.pending
        ),
        (state) => {
          state.loading = true; // Встановлюємо loading в true для будь-якої дії pending
        }
      )
      .addMatcher(
        isAnyOf(
          addContacts.rejected,
          deleteContacts.rejected,
          fetchContacts.rejected
        ),
        (state, action) => {
          state.loading = false; // Встановлюємо loading в false для відмовлених дій
          state.error = action.payload; // Встановлюємо повідомлення про помилку
        }
      );
  },
});

export const selectNameFilter = (state) => state.filters.name;

export const selectContacts = createSelector(
  [(state) => state.contacts.items, selectNameFilter],
  (contacts, filter) => {
    if (!filter) return contacts;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export const contactReducer = contactsSlice.reducer;
export const selectLoading = (state) => state.contacts.loading; // Виправлено помилку
export const selectError = (state) => state.contacts.error;

// export const selectContacts = (state) => state.contacts.items;
