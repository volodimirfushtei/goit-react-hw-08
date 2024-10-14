import s from "./ContactList.module.css";
import Contact from "../Contact/Contact.jsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteContacts } from "../../redux/contactsOps.js";
import { selectFilteredContacts } from "../../redux/contactsSlice.js";
import { selectLoading } from "../../redux/contactsSlice.js";
import { selectError } from "../../redux/contactsSlice.js";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts) || [];
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading) || false;
  const error = useSelector(selectError) || false;
  const handleDeleteContact = (id) => {
    dispatch(deleteContacts(id));
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <p>
        <Error />
      </p>
    );
  }
  return (
    <ul className={s.contacts}>
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <Contact
            value={contact.id}
            key={contact.id}
            id={contact.id}
            name={contact.name}
            number={contact.number}
            onDelete={() => handleDeleteContact(contact.id)}
          />
        ))
      ) : (
        <li
          role="alert"
          aria-hidden="true"
          tabIndex="-1"
          className={s.nocontacts}
        >
          No contacts available
        </li> // Message when no contacts
      )}
    </ul>
  );
};

export default ContactList;
