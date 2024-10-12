import axios from "axios";
import {
  fetchContactsSuccess,
  deleteContact,
  addContact,
} from "./contactsSlice"; // Import the action for deleting a contact

axios.defaults.baseURL = "https://670423d1ab8a8f89273313e7.mockapi.io/";

export const fetchContacts = () => async (dispatch, thunkAPI) => {
  try {
    const response = await axios.get("/contacts");
    dispatch(fetchContactsSuccess(response.data));
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return thunkAPI.rejectWithValue(error.message); // Повертаємо значення помилки
  }
};

export const deleteContacts = (id) => async (dispatch, thunkAPI) => {
  try {
    await axios.delete(`/contacts/${id}`);
    dispatch(deleteContact(id));
  } catch (error) {
    console.error("Failed to delete contact:", error);
    return thunkAPI.rejectWithValue(error.message); // Повертаємо значення помилки
  }
};
export const addContacts = (body) => async (dispatch, thunkAPI) => {
  try {
    const response = await axios.post("/contacts", body);
    dispatch(addContact(response.data));
  } catch (error) {
    console.error("Failed to add contact:", error);
    return thunkAPI.rejectWithValue(error.message); // Повертаємо значення помилки
  }
};
