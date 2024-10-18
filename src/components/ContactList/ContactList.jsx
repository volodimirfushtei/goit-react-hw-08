import s from "./ContactList.module.css";
import Contact from "../Contact/Contact.jsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteContacts } from "../../redux/contacts/operations.js";
import { selectFilteredContacts } from "../../redux/contacts/slice.js";
import { selectLoading } from "../../redux/contacts/slice.js";
import { selectError } from "../../redux/contacts/slice.js";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { useState } from "react";
import DeleteModal from "../../components/DeleteModal/DeleteModal.jsx";
// Імпорт модального вікна
import { toast } from "react-hot-toast";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts) || [];
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading) || false;
  const error = useSelector(selectError) || false;
  const [open, setOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const handleOpen = (id) => {
    setSelectedContactId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedContactId(null);
  };

  const handleDeleteContact = () => {
    dispatch(deleteContacts(selectedContactId));
    toast.success("Contact deleted successfully!");
    handleClose();
  };

  if (loading) {
    return <Loader className={s.Loader} />;
  }
  if (error) {
    return (
      <p>
        <Error />
      </p>
    );
  }

  return (
    <>
      <ul className={s.contacts}>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <Contact
              value={contact.id}
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.number}
              onDelete={() => handleOpen(contact.id)} // Відкриття модального вікна
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
          </li>
        )}
      </ul>
      <DeleteModal
        open={open}
        handleClose={handleClose}
        handleDeleteContact={handleDeleteContact} // Підтвердження видалення
      />
    </>
  );
};

export default ContactList;
