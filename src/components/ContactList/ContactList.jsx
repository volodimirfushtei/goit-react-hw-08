import s from "./ContactList.module.css";
import Contact from "../Contact/Contact.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContacts,
  fetchContacts,
} from "../../redux/contacts/operations.js";
import { selectLoading, selectError } from "../../redux/contacts/selectors.js";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { useEffect, useState } from "react";
import DeleteModal from "../../components/DeleteModal/DeleteModal.jsx";
import { toast } from "react-hot-toast";
import { selectFilteredContacts } from "../../redux/contacts/selectors.js";
import { motion } from "framer-motion";

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts.items);
  console.log("All contacts in state:", contacts);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading) || false;
  const error = useSelector(selectError) || false;
  const [open, setOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const filteredContacts = useSelector(selectFilteredContacts);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const handleOpen = (id) => {
    setSelectedContactId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedContactId(null);
  };
  const handleDeleteContact = () => {
    dispatch(deleteContacts(selectedContactId)).then(() => {
      toast.success("Contact deleted successfully!");
      handleClose();
      dispatch(fetchContacts());
    });
  };
  if (loading) {
    return <Loader className={s.Loader} />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <>
      <ul className={s.contacts}>
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact, index) => (
            <motion.li
              key={contact.id}
              className={s.contactItem}
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
            >
              <Contact
                key={contact.id}
                id={contact.id}
                name={contact.name}
                number={contact.number}
                onDelete={() => handleOpen(contact.id)}
              />
            </motion.li>
          ))
        ) : (
          <li
            role="alert"
            aria-hidden="true"
            tabIndex="-1"
            className={s.nocontacts}
          >
            Contacts are unavailable
          </li>
        )}
      </ul>
      <DeleteModal
        open={open}
        handleClose={handleClose}
        handleDeleteContact={handleDeleteContact}
      />
    </>
  );
};

export default ContactList;
