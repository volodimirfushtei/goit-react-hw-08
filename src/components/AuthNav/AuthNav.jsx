import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
// Додайте імпорт для кнопки
import s from "./AuthNav.module.css";
import clsx from "clsx";

const AuthNav = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };

  return (
    <div className={s.name_wrapp}>
      <h1 className={s.h1}>Phonebook</h1>
      <Avatar />
      <div className={s.name_wrapp}>
        {isLoggedIn ? (
          <div className={s.nameuser}>{user.name}</div>
        ) : (
          <div className={s.login}>Try to log in</div>
        )}
      </div>
      <NavLink className={buildLinkClass} to="/register">
        Register
      </NavLink>
      <NavLink className={buildLinkClass} to="/login">
        Log in
      </NavLink>
    </div>
  );
};

export default AuthNav;
