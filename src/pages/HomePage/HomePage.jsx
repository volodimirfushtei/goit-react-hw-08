// src/pages/HomePage.js
import s from "./HomePage.module.css";
import ContactList from "../../components/ContactList/ContactList.jsx";
const HomePage = () => {
  return (
    <div className={s.homepage_wrapp}>
      <div className={s.contacts_container}>
        <ContactList />
      </div>
      <h2 className={s.title}>Welcome to our application!</h2>
      <p className={s.p}>
        This application allows you to manage your contacts.
      </p>
      <p className={s.p}>Developer: Volodimir Fushtei</p>
    </div>
  );
};
export default HomePage;
