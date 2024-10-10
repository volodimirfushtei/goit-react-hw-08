import { deleteContact } from "../../redux/contactsSlice";
import { addContact } from "../../redux/contactsSlice";
import { changeFilter } from "../../redux/filtersSlice";

const initialState = {
  contacts: {
    items: [],
  },
  filters: {
    name: "",
  },
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case addContact.type:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          items: [...state.contacts.items, action.payload],
        },
      };

    case deleteContact.type:
      return {
        ...state,
        contacts: {
          ...state.contacts,
          items: state.contacts.items.filter(
            (item) => item.id !== action.payload
          ),
        },
      };

    default:
      return state;
  }
};
export const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case changeFilter.type:
      return {
        ...state,
        filters: {
          ...state.filters,
          name: action.payload,
        },
      };
    default:
      return state;
  }
};
