import { createSelector } from "reselect";

export const selectNameFilter = (state) => state.filters.name;
export const selectNumberFilter = (state) => state.filters.number;

export const selectFilteredContacts = createSelector(
  [(state) => state.contacts.items, selectNameFilter, selectNumberFilter],
  (contacts, nameFilter, numberFilter) => {
    let filteredContacts = contacts;

    if (nameFilter) {
      filteredContacts = filteredContacts.filter((contact) =>
        contact.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (numberFilter) {
      filteredContacts = filteredContacts.filter((contact) =>
        contact.number.includes(numberFilter)
      );
    }

    return filteredContacts;
  }
);
