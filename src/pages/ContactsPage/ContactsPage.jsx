import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import s from "./ContactsPage.module.css";
const ContactsPage = () => {
  return (
    <div className={s.contacts_container}>
      <h2 className="text-3xl text-center">
        <ContactForm />
        <SearchBox />
        <ContactList />
      </h2>
    </div>
  );
};

export default ContactsPage;
