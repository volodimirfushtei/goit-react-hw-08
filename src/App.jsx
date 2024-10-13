import "./App.css";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://670423d1ab8a8f89273313e7.mockapi.io/";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      console.error("Failed:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadingContacts = async () => {
      dispatch(fetchContacts());
    };
    loadingContacts();
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}

export default App;
