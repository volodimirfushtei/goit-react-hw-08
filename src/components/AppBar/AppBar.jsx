// src/components/AppBar/AppBar.jsx

import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";
import { selectIsLoggedIn } from "../../redux/auth/selectors"; // Adjust the import as necessary
import s from "./AppBar.module.css";
const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header className={s.wrapperAppBar}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
