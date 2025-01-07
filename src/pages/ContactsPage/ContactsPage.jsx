import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";

import s from "./ContactsPage.module.css";
import { motion } from "framer-motion";

const ContactsPage = () => {
  return (
    <motion.div
      className={s.contacts_container}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-3xl text-center">
        <ContactForm />
        <SearchBox />
        <ContactList />
      </h2>
    </motion.div>
  );
};

export default ContactsPage;
