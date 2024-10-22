import { createSelector } from "reselect";
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
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;
