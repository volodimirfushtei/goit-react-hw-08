// src/components/UserMenu/UserMenu.jsx

import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import s from "./UserMenu.module.css";

const UserMenu = () => {
  return (
    <div className={s.wrapper}>
      <Navigation />
      <h1 className={s.h1}>Phonebook</h1>
      <AuthNav />
    </div>
  );
};

export default UserMenu;
