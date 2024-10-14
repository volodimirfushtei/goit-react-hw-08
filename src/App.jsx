import "./App.css";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

axios.defaults.baseURL = "https://670423d1ab8a8f89273313e7.mockapi.io/";

import { fetchContacts } from "./redux/contactsOps";

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
      <main>
        <ContactForm />
        <SearchBox />
        <ContactList />
      </main>
    </div>
  );
}

export default App;
