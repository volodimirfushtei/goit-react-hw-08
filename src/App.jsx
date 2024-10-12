import "./App.css";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import { useEffect } from "react"; // Import useEffect
import { useDispatch } from "react-redux";
import { fetchContacts } from "./redux/contactsOps.js";

function App() {
  const dispatch = useDispatch(); // Use const for dispatch

  useEffect(() => {
    dispatch(fetchContacts()); // Fix parentheses
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
